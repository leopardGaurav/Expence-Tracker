import React from 'react';

function SidebarNav({ setActiveView, activeView, onAddTransaction }) {
    const getLinkStyle = (viewName) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '8px',
    color: activeView === viewName ? '#ffffff' : '#94a3b8',
    backgroundColor: activeView === viewName ? '#334155' : 'transparent',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: activeView === viewName ? '600' : '500',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    textAlign: 'left'
  });
  
    return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
      
      {/* 1. Add Transaction Button */}
      <button 
        onClick={onAddTransaction} // Yeh add karna zaroori hai taaki modal khul sake
        style={{
          width: '100%',
          padding: '10px 15px',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>+</span>
        <span>Add Transaction</span>
      </button>

      {/* 2. Navigation Links Section */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        
        {/* Dashboard Link */}
        <button onClick={() => setActiveView('dashboard')} style={getLinkStyle('dashboard')}>
          <span>🏠</span>
          <span>Dashboard</span>
        </button>

        {/* Transactions Link */}
        <button onClick={() => setActiveView('transactions')} style={getLinkStyle('transactions')}>
          <span>💳</span>
          <span>Transactions</span>
        </button>

        {/* Analytics Link */}
        <button onClick={() => setActiveView('analytics')} style={getLinkStyle('analytics')}>
          <span>📊</span>
          <span>Analytics</span>
        </button>

        {/* Budgets Link */}
        <button onClick={() => setActiveView('budgets')} style={getLinkStyle('budgets')}>
          <span>🎯</span>
          <span>Budgets</span>
        </button>

        {/* Categories Link */}
        <button onClick={() => setActiveView('categories')} style={getLinkStyle('categories')}>
          <span>🏷️</span>
          <span>Categories</span>
        </button>

        {/* Accounts Link */}
        <button onClick={() => setActiveView('accounts')} style={getLinkStyle('accounts')}>
          <span>🏦</span>
          <span>Accounts</span>
        </button>

      </nav>

    </div>
  );
}

export default SidebarNav;