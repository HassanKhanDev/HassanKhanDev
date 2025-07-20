import React from 'react';

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-primary mb-4">My Profile</h1>
        <p className="text-lg text-base-content/60 mb-8">
          Manage your personal information and settings
        </p>
        <div className="bg-base-200 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-base-content/70">
            👤 Comprehensive profile management with photo upload, 
            emergency contacts, and preferences coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;