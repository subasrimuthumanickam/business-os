import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define an interface for the full user data
interface UserData {
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  created_at: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchFullProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.data);
      } catch (err) {
        console.error("Failed to load profile data", err);
      }
    };
    fetchFullProfile();
  }, []);

  if (!user) return <div className="p-8">Loading full profile details...</div>;

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">Full Name</label>
            <p className="text-gray-800 font-medium mt-1">{user.name}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">Email Address</label>
            <p className="text-gray-800 font-medium mt-1">{user.email}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">Phone Number</label>
            <p className="text-gray-800 font-medium mt-1">{user.phone || 'N/A'}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">Role</label>
            <p className="text-gray-800 font-medium mt-1">{user.role}</p>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-400 uppercase">Address</label>
            <p className="text-gray-800 font-medium mt-1">{user.address || 'Not provided'}</p>
          </div>
          <div className="md:col-span-2 border-t pt-4">
            <label className="text-xs font-semibold text-gray-400 uppercase">Account Created</label>
            <p className="text-gray-600 text-sm mt-1">{new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;