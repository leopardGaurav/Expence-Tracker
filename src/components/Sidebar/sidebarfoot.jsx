import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { useTheme } from '../../context/ThemeContext';

function SidebarFoot({ setActiveView, activeView }) {
  const { profile } = useProfile();
  const { isDarkMode } = useTheme();

  const initials = profile.name
    ? profile.name
        .split(' ')
        .filter(Boolean)
        .map(word => word[0])
        .join('')
        .toUpperCase()
    : 'GK';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      paddingTop: '15px',
      borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
      width: '100%'
    }}>
      
      {/* 1. Settings Link */}
      <button 
        onClick={() => setActiveView('settings')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 12px',
          borderRadius: '8px',
          color: activeView === 'settings' 
            ? (isDarkMode ? '#ffffff' : '#0f172a') 
            : '#94a3b8',
          backgroundColor: activeView === 'settings' 
            ? (isDarkMode ? '#334155' : '#e2e8f0') 
            : 'transparent',
          textDecoration: 'none',
          fontSize: '15px',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left'
        }}
      >
        <span>⚙️</span>
        <span>Settings</span>
      </button>

      {/* 2. User Profile Card */}
      <div 
        onClick={() => setActiveView('profile')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 12px',
          borderRadius: '8px',
          backgroundColor: activeView === 'profile' 
            ? (isDarkMode ? '#334155' : '#e2e8f0') 
            : (isDarkMode ? '#0f172a' : '#f8fafc'),
          cursor: 'pointer',
          border: activeView === 'profile' 
            ? (isDarkMode ? '1px solid #475569' : '1px solid #cbd5e1') 
            : '1px solid transparent',
          transition: 'background-color 0.2s'
        }}
      >
        <div style={{
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '14px',
          flexShrink: 0
        }}>
          {profile.avatar ? (
            <img src={profile.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            initials || 'GK'
          )}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ 
            margin: 0, 
            fontSize: '14px', 
            fontWeight: '600', 
            color: isDarkMode ? '#ffffff' : '#0f172a',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {profile.name}
          </p>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            {profile.plan || 'Free Plan'}
          </span>
        </div>
      </div>

    </div>
  );
}

export default SidebarFoot;