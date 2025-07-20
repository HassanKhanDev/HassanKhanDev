import React from 'react';
import { 
  FiClock, 
  FiCalendar, 
  FiDollarSign, 
  FiTrendingUp,
  FiCheckCircle,
  FiXCircle,
  FiArrowUp,
  FiArrowDown 
} from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const EmployeeDashboard = () => {
  // Mock data for dashboard
  const stats = [
    {
      title: 'Hours This Month',
      value: '168',
      change: '+12%',
      trend: 'up',
      icon: FiClock,
      color: 'text-primary'
    },
    {
      title: 'Leave Balance',
      value: '15 days',
      change: '5 used',
      trend: 'down',
      icon: FiCalendar,
      color: 'text-success'
    },
    {
      title: 'This Month Salary',
      value: '$5,200',
      change: '+3%',
      trend: 'up',
      icon: FiDollarSign,
      color: 'text-warning'
    },
    {
      title: 'Performance Score',
      value: '92%',
      change: '+5%',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'text-info'
    }
  ];

  const attendanceData = [
    { month: 'Jan', hours: 160 },
    { month: 'Feb', hours: 152 },
    { month: 'Mar', hours: 168 },
    { month: 'Apr', hours: 164 },
    { month: 'May', hours: 172 },
    { month: 'Jun', hours: 168 }
  ];

  const leaveData = [
    { name: 'Annual', value: 12, color: '#3b82f6' },
    { name: 'Sick', value: 3, color: '#ef4444' },
    { name: 'Personal', value: 2, color: '#f59e0b' }
  ];

  const quickActions = [
    { title: 'Check In/Out', icon: FiClock, color: 'btn-primary', path: '/attendance' },
    { title: 'Apply Leave', icon: FiCalendar, color: 'btn-secondary', path: '/leave' },
    { title: 'View Payslip', icon: FiDollarSign, color: 'btn-accent', path: '/payroll' },
    { title: 'Performance', icon: FiTrendingUp, color: 'btn-info', path: '/performance' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Employee Dashboard</h1>
          <p className="text-base-content/60">Welcome back! Here's your overview</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="badge badge-success gap-2">
            <FiCheckCircle size={16} />
            Checked In
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/60">{stat.title}</p>
                  <p className="text-2xl font-bold text-base-content">{stat.value}</p>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'metric-trend-up' : 'metric-trend-down'
                  }`}>
                    {stat.trend === 'up' ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />}
                    {stat.change}
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-base-200 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body">
          <h2 className="card-title">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className={`btn ${action.color} btn-outline flex-col h-auto py-4`}
                  onClick={() => window.location.href = action.path}
                >
                  <Icon size={24} />
                  <span className="text-sm mt-2">{action.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Hours Chart */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4">Monthly Working Hours</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leave Usage Pie Chart */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4">Leave Usage This Year</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={leaveData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {leaveData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {leaveData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body">
          <h2 className="card-title">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
              <div className="p-2 bg-success text-success-content rounded-full">
                <FiCheckCircle size={16} />
              </div>
              <div className="flex-1">
                <p className="font-medium">Leave request approved</p>
                <p className="text-sm text-base-content/60">Your annual leave for Dec 25-26 has been approved</p>
              </div>
              <span className="text-sm text-base-content/60">2 hours ago</span>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
              <div className="p-2 bg-info text-info-content rounded-full">
                <FiClock size={16} />
              </div>
              <div className="flex-1">
                <p className="font-medium">Attendance recorded</p>
                <p className="text-sm text-base-content/60">Check-in at 9:15 AM today</p>
              </div>
              <span className="text-sm text-base-content/60">6 hours ago</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
              <div className="p-2 bg-warning text-warning-content rounded-full">
                <FiDollarSign size={16} />
              </div>
              <div className="flex-1">
                <p className="font-medium">Payslip generated</p>
                <p className="text-sm text-base-content/60">November payslip is now available</p>
              </div>
              <span className="text-sm text-base-content/60">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;