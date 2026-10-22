import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { FaBell } from 'react-icons/fa';

export function NotificationToast() {
  const { toast } = useNotifications();

  if (!toast) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      backgroundColor: '#1e293b',
      color: '#ffffff',
      border: '1px solid #334155',
      padding: '14px 18px',
      borderRadius: '10px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <FaBell style={{ color: '#f59e0b', fontSize: '20px' }} />
      <div>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{toast.title}</div>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{toast.message}</div>
      </div>
    </div>
  );
}