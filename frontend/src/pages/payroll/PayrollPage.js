import React from 'react';

const PayrollPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-primary mb-4">Payroll Management</h1>
        <p className="text-lg text-base-content/60 mb-8">
          View your salary details and payslips
        </p>
        <div className="bg-base-200 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-base-content/70">
            💰 Intelligent payroll engine with automated calculations, 
            PDF payslips, and Stripe integration coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayrollPage;