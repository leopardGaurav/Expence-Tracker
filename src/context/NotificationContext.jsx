import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  // Starting mein koi dummy data nahi, bilkul empty array
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(null);

  // Naya notification live add karne ke liye function
  const addNotification = (title, message) => {
    const now = new Date();
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);

    // Toast popup trigger (4 seconds ke liye)
    setToast(newNotif);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAllAsRead, clearAllNotifications, toast }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);