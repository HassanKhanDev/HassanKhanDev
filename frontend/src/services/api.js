import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (token, data) => api.post(`/auth/reset-password/${token}`, data),
  register: (data) => api.post('/auth/register', data),
};

// User Management API
export const userAPI = {
  getUsers: (params) => api.get('/users', { params }),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// Employee Management API
export const employeeAPI = {
  getEmployees: (params) => api.get('/employees', { params }),
  getOnboardingQueue: () => api.get('/employees/onboarding'),
  completeOnboarding: (id, data) => api.post(`/employees/${id}/onboard`, data),
};

// Attendance API
export const attendanceAPI = {
  checkIn: (data) => api.post('/attendance/checkin', data),
  checkOut: (data) => api.post('/attendance/checkout', data),
  getMyAttendance: (params) => api.get('/attendance/my-attendance', { params }),
  generateQR: () => api.get('/attendance/generate-qr'),
  getReports: (params) => api.get('/attendance/reports', { params }),
};

// Leave Management API
export const leaveAPI = {
  applyLeave: (data) => api.post('/leave', data),
  getMyLeaves: (params) => api.get('/leave/my-leaves', { params }),
  getPendingApprovals: () => api.get('/leave/pending-approvals'),
  approveLeave: (id, data) => api.put(`/leave/${id}/approve`, data),
  rejectLeave: (id, data) => api.put(`/leave/${id}/reject`, data),
};

// Payroll API
export const payrollAPI = {
  getMyPayslips: (params) => api.get('/payroll/my-payslips', { params }),
  generatePayroll: (data) => api.post('/payroll/generate-payroll', data),
  getAnalytics: (params) => api.get('/payroll/analytics', { params }),
};

// Recruitment/ATS API
export const recruitmentAPI = {
  getJobs: (params) => api.get('/recruitment/jobs', { params }),
  createJob: (data) => api.post('/recruitment/jobs', data),
  getApplications: (jobId, params) => api.get(`/recruitment/applications/${jobId}`, { params }),
  parseResume: (data) => api.post('/recruitment/parse-resume', data),
};

// Performance Management API
export const performanceAPI = {
  getMyGoals: (params) => api.get('/performance/my-goals', { params }),
  createGoal: (data) => api.post('/performance/goals', data),
  getReviews: (params) => api.get('/performance/reviews', { params }),
  submitFeedback: (data) => api.post('/performance/feedback', data),
};

// Document Management API
export const documentAPI = {
  generateOfferLetter: (data) => api.post('/documents/generate-offer-letter', data),
  generateWarning: (data) => api.post('/documents/generate-warning', data),
  getMyDocuments: (params) => api.get('/documents/my-documents', { params }),
  uploadDocument: (data) => api.post('/documents/upload', data),
};

// Dashboard API
export const dashboardAPI = {
  getAdminStats: (params) => api.get('/dashboard/admin-stats', { params }),
  getHRStats: (params) => api.get('/dashboard/hr-stats', { params }),
  getEmployeeStats: (params) => api.get('/dashboard/employee-stats', { params }),
  getAnalytics: (params) => api.get('/dashboard/analytics', { params }),
};

// Communication API
export const communicationAPI = {
  getAnnouncements: (params) => api.get('/communication/announcements', { params }),
  createAnnouncement: (data) => api.post('/communication/announcements', data),
  getNotifications: (params) => api.get('/communication/notifications', { params }),
  markNotificationRead: (id) => api.put(`/communication/notifications/${id}/read`),
};

export default api;