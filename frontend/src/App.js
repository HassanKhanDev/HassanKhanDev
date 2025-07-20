import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout Components
import DashboardLayout from './components/layout/DashboardLayout';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';

// Dashboard Pages
import AdminDashboard from './pages/dashboard/AdminDashboard';
import HRDashboard from './pages/dashboard/HRDashboard';
import RecruiterDashboard from './pages/dashboard/RecruiterDashboard';
import EmployeeDashboard from './pages/dashboard/EmployeeDashboard';

// Feature Pages
import AttendancePage from './pages/attendance/AttendancePage';
import LeaveManagementPage from './pages/leave/LeaveManagementPage';
import PayrollPage from './pages/payroll/PayrollPage';
import RecruitmentPage from './pages/recruitment/RecruitmentPage';
import PerformancePage from './pages/performance/PerformancePage';
import ProfilePage from './pages/profile/ProfilePage';

// Protected Route Component
const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Dashboard Route Component
const DashboardRoute = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'hr':
      return <HRDashboard />;
    case 'recruiter':
      return <RecruiterDashboard />;
    case 'employee':
    default:
      return <EmployeeDashboard />;
  }
};

function App() {
  const { isFirstLogin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          }
        />

        {/* First Login Password Change */}
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              {isFirstLogin ? <ChangePasswordPage /> : <Navigate to="/dashboard" replace />}
            </ProtectedRoute>
          }
        />

        {/* Protected Routes with Dashboard Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route path="dashboard" element={<DashboardRoute />} />
          
          {/* Attendance */}
          <Route path="attendance" element={<AttendancePage />} />
          
          {/* Leave Management */}
          <Route path="leave" element={<LeaveManagementPage />} />
          
          {/* Payroll */}
          <Route path="payroll" element={<PayrollPage />} />
          
          {/* Recruitment (Recruiter, HR, Admin only) */}
          <Route
            path="recruitment/*"
            element={
              <ProtectedRoute roles={['recruiter', 'hr', 'admin']}>
                <RecruitmentPage />
              </ProtectedRoute>
            }
          />
          
          {/* Performance */}
          <Route path="performance" element={<PerformancePage />} />
          
          {/* Profile */}
          <Route path="profile" element={<ProfilePage />} />

          {/* Default redirect to dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Unauthorized page */}
        <Route
          path="/unauthorized"
          element={
            <div className="min-h-screen flex items-center justify-center bg-base-100">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-error mb-4">403</h1>
                <p className="text-lg text-base-content/70 mb-6">Unauthorized Access</p>
                <button
                  className="btn btn-primary"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </button>
              </div>
            </div>
          }
        />

        {/* 404 page */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-base-100">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
                <p className="text-lg text-base-content/70 mb-6">Page Not Found</p>
                <Navigate to="/dashboard" replace />
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;