import React, { useState } from 'react';
import { FaBars, FaSearch, FaBell, FaSun, FaMoon } from 'react-icons/fa';
import { useProfile } from '../context/ProfileContext';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';

function Header({ toggleSidebar, setActiveView, searchTerm, setSearchTerm }) {
  const { profile } = useProfile();
  const { isDarkMode, toggleTheme } = useTheme();
  const { notifications, markAllAsRead, clearAllNotifications } = useNotifications();
  
  const [showDropdown, setShowDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const initials = profile.name
    ? profile.name
        .split(' ')
        .filter(Boolean)
        .map(word => word[0])
        .join('')
        .toUpperCase()
    : 'GK';

  const handleSearchChange = (e) => {
    const query = e.target.value;
    if (setSearchTerm) {
      setSearchTerm(query);
    }
    // Agar user search kare toh automatic Transactions page par switch ho jaye aur results filter dikhein
    if (query.trim() !== '' && setActiveView) {
      setActiveView('transactions');
    }
  };

  return (
    <header style={{
      height: '60px',
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      
      {/* 1. LEFT SECTION */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          onClick={toggleSidebar} 
          style={{
            background: 'transparent',
            border: 'none',
            color: isDarkMode ? '#ffffff' : '#0f172a',
            outline: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            marginRight: '15px',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FaBars />
        </button>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#0f172a' }}>Expense Tracker</h2>
      </div>

      {/* 2. MIDDLE SECTION (Functional Search Bar) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9',
        padding: '6px 12px',
        borderRadius: '8px',
        border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
        width: '300px'
      }}>
        <FaSearch style={{ color: '#94a3b8', marginRight: '8px', fontSize: '14px' }} />
        <input 
          type="text" 
          placeholder="Search expenses, categories..." 
          value={searchTerm || ''}
          onChange={handleSearchChange}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: isDarkMode ? '#ffffff' : '#0f172a',
            fontSize: '14px',
            width: '100%'
          }}
        />
      </div>

      {/* 3. RIGHT SECTION */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        
        {/* Notification Bell & Dropdown */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setShowDropdown(!showDropdown)} 
            style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px' }}
          >
            <FaBell style={{ fontSize: '18px', color: isDarkMode ? '#cbd5e1' : '#475569' }} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                width: '8px',
                height: '8px',
                backgroundColor: '#ef4444',
                borderRadius: '50%'
              }}></span>
            )}
          </div>

          {showDropdown && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '45px',
              width: '320px',
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              zIndex: 1000,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', paddingBottom: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '15px', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
                  Notifications ({notifications.length})
                </h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {notifications.length > 0 && (
                    <>
                      <span onClick={markAllAsRead} style={{ fontSize: '11px', color: '#3b82f6', cursor: 'pointer' }}>
                        Read all
                      </span>
                      <span onClick={clearAllNotifications} style={{ fontSize: '11px', color: '#ef4444', cursor: 'pointer' }}>
                        Clear
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div style={{ maxHeight: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div key={item.id} style={{
                      padding: '10px',
                      borderRadius: '8px',
                      backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                      border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
                        <span>{item.title}</span>
                        <span style={{ fontSize: '10px', color: '#94a3b8' }}>{item.time}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>{item.message}</p>
                      <span style={{ fontSize: '10px', color: '#64748b', textAlign: 'right' }}>{item.date}</span>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8', padding: '30px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <FaBell style={{ fontSize: '24px', opacity: 0.3 }} />
                    <span>No notifications yet!</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            color: isDarkMode ? '#cbd5e1' : '#475569',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <FaSun style={{ color: '#f59e0b' }} /> : <FaMoon />}
        </button>

        {/* User Profile */}
        <div 
          onClick={() => setActiveView && setActiveView('profile')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            cursor: 'pointer',
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9',
            padding: '4px 10px',
            borderRadius: '20px',
            border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1'
          }}
        >
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '12px',
            flexShrink: 0
          }}>
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              initials || 'GK'
            )}
          </div>
          <span style={{ fontSize: '14px', fontWeight: '500', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
            {profile.name}
          </span>
        </div>

      </div>

    </header>
  );
}

export default Header;