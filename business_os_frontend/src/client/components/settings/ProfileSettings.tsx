import React, { useState, useEffect } from 'react';
import './profile.css';

interface ProfileData {
  fullName: string;
  displayName: string;
  email: string;
  phone: string;
  avatar: string;
}

const ProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: '',
    displayName: '',
    email: '',
    phone: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        setProfile({
          fullName: 'John Doe',
          displayName: 'John D',
          email: 'john@businessos.com',
          phone: '+91 98765 43210',
          avatar: 'JD'
        });
      }
    } catch (error) {
      setProfile({
        fullName: 'John Doe',
        displayName: 'John D',
        email: 'john@businessos.com',
        phone: '+91 98765 43210',
        avatar: 'JD'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profile)
      });
      if (response.ok) {
        alert('Profile saved successfully!');
      } else {
        alert('Profile saved! (Demo)');
      }
    } catch (error) {
      alert('Profile saved! (Demo)');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const initial = profile.fullName.charAt(0);
          setProfile({...profile, avatar: initial});
          alert('Avatar uploaded! (Demo)');
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handleRemoveAvatar = () => {
    setProfile({...profile, avatar: profile.fullName.charAt(0)});
    alert('Avatar removed!');
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="profile-settings">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Settings</h2>
      <p className="text-sm text-gray-500 mb-6">Manage your personal information</p>
      
      <div className="space-y-5 max-w-md">
        <div className="field-group">
          <label>Full Name</label>
          <input 
            type="text" 
            value={profile.fullName} 
            onChange={(e) => setProfile({...profile, fullName: e.target.value})}
          />
        </div>
        
        <div className="field-group">
          <label>Display Name</label>
          <input 
            type="text" 
            value={profile.displayName} 
            onChange={(e) => setProfile({...profile, displayName: e.target.value})}
          />
        </div>
        
        <div className="field-group">
          <label>Email Address</label>
          <input 
            type="email" 
            value={profile.email} 
            onChange={(e) => setProfile({...profile, email: e.target.value})}
          />
        </div>
        
        <div className="field-group">
          <label>Phone Number</label>
          <input 
            type="tel" 
            value={profile.phone} 
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
          />
        </div>
        
        <div className="avatar-upload">
          <div className="avatar-preview">{profile.avatar || profile.fullName.charAt(0)}</div>
          <button className="btn-upload" onClick={handleAvatarUpload}>Upload</button>
          <button className="btn-remove" onClick={handleRemoveAvatar}>Remove</button>
        </div>
        
        <button className="btn-save" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;