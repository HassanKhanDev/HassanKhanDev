import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
    default: 'full-time'
  },
  workMode: {
    type: String,
    enum: ['onsite', 'remote', 'hybrid'],
    default: 'onsite'
  },
  // Salary Information
  salary: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    period: {
      type: String,
      enum: ['hourly', 'monthly', 'yearly'],
      default: 'yearly'
    }
  },
  // Requirements
  requirements: {
    education: {
      level: {
        type: String,
        enum: ['high-school', 'bachelor', 'master', 'phd', 'diploma', 'certification'],
        required: true
      },
      field: String,
      required: { type: Boolean, default: true }
    },
    experience: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 10 },
      required: { type: Boolean, default: true }
    },
    skills: {
      required: [String],
      preferred: [String]
    },
    languages: [{
      language: String,
      proficiency: {
        type: String,
        enum: ['basic', 'intermediate', 'advanced', 'native']
      }
    }]
  },
  // Job Details
  responsibilities: [String],
  benefits: [String],
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'closed', 'filled'],
    default: 'draft'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  // Hiring Information
  hiringManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  openings: {
    type: Number,
    default: 1
  },
  filled: {
    type: Number,
    default: 0
  },
  // Dates
  applicationDeadline: Date,
  expectedStartDate: Date,
  // Application Settings
  applicationSettings: {
    requireCoverLetter: { type: Boolean, default: false },
    requirePortfolio: { type: Boolean, default: false },
    customQuestions: [{
      question: String,
      type: {
        type: String,
        enum: ['text', 'textarea', 'select', 'multiselect', 'boolean']
      },
      options: [String],
      required: { type: Boolean, default: false }
    }]
  },
  // SEO and Publishing
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  publishedAt: Date,
  // AI Analysis
  aiAnalysis: {
    skillsExtracted: [String],
    difficultyScore: { type: Number, min: 1, max: 10 },
    marketRate: {
      min: Number,
      max: Number,
      source: String
    },
    competitionLevel: {
      type: String,
      enum: ['low', 'medium', 'high']
    }
  },
  // Analytics
  analytics: {
    views: { type: Number, default: 0 },
    applications: { type: Number, default: 0 },
    shortlisted: { type: Number, default: 0 },
    interviews: { type: Number, default: 0 },
    offers: { type: Number, default: 0 },
    hires: { type: Number, default: 0 }
  },
  // Internal Notes
  internalNotes: {
    type: String,
    maxlength: 1000
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ department: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ hiringManager: 1 });
jobSchema.index({ recruiter: 1 });
jobSchema.index({ createdAt: -1 });

// Virtual for remaining openings
jobSchema.virtual('remainingOpenings').get(function() {
  return Math.max(0, this.openings - this.filled);
});

// Virtual for application rate
jobSchema.virtual('applicationRate').get(function() {
  return this.analytics.views > 0 ? (this.analytics.applications / this.analytics.views * 100).toFixed(2) : 0;
});

// Virtual for hire rate
jobSchema.virtual('hireRate').get(function() {
  return this.analytics.applications > 0 ? (this.analytics.hires / this.analytics.applications * 100).toFixed(2) : 0;
});

// Pre-save middleware
jobSchema.pre('save', function(next) {
  // Set published date when status changes to active
  if (this.isModified('status') && this.status === 'active' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  // Auto-close job if all positions are filled
  if (this.filled >= this.openings && this.status === 'active') {
    this.status = 'filled';
  }
  
  next();
});

// Static method to get active jobs
jobSchema.statics.getActiveJobs = function() {
  return this.find({ status: 'active' }).sort({ createdAt: -1 });
};

// Static method to search jobs
jobSchema.statics.searchJobs = function(query, filters = {}) {
  const searchCriteria = {
    status: 'active',
    ...filters
  };
  
  if (query) {
    searchCriteria.$text = { $search: query };
  }
  
  return this.find(searchCriteria).sort({ score: { $meta: 'textScore' }, createdAt: -1 });
};

// Static method to get jobs by recruiter
jobSchema.statics.getJobsByRecruiter = function(recruiterId) {
  return this.find({ recruiter: recruiterId }).sort({ createdAt: -1 });
};

// Static method to get hiring statistics
jobSchema.statics.getHiringStats = function(timeFrame = 30) {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - timeFrame);
  
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: fromDate }
      }
    },
    {
      $group: {
        _id: null,
        totalJobs: { $sum: 1 },
        activeJobs: {
          $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
        },
        filledJobs: {
          $sum: { $cond: [{ $eq: ['$status', 'filled'] }, 1, 0] }
        },
        totalOpenings: { $sum: '$openings' },
        totalFilled: { $sum: '$filled' },
        totalApplications: { $sum: '$analytics.applications' },
        totalViews: { $sum: '$analytics.views' }
      }
    }
  ]);
};

// Instance method to increment view count
jobSchema.methods.incrementView = function() {
  this.analytics.views += 1;
  return this.save();
};

// Instance method to check if job is expired
jobSchema.methods.isExpired = function() {
  return this.applicationDeadline && new Date() > this.applicationDeadline;
};

const Job = mongoose.model('Job', jobSchema);

export default Job;