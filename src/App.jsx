import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SidebarHead from './components/Sidebar/Sidebarhead';
import SidebarFoot from './components/Sidebar/sidebarfoot';
import SidebarNav from './components/Sidebar/sidebarnav';
import { NotificationToast } from './components/NotificationToast';
import AddTransactionModel from './components/AddTransactionModel';

import Dashboard from './components/nav/Dashboard';
import Transactions from './components/nav/Transactions';
import Categories from './components/nav/Categories';
import Budgets from './components/nav/Budgets';
import Analytics from './components/nav/Analytics';
import Accounts from './components/nav/Accounts';
import Settings from './components/nav/settings';
import Profile from './components/nav/profile';
import LandingPage from './pages/LandingPage';

import { ProfileProvider } from './context/ProfileContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { TransactionProvider } from './context/TransactionContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import './App.css';

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions onOpenModal={() => setIsModalOpen(true)} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>;
      case 'analytics':
        return <Analytics />;
      case 'budgets':
        return <Budgets />;
      case 'categories':
        return <Categories />;
      case 'accounts':
        return <Accounts />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
      color: isDarkMode ? '#ffffff' : '#0f172a',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      {/* 1. TOP HEADER */}
      <Header toggleSidebar={toggleSidebar} 
        setActiveView={setActiveView} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      {/* 2. MAIN BODY AREA */}
      <div style={{ display: 'flex', flex: 1, width: '100%', overflow: 'hidden' }}>
        
        {/* FIXED SIDEBAR */}
        <aside style={{
          width: isSidebarOpen ? '240px' : '0px',
          minWidth: isSidebarOpen ? '240px' : '0px',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#0f172a',
          borderRight: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          padding: isSidebarOpen ? '20px' : '0px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          whiteSpace: 'nowrap',
          height: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', flex: 1 }}>
            <SidebarHead onAddTransaction={() => setIsModalOpen(true)} />
            <SidebarNav setActiveView={setActiveView} 
              activeView={activeView} 
              onAddTransaction={()=>setIsModalOpen(true)}
            />
          </div>

          <SidebarFoot setActiveView={setActiveView} activeView={activeView} />
        </aside>

        {/* SCROLLABLE MAIN CONTENT */}
        <main style={{ 
          flex: 1, 
          padding: '20px', 
          backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9', 
          color: isDarkMode ? '#ffffff' : '#0f172a', 
          overflowY: 'auto',
          height: '100%',
          boxSizing: 'border-box',
          transition: 'background-color 0.3s ease'
        }}>
          {renderView()}
        </main>

      </div>

      {/* Live Toast Notification Popup */}
      <NotificationToast />
      <AddTransactionModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

// Auth Wrapper Component to check login state
function RootApp() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return <AppContent />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProfileProvider>
          <NotificationProvider>
            <TransactionProvider>
              <RootApp />
            </TransactionProvider>
          </NotificationProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;