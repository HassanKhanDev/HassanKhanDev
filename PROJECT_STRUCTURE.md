# HireSync - Project Structure

## 📁 Complete File Structure

```
hiresync/
├── 📄 package.json                 # Root package.json for dev tools
├── 📄 package-lock.json           # Dependency lock file
├── 📄 README.md                   # Main documentation
├── 📄 FEATURES.md                 # Feature overview
├── 📄 PROJECT_STRUCTURE.md        # This file
├── 🔧 setup.sh                    # Automated setup script
│
├── 🗃️ backend/                     # Node.js/Express API Server
│   ├── 📄 package.json            # Backend dependencies
│   ├── 📄 server.js               # Main server entry point
│   ├── 🔐 .env                    # Environment variables
│   ├── 🔐 .env.example           # Environment template
│   │
│   ├── 📂 controllers/            # Business Logic Layer
│   │   └── 📄 authController.js   # Authentication logic
│   │
│   ├── 📂 middleware/             # Express Middleware
│   │   ├── 📄 auth.js            # JWT & Role authentication
│   │   ├── 📄 errorHandler.js    # Global error handling
│   │   └── 📄 notFound.js        # 404 handler
│   │
│   ├── 📂 models/                 # MongoDB Schemas
│   │   ├── 📄 User.js            # User/Employee model
│   │   ├── 📄 Attendance.js      # Attendance tracking
│   │   ├── 📄 Leave.js           # Leave management
│   │   └── 📄 Job.js             # Job/Recruitment model
│   │
│   ├── 📂 routes/                 # API Routes/Endpoints
│   │   ├── 📄 auth.js            # Authentication routes
│   │   ├── 📄 users.js           # User management
│   │   ├── 📄 employees.js       # Employee operations
│   │   ├── 📄 attendance.js      # Attendance APIs
│   │   ├── 📄 leave.js           # Leave management
│   │   ├── 📄 payroll.js         # Payroll operations
│   │   ├── 📄 recruitment.js     # Job/ATS APIs
│   │   ├── 📄 performance.js     # Performance management
│   │   ├── 📄 documents.js       # Document generation
│   │   ├── 📄 dashboard.js       # Dashboard analytics
│   │   └── 📄 communication.js   # Notifications/Announcements
│   │
│   └── 📂 utils/                  # Helper Functions
│       ├── 📄 sendEmail.js       # Email service
│       └── 📄 helpers.js         # Utility functions
│
└── 🎨 frontend/                   # React.js Frontend Application
    ├── 📄 package.json           # Frontend dependencies
    ├── 🎨 tailwind.config.js     # Tailwind CSS config
    ├── 🎨 postcss.config.js      # PostCSS config
    │
    ├── 📂 public/                # Static Assets
    │   └── 📄 index.html         # Main HTML template
    │
    └── 📂 src/                   # Source Code
        ├── 📄 index.js           # React entry point
        ├── 📄 index.css          # Global styles
        ├── 📄 App.js             # Main App component
        │
        ├── 📂 components/        # Reusable UI Components
        │   ├── 📂 common/        # Shared components
        │   │   └── 📄 LoadingSpinner.js
        │   └── 📂 layout/        # Layout components
        │       ├── 📄 DashboardLayout.js
        │       ├── 📄 Header.js
        │       └── 📄 Sidebar.js
        │
        ├── 📂 context/           # React Context API
        │   ├── 📄 AuthContext.js # Authentication state
        │   └── 📄 ThemeContext.js # Theme management
        │
        ├── 📂 services/          # API Service Layer
        │   └── 📄 api.js         # HTTP client & endpoints
        │
        └── 📂 pages/             # Page Components
            ├── 📂 auth/          # Authentication pages
            │   ├── 📄 LoginPage.js
            │   ├── 📄 ForgotPasswordPage.js
            │   ├── 📄 ResetPasswordPage.js
            │   └── 📄 ChangePasswordPage.js
            │
            ├── 📂 dashboard/     # Dashboard pages
            │   ├── 📄 AdminDashboard.js
            │   ├── 📄 HRDashboard.js
            │   ├── 📄 RecruiterDashboard.js
            │   └── 📄 EmployeeDashboard.js
            │
            ├── 📂 attendance/    # Attendance features
            │   └── 📄 AttendancePage.js
            │
            ├── 📂 leave/         # Leave management
            │   └── 📄 LeaveManagementPage.js
            │
            ├── 📂 payroll/       # Payroll features
            │   └── 📄 PayrollPage.js
            │
            ├── 📂 recruitment/   # ATS features
            │   └── 📄 RecruitmentPage.js
            │
            ├── 📂 performance/   # Performance management
            │   └── 📄 PerformancePage.js
            │
            └── 📂 profile/       # User profile
                └── 📄 ProfilePage.js
```

