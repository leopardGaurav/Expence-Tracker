import React, { useState } from 'react';
import { 
  FaPlus, 
  FaBullseye, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaEdit, 
  FaTrash,
  FaWallet,
  FaTimes,
  FaCoins
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

function Budgets() {
  const { isDarkMode } = useTheme();

  // Budgets State with Manual Spent Amount Support
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Food & Dining', icon: '🍔', allocated: 10000, spent: 4500, color: '#3b82f6' },
    { id: 2, category: 'Rent & Utilities', icon: '🏠', allocated: 5000, spent: 5000, color: '#ef4444' },
    { id: 3, category: 'Shopping & Lifestyle', icon: '🛍️', allocated: 5000, spent: 2100, color: '#22c55e' },
    { id: 4, category: 'Travel & Transport', icon: '🚗', allocated: 3000, spent: 1200, color: '#eab308' }
  ]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null); // For Editing existing budget

  // Form Input States
  const [category, setCategory] = useState('');
  const [allocated, setAllocated] = useState('');
  const [spent, setSpent] = useState('');
  const [icon, setIcon] = useState('🏷️');

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingBudget(null);
    setCategory('');
    setAllocated('');
    setSpent('0');
    setIcon('🏷️');
    setIsModalOpen(true);
  };

  // Open Edit Modal for Specific Card
  const handleOpenEditModal = (item) => {
    setEditingBudget(item);
    setCategory(item.category);
    setAllocated(item.allocated);
    setSpent(item.spent || 0);
    setIcon(item.icon);
    setIsModalOpen(true);
  };

  // Submit Handler for Create / Update
  const handleSaveBudget = (e) => {
    e.preventDefault();
    if (!category || !allocated) return;

    if (editingBudget) {
      // Update existing budget card
      setBudgets(budgets.map(b => 
        b.id === editingBudget.id 
          ? { ...b, category, allocated: Number(allocated), spent: Number(spent), icon }
          : b
      ));
    } else {
      // Add new budget card
      const newBudgetItem = {
        id: Date.now(),
        category,
        icon,
        allocated: Number(allocated),
        spent: Number(spent) || 0,
        color: '#3b82f6'
      };
      setBudgets([...budgets, newBudgetItem]);
    }

    setIsModalOpen(false);
  };

  // Delete Budget
  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  // Overall Totals
  const totalAllocated = budgets.reduce((acc, curr) => acc + Number(curr.allocated), 0);
  const totalSpent = budgets.reduce((acc, curr) => acc + Number(curr.spent), 0);
  const remainingBudget = totalAllocated - totalSpent;
  const overallPercentage = totalAllocated > 0 ? Math.min(Math.round((totalSpent / totalAllocated) * 100), 100) : 0;

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

      {/* ==================== 1. HEADER SECTION ==================== */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
            Budgets & Spending Limits
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#94a3b8' }}>
            Set category targets and track used budget vs remaining limits.
          </p>
        </div>

        <button 
          onClick={handleOpenCreateModal}
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}
        >
          <FaPlus /> Create New Budget
        </button>
      </div>

      {/* ==================== 2. SUMMARY CARDS ==================== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px'
      }}>
        
        {/* Total Budget Target */}
        <div style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
          padding: '20px', 
          borderRadius: '12px', 
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>Total Budget Target</span>
            <FaBullseye style={{ color: '#3b82f6', fontSize: '18px' }} />
          </div>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#0f172a' }}>
            ₹{totalAllocated.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h2>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Combined monthly limit</span>
        </div>

        {/* Used Budget Section */}
        <div style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
          padding: '20px', 
          borderRadius: '12px', 
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>Total Used Budget</span>
            <FaWallet style={{ color: '#a855f7', fontSize: '18px' }} />
          </div>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: '#a855f7' }}>
            ₹{totalSpent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h2>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>{overallPercentage}% of total limit used</span>
        </div>

        {/* Remaining Budget Section */}
        <div style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
          padding: '20px', 
          borderRadius: '12px', 
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>Remaining Balance</span>
            {remainingBudget >= 0 ? (
              <FaCheckCircle style={{ color: '#22c55e', fontSize: '18px' }} />
            ) : (
              <FaExclamationTriangle style={{ color: '#ef4444', fontSize: '18px' }} />
            )}
          </div>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: remainingBudget >= 0 ? '#22c55e' : '#ef4444' }}>
            ₹{remainingBudget.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h2>
          <span style={{ fontSize: '12px', color: remainingBudget >= 0 ? '#22c55e' : '#ef4444' }}>
            {remainingBudget >= 0 ? 'Safe zone maintained' : 'Budget Exceeded!'}
          </span>
        </div>

      </div>

      {/* ==================== 3. SPECIFIC CATEGORY CARDS GRID ==================== */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
          Category Cards Breakdown
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {budgets.map((item) => {
            const itemSpent = item.spent || 0;
            const itemRemaining = item.allocated - itemSpent;
            const pct = item.allocated > 0 ? Math.round((itemSpent / item.allocated) * 100) : 0;
            const isExceeded = itemSpent > item.allocated;
            const barColor = isExceeded ? '#ef4444' : pct > 80 ? '#eab308' : '#2563eb';

            return (
              <div 
                key={item.id}
                style={{
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  padding: '20px',
                  borderRadius: '12px',
                  border: isExceeded ? '1px solid #ef4444' : (isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0'),
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                {/* Header: Name, Icon & Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '22px', backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9', padding: '8px', borderRadius: '8px' }}>
                      {item.icon}
                    </span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>{item.category}</h4>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>Total Target: ₹{item.allocated.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => handleOpenEditModal(item)}
                      style={{ backgroundColor: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '14px' }}
                      title="Edit Budget & Add Usage"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteBudget(item.id)}
                      style={{ backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}
                      title="Delete Budget"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* Specific Card Metrics: Used vs Remaining */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block', fontSize: '11px' }}>Used Budget:</span>
                    <strong style={{ color: '#a855f7' }}>₹{itemSpent.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block', fontSize: '11px' }}>Remaining:</span>
                    <strong style={{ color: itemRemaining >= 0 ? '#22c55e' : '#ef4444' }}>
                      ₹{itemRemaining.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}>Usage Progress</span>
                    <strong style={{ color: barColor }}>{pct}%</strong>
                  </div>

                  <div style={{ width: '100%', height: '8px', backgroundColor: isDarkMode ? '#334155' : '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', backgroundColor: barColor, transition: 'width 0.4s ease-in-out' }}></div>
                  </div>
                </div>

                {/* Footer Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: isExceeded ? '#ef4444' : '#22c55e' }}>
                  {isExceeded ? (
                    <>
                      <FaExclamationTriangle />
                      <span>Exceeded limit by ₹{Math.abs(itemRemaining).toLocaleString('en-IN')}!</span>
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />
                      <span>₹{itemRemaining.toLocaleString('en-IN')} still available</span>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ==================== 4. CREATE / EDIT MODAL POPUP ==================== */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '420px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
                {editingBudget ? `Edit ${editingBudget.category} Budget` : 'Create New Budget Target'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '16px', cursor: 'pointer' }}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSaveBudget} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Category Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8' }}>Category Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Food, Groceries, Fuel"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
                    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                    color: isDarkMode ? '#ffffff' : '#0f172a',
                    outline: 'none',
                    fontSize: '14px'
                  }}
                />
              </div>

              {/* Total Allocated Amount */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8' }}>Total Budget Target (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 10000"
                  value={allocated}
                  onChange={(e) => setAllocated(e.target.value)}
                  required
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
                    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                    color: isDarkMode ? '#ffffff' : '#0f172a',
                    outline: 'none',
                    fontSize: '14px'
                  }}
                />
              </div>

              {/* Used Amount Input (Add/Edit Used Budget) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#a855f7', fontWeight: '600' }}>Used Budget Amount (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 2500"
                  value={spent}
                  onChange={(e) => setSpent(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #a855f7',
                    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                    color: isDarkMode ? '#ffffff' : '#0f172a',
                    outline: 'none',
                    fontSize: '14px'
                  }}
                />
              </div>

              {/* Icon */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8' }}>Category Emoji</label>
                <input 
                  type="text" 
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  maxLength="2"
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
                    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                    color: isDarkMode ? '#ffffff' : '#0f172a',
                    outline: 'none',
                    fontSize: '14px',
                    width: '60px',
                    textAlign: 'center'
                  }}
                />
              </div>

              <button 
                type="submit"
                style={{
                  marginTop: '10px',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {editingBudget ? 'Update Budget' : 'Save Budget'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Budgets;