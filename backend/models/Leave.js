import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  leaveType: {
    type: String,
    enum: ['annual', 'sick', 'casual', 'maternity', 'paternity', 'emergency', 'unpaid'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalDays: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  },
  // Multi-level approval workflow
  approvalFlow: [{
    approver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    comments: {
      type: String,
      maxlength: 300
    },
    actionDate: Date
  }],
  currentApprovalLevel: {
    type: Number,
    default: 1
  },
  // Documents
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileType: String,
    uploadDate: { type: Date, default: Date.now }
  }],
  // Half day options
  isHalfDay: {
    type: Boolean,
    default: false
  },
  halfDaySession: {
    type: String,
    enum: ['first-half', 'second-half'],
    required: function() { return this.isHalfDay; }
  },
  // Emergency contact during leave
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  // Handover details
  handoverTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  handoverNotes: {
    type: String,
    maxlength: 1000
  },
  // AI Analysis
  aiAnalysis: {
    pattern: String, // e.g., "Friday-Monday leave pattern detected"
    riskScore: { type: Number, min: 0, max: 100 },
    recommendations: [String]
  },
  // HR Notes
  hrNotes: {
    type: String,
    maxlength: 500
  },
  // Cancellation details
  cancellationReason: String,
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cancellationDate: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
leaveSchema.index({ employee: 1, startDate: 1 });
leaveSchema.index({ status: 1 });
leaveSchema.index({ leaveType: 1 });
leaveSchema.index({ 'approvalFlow.approver': 1 });

// Virtual for duration in days
leaveSchema.virtual('duration').get(function() {
  if (this.isHalfDay) return 0.5;
  const diffTime = Math.abs(this.endDate - this.startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
});

// Virtual for current approver
leaveSchema.virtual('currentApprover').get(function() {
  const currentLevel = this.approvalFlow.find(flow => flow.level === this.currentApprovalLevel);
  return currentLevel ? currentLevel.approver : null;
});

// Pre-save middleware to calculate total days
leaveSchema.pre('save', function(next) {
  if (this.isHalfDay) {
    this.totalDays = 0.5;
  } else {
    const diffTime = Math.abs(this.endDate - this.startDate);
    this.totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }
  next();
});

// Static method to check leave balance
leaveSchema.statics.checkLeaveBalance = async function(employeeId, leaveType, requestedDays) {
  const User = mongoose.model('User');
  const employee = await User.findById(employeeId);
  
  if (!employee) {
    throw new Error('Employee not found');
  }
  
  const currentBalance = employee.leaveBalance[leaveType] || 0;
  return currentBalance >= requestedDays;
};

// Static method to get leave history
leaveSchema.statics.getLeaveHistory = function(employeeId, year) {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  
  return this.find({
    employee: employeeId,
    startDate: { $gte: startDate, $lte: endDate }
  }).sort({ startDate: -1 });
};

// Static method to get pending approvals for user
leaveSchema.statics.getPendingApprovals = function(approverId) {
  return this.find({
    'approvalFlow.approver': approverId,
    'approvalFlow.status': 'pending',
    status: 'pending'
  }).populate('employee', 'firstName lastName employeeId department');
};

// Instance method to approve leave
leaveSchema.methods.approve = async function(approverId, comments) {
  const currentLevel = this.approvalFlow.find(
    flow => flow.level === this.currentApprovalLevel && flow.approver.toString() === approverId
  );
  
  if (!currentLevel) {
    throw new Error('Not authorized to approve this leave');
  }
  
  currentLevel.status = 'approved';
  currentLevel.comments = comments;
  currentLevel.actionDate = new Date();
  
  // Check if there are more approval levels
  const nextLevel = this.approvalFlow.find(flow => flow.level === this.currentApprovalLevel + 1);
  
  if (nextLevel) {
    this.currentApprovalLevel += 1;
  } else {
    this.status = 'approved';
    
    // Deduct leave balance
    const User = mongoose.model('User');
    const employee = await User.findById(this.employee);
    if (employee.leaveBalance[this.leaveType] >= this.totalDays) {
      employee.leaveBalance[this.leaveType] -= this.totalDays;
      await employee.save();
    }
  }
  
  return this.save();
};

// Instance method to reject leave
leaveSchema.methods.reject = function(approverId, comments) {
  const currentLevel = this.approvalFlow.find(
    flow => flow.level === this.currentApprovalLevel && flow.approver.toString() === approverId
  );
  
  if (!currentLevel) {
    throw new Error('Not authorized to reject this leave');
  }
  
  currentLevel.status = 'rejected';
  currentLevel.comments = comments;
  currentLevel.actionDate = new Date();
  this.status = 'rejected';
  
  return this.save();
};

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;