import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  checkIn: {
    time: {
      type: Date,
      required: true
    },
    method: {
      type: String,
      enum: ['biometric', 'qr-code', 'manual'],
      default: 'manual'
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    },
    ipAddress: String,
    device: String
  },
  checkOut: {
    time: Date,
    method: {
      type: String,
      enum: ['biometric', 'qr-code', 'manual'],
      default: 'manual'
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    },
    ipAddress: String,
    device: String
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'half-day', 'late', 'on-leave'],
    default: 'present'
  },
  workingHours: {
    type: Number,
    default: 0
  },
  overtimeHours: {
    type: Number,
    default: 0
  },
  breakTime: {
    type: Number,
    default: 0
  },
  isLate: {
    type: Boolean,
    default: false
  },
  lateBy: {
    type: Number, // minutes
    default: 0
  },
  earlyLeave: {
    type: Boolean,
    default: false
  },
  earlyLeaveBy: {
    type: Number, // minutes
    default: 0
  },
  // Breaks tracking
  breaks: [{
    startTime: Date,
    endTime: Date,
    duration: Number, // minutes
    type: {
      type: String,
      enum: ['lunch', 'tea', 'personal', 'meeting'],
      default: 'personal'
    }
  }],
  // Work location
  workLocation: {
    type: String,
    enum: ['office', 'home', 'client-site', 'field'],
    default: 'office'
  },
  // Notes and comments
  notes: {
    type: String,
    maxlength: 500
  },
  adminNotes: {
    type: String,
    maxlength: 500
  },
  // Approval workflow
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvalDate: Date,
  // Productivity metrics
  productivity: {
    tasks: { type: Number, default: 0 },
    meetings: { type: Number, default: 0 },
    calls: { type: Number, default: 0 }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });
attendanceSchema.index({ date: 1 });
attendanceSchema.index({ status: 1 });
attendanceSchema.index({ 'checkIn.time': 1 });

// Virtual for formatted date
attendanceSchema.virtual('formattedDate').get(function() {
  return this.date.toDateString();
});

// Virtual for total hours worked
attendanceSchema.virtual('totalHoursWorked').get(function() {
  return this.workingHours + this.overtimeHours;
});

// Pre-save middleware to calculate working hours
attendanceSchema.pre('save', function(next) {
  if (this.checkIn.time && this.checkOut.time) {
    const diffMs = this.checkOut.time.getTime() - this.checkIn.time.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    // Subtract break time
    const totalBreakTime = this.breaks.reduce((total, br) => total + (br.duration || 0), 0);
    const breakHours = totalBreakTime / 60;
    
    this.workingHours = Math.max(0, diffHours - breakHours);
    
    // Calculate overtime (assuming 8 hours is standard)
    if (this.workingHours > 8) {
      this.overtimeHours = this.workingHours - 8;
      this.workingHours = 8;
    }
    
    // Check if late (assuming 9:00 AM is standard time)
    const standardTime = new Date(this.date);
    standardTime.setHours(9, 0, 0, 0);
    
    if (this.checkIn.time > standardTime) {
      this.isLate = true;
      this.lateBy = Math.floor((this.checkIn.time - standardTime) / (1000 * 60));
    }
    
    // Check for early leave (assuming 6:00 PM is standard end time)
    const standardEndTime = new Date(this.date);
    standardEndTime.setHours(18, 0, 0, 0);
    
    if (this.checkOut.time < standardEndTime) {
      this.earlyLeave = true;
      this.earlyLeaveBy = Math.floor((standardEndTime - this.checkOut.time) / (1000 * 60));
    }
  }
  
  next();
});

// Static method to get attendance by date range
attendanceSchema.statics.getAttendanceByDateRange = function(employeeId, startDate, endDate) {
  return this.find({
    employee: employeeId,
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ date: -1 });
};

// Static method to get monthly attendance summary
attendanceSchema.statics.getMonthlyAttendance = function(employeeId, year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  
  return this.aggregate([
    {
      $match: {
        employee: mongoose.Types.ObjectId(employeeId),
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        totalDays: { $sum: 1 },
        presentDays: {
          $sum: {
            $cond: [{ $eq: ['$status', 'present'] }, 1, 0]
          }
        },
        absentDays: {
          $sum: {
            $cond: [{ $eq: ['$status', 'absent'] }, 1, 0]
          }
        },
        lateDays: {
          $sum: {
            $cond: ['$isLate', 1, 0]
          }
        },
        totalWorkingHours: { $sum: '$workingHours' },
        totalOvertimeHours: { $sum: '$overtimeHours' }
      }
    }
  ]);
};

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;