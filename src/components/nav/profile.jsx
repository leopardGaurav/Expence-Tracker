import React, { useState, useEffect, useRef } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGraduationCap, 
  FaEdit, 
  FaSave, 
  FaCheckCircle,
  FaCamera 
} from 'react-icons/fa';
import { useProfile } from '../../context/ProfileContext';
import { useTheme } from '../../context/ThemeContext';

function Profile() {
  const { profile, updateProfile } = useProfile();
  const { isDarkMode } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [formData, setFormData] = useState(profile);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Device storage se image select karke Base64 mein convert karne ke liye
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  const initials = formData.name
    ? formData.name
        .split(' ')
        .filter(Boolean)
        .map(word => word[0])
        .join('')
        .toUpperCase()
    : 'GK';

  const inputStyle = {
    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#0f172a',
    border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
    padding: '10px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      padding: '24px',
      color: isDarkMode ? '#ffffff' : '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
      minHeight: '100vh',
      boxSizing: 'border-box',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: isDarkMode ? '#f8fafc' : '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaUser style={{ color: '#3b82f6' }} /> User Profile
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#94a3b8' }}>
            View and manage your personal account details and profile picture.
          </p>
        </div>

        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          style={{
            backgroundColor: isEditing ? '#22c55e' : '#2563eb',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          {isEditing ? <><FaSave /> Save Profile</> : <><FaEdit /> Edit Profile</>}
        </button>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div style={{
          backgroundColor: isDarkMode ? 'rgba(34, 197, 94, 0.1)' : '#dcfce7',
          color: '#22c55e',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <FaCheckCircle /> Profile updated successfully!
        </div>
      )}

      {/* Main Profile Card */}
      <div style={{
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        padding: '28px',
        borderRadius: '16px',
        border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'background-color 0.3s ease, border 0.3s ease'
      }}>
        {/* Avatar & Header Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div 
            onClick={() => isEditing && fileInputRef.current.click()}
            style={{
              width: '85px',
              height: '85px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
              flexShrink: 0,
              cursor: isEditing ? 'pointer' : 'default',
              position: 'relative',
              border: isDarkMode ? '2px solid #334155' : '2px solid #e2e8f0'
            }}
            title={isEditing ? "Click to change photo from device" : ""}
          >
            {formData.avatar ? (
              <img src={formData.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              initials
            )}
            
            {/* Hover overlay when editing */}
            {isEditing && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                fontSize: '10px',
                textAlign: 'center',
                padding: '3px 0',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px'
              }}>
                <FaCamera size={9} /> Change
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
              {formData.name}
            </h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaGraduationCap style={{ color: '#10b981' }} /> {formData.occupation}
            </p>
            {isEditing && (
              <span style={{ fontSize: '12px', color: '#3b82f6', marginTop: '2px' }}>
                💡 Click on the profile avatar above to upload image from your device.
              </span>
            )}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', margin: 0 }} />

        {/* Info Grid Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '24px' 
        }}>
          {/* Full Name */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaUser size={12} /> Full Name
            </span>
            {isEditing ? (
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                style={inputStyle}
              />
            ) : (
              <span style={{ fontSize: '15px', color: isDarkMode ? '#f8fafc' : '#0f172a', fontWeight: '500' }}>{formData.name}</span>
            )}
          </div>

          {/* Email Address */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaEnvelope size={12} /> Email Address
            </span>
            {isEditing ? (
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                style={inputStyle}
              />
            ) : (
              <span style={{ fontSize: '15px', color: isDarkMode ? '#f8fafc' : '#0f172a', fontWeight: '500' }}>{formData.email}</span>
            )}
          </div>

          {/* Phone Number */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaPhone size={12} /> Phone Number
            </span>
            {isEditing ? (
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                style={inputStyle}
              />
            ) : (
              <span style={{ fontSize: '15px', color: isDarkMode ? '#f8fafc' : '#0f172a', fontWeight: '500' }}>{formData.phone}</span>
            )}
          </div>

          {/* Location */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaMapMarkerAlt size={12} /> Location
            </span>
            {isEditing ? (
              <input 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange}
                style={inputStyle}
              />
            ) : (
              <span style={{ fontSize: '15px', color: isDarkMode ? '#f8fafc' : '#0f172a', fontWeight: '500' }}>{formData.location}</span>
            )}
          </div>
        </div>

        {/* Bio / About */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', paddingTop: '8px' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Bio / About</span>
          {isEditing ? (
            <textarea 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange}
              rows={3}
              style={{
                ...inputStyle,
                resize: 'vertical'
              }}
            />
          ) : (
            <div style={{ fontSize: '14px', color: isDarkMode ? '#cbd5e1' : '#475569', lineHeight: '1.6' }}>
              {formData.bio}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;