## 🔧 Key Technologies Used

### Backend Stack
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Nodemailer** - Email services
- **Cloudinary** - File storage
- **OpenAI** - AI integration
- **Stripe** - Payment processing

### Frontend Stack
- **React.js** - UI library
- **React Router** - Navigation
- **Context API** - State management
- **Tailwind CSS** - Styling framework
- **DaisyUI** - Component library
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Development Tools
- **Concurrently** - Run multiple processes
- **Nodemon** - Auto-restart server
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 File Descriptions

### Core Backend Files

**`server.js`** - Main Express server with:
- Middleware configuration
- Route mounting
- Database connection
- Error handling
- Security setup

**`authController.js`** - Authentication logic:
- User login/logout
- Password management
- Token generation
- Profile updates

**`User.js`** - Main user model with:
- Complete employee schema
- Password hashing
- Virtual fields
- Instance methods
- Static queries

### Core Frontend Files

**`App.js`** - Main React app with:
- Route configuration
- Protected routes
- Role-based redirects
- Authentication checks

**`AuthContext.js`** - Authentication state:
- Login/logout functions
- User state management
- Token handling
- Password operations

**`LoginPage.js`** - Modern login UI:
- Responsive design
- Form validation
- Theme toggle
- Demo credentials

**`EmployeeDashboard.js`** - Employee dashboard:
- Statistics cards
- Interactive charts
- Quick actions
- Recent activity

## 📊 Database Schema Overview

### User Collection
```javascript
{
  userId: String,           // Unique identifier
  email: String,            // Email address
  password: String,         // Hashed password
  role: String,            // admin|hr|recruiter|employee
  firstName: String,       // First name
  lastName: String,        // Last name
  department: String,      // Department
  designation: String,     // Job title
  salary: Object,          // Salary breakdown
  leaveBalance: Object,    // Leave balances
  preferences: Object,     // User preferences
  // ... more fields
}
```

### Attendance Collection
```javascript
{
  employee: ObjectId,      // Reference to User
  date: Date,             // Attendance date
  checkIn: Object,        // Check-in details
  checkOut: Object,       // Check-out details
  workingHours: Number,   // Hours worked
  status: String,         // present|absent|late
  // ... more fields
}
```

### Leave Collection
```javascript
{
  employee: ObjectId,     // Reference to User
  leaveType: String,      // Type of leave
  startDate: Date,        // Start date
  endDate: Date,          // End date
  status: String,         // pending|approved|rejected
  approvalFlow: Array,    // Multi-level approvals
  // ... more fields
}
```

## 🎨 UI Component Architecture

### Layout Components
- **DashboardLayout** - Main app layout
- **Header** - Top navigation with user menu
- **Sidebar** - Navigation menu with role-based items

### Common Components
- **LoadingSpinner** - Reusable loading indicator
- **Forms** - Modern form components
- **Charts** - Data visualization components

### Page Components
- **Dashboard Pages** - Role-specific dashboards
- **Feature Pages** - Module-specific pages
- **Auth Pages** - Authentication flows

## 🔐 Security Implementation

### Authentication Flow
1. User submits credentials
2. Server validates and returns JWT
3. Token stored in localStorage
4. Token sent with API requests
5. Server validates token on protected routes

### Authorization Levels
- **Public** - No authentication required
- **Protected** - Any authenticated user
- **Role-based** - Specific roles only
- **Admin** - Admin access only

### Security Middleware
- **Rate limiting** - Prevent abuse
- **CORS** - Cross-origin protection
- **Helmet** - Security headers
- **Input validation** - Prevent injection

## 📱 Responsive Design

### Breakpoints
- **Mobile** - < 768px
- **Tablet** - 768px - 1024px
- **Desktop** - > 1024px

### Mobile Features
- Touch-friendly interactions
- Collapsible sidebar
- Optimized forms
- Gesture support

## 🚀 Performance Optimizations

### Frontend
- Component lazy loading
- Image optimization
- Bundle splitting
- Caching strategies

### Backend
- Database indexing
- Query optimization
- Response compression
- Connection pooling

This structure provides a solid foundation for a enterprise-grade HRMS platform that can scale to thousands of users while maintaining performance and security standards.