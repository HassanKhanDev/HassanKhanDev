import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
          return res.status(401).json({ 
            success: false, 
            message: 'Not authorized, user not found' 
          });
        }

        // Check if user is active
        if (!req.user.isActive) {
          return res.status(401).json({ 
            success: false, 
            message: 'Account is deactivated' 
          });
        }

        next();
      } catch (error) {
        console.error(error);
        return res.status(401).json({ 
          success: false, 
          message: 'Not authorized, token failed' 
        });
      }
    }

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized, no token' 
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error in authentication' 
    });
  }
};

// Role-based authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `User role ${req.user.role} is not authorized to access this route` 
      });
    }

    next();
  };
};

// Check if user is admin
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      success: false, 
      message: 'Admin access required' 
    });
  }
};

// Check if user is HR or Admin
export const hrOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'hr' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ 
      success: false, 
      message: 'HR or Admin access required' 
    });
  }
};

// Check if user is recruiter, HR, or Admin
export const recruiterOrAbove = (req, res, next) => {
  if (req.user && ['recruiter', 'hr', 'admin'].includes(req.user.role)) {
    next();
  } else {
    res.status(403).json({ 
      success: false, 
      message: 'Recruiter, HR, or Admin access required' 
    });
  }
};