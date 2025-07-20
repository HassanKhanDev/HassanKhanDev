# HireSync - AI-Powered HRMS SaaS Platform

⚙️ **Technology Stack:** MERN Stack · OpenAI · Tailwind CSS · Cloudinary · Stripe · MongoDB Atlas · Nodemailer · JWT · Recharts

🎯 **Purpose:** To unify and automate every aspect of HR management in one intelligent, scalable, enterprise-ready SaaS platform

## 🌟 Features

### 🧑‍💼 Employee Lifecycle Management
- Complete onboarding wizard with document uploads
- Auto-generated contracts and e-signature workflow
- Structured exit process with NOC and final settlement

### 🔐 Admin-Controlled Access System
- Centralized user account creation by admins
- Secure credential distribution via email
- Role-based dashboard redirection
- Enforced password change on first login

### 🕓 Advanced Attendance System
- Biometric mock and QR code check-in/out
- Real-time status tracking with late detection
- Calendar view with visual attendance markers
- Automated timesheet generation

### 💰 Intelligent Payroll Engine
- Dynamic salary structures per employee
- Automated calculations for taxes, deductions, bonuses
- PDF payslip generation
- Stripe integration for secure payouts
- Comprehensive payroll analytics

### 🗓️ Smart Leave Management
- Multiple leave types with approval workflows
- Multi-level approval system
- Leave balance tracking with yearly rollover
- AI-powered pattern detection

### 🧠 AI-Powered Recruitment
- Resume parsing with OpenAI integration
- Smart candidate ranking and matching
- Automated interview question generation
- Kanban-style recruitment pipeline

### 📈 Performance Management
- Goal setting and progress tracking
- 360-degree feedback system
- AI-generated performance summaries
- Attrition risk prediction

### 📄 AI Document Generation
- Automated letter generation (offers, warnings, promotions)
- Smart templates with employee data integration
- Instant PDF export and email delivery

### 📊 Role-Based Dashboards
- **Admin:** Complete system overview and analytics
- **HR Manager:** Onboarding, payroll, and performance management
- **Recruiter:** Job posting and candidate management
- **Employee:** Personal dashboard with self-service features

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- OpenAI API key
- Stripe account (for payments)
- Cloudinary account (for file storage)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd hiresync
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up environment variables**
Create `.env` files in both backend and frontend directories with required variables.

5. **Start the application**
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm start
```

## 🎨 UI/UX Features
- Fully responsive design for all devices
- Dark/Light mode toggle
- Modern Tailwind CSS + DaisyUI components
- Interactive charts with Recharts
- Toast notifications and modals

## 🛡️ Security Features
- JWT-based authentication
- Bcrypt password hashing
- Role-based access control
- Data encryption at rest
- Secure API endpoints

## 📱 Mobile Responsiveness
- Touch-friendly attendance check-in
- Optimized mobile dashboards
- Responsive charts and tables
- Mobile-first design approach

## 🤖 AI Integration
- OpenAI GPT-4 for document generation
- Resume parsing and analysis
- Sentiment analysis for feedback
- Predictive analytics for HR insights

## 📧 Communication Features
- Automated email notifications
- Company announcements
- Birthday and reminder alerts
- Optional Slack/Teams integration

## 🔧 Admin Features
- User account management
- System configuration
- Data export capabilities
- Audit logs and monitoring

Built with ❤️ for modern HR management

