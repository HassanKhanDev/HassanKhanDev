import React from 'react';

const LoadingSpinner = ({ size = 'lg', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`loading loading-spinner loading-${size} text-primary`}></div>
    </div>
  );
};

export default LoadingSpinner;