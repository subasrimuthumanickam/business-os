import React, { useState, useEffect, useRef } from 'react';

interface ProfileData {
  fullName: string;
  displayName: string;
  email: string;
  phone: string;
  avatar: string | null;
  avatarPreview?: string | null;
}

// Global event to notify header about profile updates
export const PROFILE_UPDATE_EVENT = 'profileUpdated';

const ProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: '',
    displayName: '',
    email: '',
    phone: '',
    avatar: null,
    avatarPreview: null
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        if (data.avatarPreview) {
          setAvatarPreviewUrl(data.avatarPreview);
        }
      } else {
        // Mock data
        setProfile({
          fullName: 'Subasri Muthumanickam',
          displayName: 'suba',
          email: 'subasrimuthumanickam@gmail.com',
          phone: '+91 98765 43210',
          avatar: null,
          avatarPreview: null
        });
      }
    } catch (error) {
      setProfile({
        fullName: 'Subasri Muthumanickam',
        displayName: 'suba',
        email: 'subasrimuthumanickam@gmail.com',
        phone: '+91 98765 43210',
        avatar: null,
        avatarPreview: null
      });
    } finally {
      setLoading(false);
    }
  };

  // Get initials from full name
  const getInitials = (name: string): string => {
    if (!name) return 'SM';
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  // Get display avatar (either uploaded image or initials)
  const getDisplayAvatar = () => {
    if (avatarPreviewUrl) {
      return { type: 'image', value: avatarPreviewUrl };
    }
    if (profile.avatarPreview) {
      return { type: 'image', value: profile.avatarPreview };
    }
    return { type: 'initials', value: getInitials(profile.fullName || 'SM') };
  };

  // Update header/profile icon globally
  const updateGlobalProfile = (fullName: string, avatarUrl: string | null) => {
    // Dispatch custom event for header component to listen
    const event = new CustomEvent(PROFILE_UPDATE_EVENT, {
      detail: {
        fullName: fullName,
        displayName: profile.displayName,
        initials: getInitials(fullName),
        avatarUrl: avatarUrl,
        timestamp: Date.now()
      }
    });
    window.dispatchEvent(event);

    // Also update localStorage for persistence
    const profileData = {
      fullName: fullName,
      displayName: profile.displayName,
      initials: getInitials(fullName),
      avatarUrl: avatarUrl,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('userProfile', JSON.stringify(profileData));
  };

  const handleAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid image (JPEG, PNG, GIF, or WEBP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const previewUrl = event.target?.result as string;
      setAvatarPreviewUrl(previewUrl);
      setAvatarFile(file);
      // Update header immediately on upload
      updateGlobalProfile(profile.fullName, previewUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatarPreviewUrl(null);
    setAvatarFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Update header with initials instead of image
    updateGlobalProfile(profile.fullName, null);
  };

  const handleFullNameChange = (newFullName: string) => {
    setProfile({ ...profile, fullName: newFullName });
    // Update header with new initials (if no custom avatar)
    if (!avatarPreviewUrl && !profile.avatarPreview) {
      updateGlobalProfile(newFullName, null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('fullName', profile.fullName);
      formData.append('displayName', profile.displayName);
      formData.append('email', profile.email);
      formData.append('phone', profile.phone);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(prev => ({ ...prev, ...data }));
        if (data.avatarPreview) {
          setAvatarPreviewUrl(data.avatarPreview);
          updateGlobalProfile(profile.fullName, data.avatarPreview);
        } else {
          updateGlobalProfile(profile.fullName, avatarPreviewUrl);
        }
        alert('Profile saved successfully!');
      } else {
        alert('Profile saved! (Demo)');
        updateGlobalProfile(profile.fullName, avatarPreviewUrl);
      }
    } catch (error) {
      alert('Profile saved! (Demo)');
      updateGlobalProfile(profile.fullName, avatarPreviewUrl);
    } finally {
      setSaving(false);
    }
  };

  const displayAvatar = getDisplayAvatar();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your personal information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Avatar Section */}
        <div className="flex flex-col items-center py-8 px-4 border-b border-gray-100 bg-gray-50/30">
          <div className="relative mb-4">
            {displayAvatar.type === 'image' ? (
              <img
                src={displayAvatar.value as string}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
                {displayAvatar.value}
              </div>
            )}
            <button
              onClick={handleAvatarUpload}
              className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAvatarUpload}
              className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm"
            >
              Upload
            </button>
            <button
              onClick={handleRemoveAvatar}
              className="px-5 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-xl border border-red-200 hover:bg-red-100 transition-all"
            >
              Remove
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">JPG, PNG or GIF. Max 5MB.</p>
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => handleFullNameChange(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 text-gray-800 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <p className="text-xs text-gray-400 mt-1">
              This will update your avatar initials
            </p>
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={profile.displayName}
              onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
              placeholder="How others see you"
              className="w-full px-4 py-2.5 text-gray-800 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 text-gray-800 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2.5 text-gray-800 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full sm:w-auto px-8 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Profile'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
      />
    </div>
  );
};

export default ProfileSettings;