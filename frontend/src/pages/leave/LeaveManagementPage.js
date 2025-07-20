import React from 'react';

const LeaveManagementPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-primary mb-4">Leave Management</h1>
        <p className="text-lg text-base-content/60 mb-8">
          Apply for leave and manage your time off
        </p>
        <div className="bg-base-200 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-base-content/70">
            📅 Smart leave management with multi-level approvals, 
            AI pattern detection, and balance tracking coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagementPage;