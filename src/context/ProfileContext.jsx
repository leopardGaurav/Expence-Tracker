import React, { createContext, useState, useContext, useEffect } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  // 1. LocalStorage se profile load karna (agar pehle se saved hai toh wahi aayegi)
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('tracker_profile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: 'Gaurav Kumar',
      email: 'gaurav.kumar@example.com',
      phone: '+91 98765 43210',
      location: 'Araria, Bihar, India',
      occupation: 'Computer Science Engineering Student & Developer',
      bio: 'Building responsive web applications and managing personal finances efficiently.',
      plan: 'Free Plan',
      avatar: '' // Profile photo URL ke liye
    };
  });

  // 2. Profile change hone par automatic localStorage mein save karna
  useEffect(() => {
    localStorage.setItem('tracker_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);