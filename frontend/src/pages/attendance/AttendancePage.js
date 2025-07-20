import React from 'react';

const AttendancePage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-primary mb-4">Attendance Management</h1>
        <p className="text-lg text-base-content/60 mb-8">
          Track your work hours and attendance
        </p>
        <div className="bg-base-200 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-base-content/70">
            🕒 Advanced attendance system with QR codes, biometric mock, 
            and real-time tracking coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;