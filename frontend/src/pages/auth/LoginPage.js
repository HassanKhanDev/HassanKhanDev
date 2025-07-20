import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FiUser, FiLock, FiEye, FiEyeOff, FiSun, FiMoon } from 'react-icons/fi';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData);
      
      // Redirect based on first login status
      if (result.user.isFirstLogin) {
        navigate('/change-password');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-blue-600 text-primary-content items-center justify-center p-12">
        <div className="max-w-md text-center">
          <h1 className="text-5xl font-bold mb-6">HireSync</h1>
          <p className="text-xl mb-8 opacity-90">
            The Ultimate AI-Powered Human Resource Management SaaS Platform
          </p>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">🤖 AI-Powered</h3>
              <p className="opacity-80">Smart automation for all HR processes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">📊 Analytics</h3>
              <p className="opacity-80">Real-time insights and reporting</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">🔒 Secure</h3>
              <p className="opacity-80">Enterprise-grade security</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">📱 Mobile First</h3>
              <p className="opacity-80">Perfect on any device</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-base-100">
        <div className="w-full max-w-md">
          {/* Theme toggle */}
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>

          {/* Mobile logo */}
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-3xl font-bold text-primary mb-2">HireSync</h1>
            <p className="text-base-content/60">HR Management System</p>
          </div>

          {/* Login form */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold text-center mb-6">
                Welcome Back
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User ID Field */}
                <div className="form-control-modern">
                  <input
                    type="text"
                    name="userId"
                    placeholder=" "
                    value={formData.userId}
                    onChange={handleChange}
                    required
                    className="input-bordered"
                    disabled={loading}
                  />
                  <label>User ID or Email</label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-base-content/40" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="form-control-modern">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder=" "
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input-bordered pr-12"
                    disabled={loading}
                  />
                  <label>Password</label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-base-content/40" />
                  </div>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-base-content/40 hover:text-base-content" />
                    ) : (
                      <FiEye className="text-base-content/40 hover:text-base-content" />
                    )}
                  </button>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="link link-primary text-sm"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span className="ml-2">Signing in...</span>
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="divider">Demo Credentials</div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-base-200 p-3 rounded-lg">
                  <p className="font-semibold text-primary">Admin</p>
                  <p>ID: admin</p>
                  <p>Pass: admin123</p>
                </div>
                <div className="bg-base-200 p-3 rounded-lg">
                  <p className="font-semibold text-secondary">Employee</p>
                  <p>ID: emp001</p>
                  <p>Pass: emp123</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-base-content/60">
            <p>&copy; 2024 HireSync. All rights reserved.</p>
            <p className="mt-1">Built with ❤️ for modern HR management</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;