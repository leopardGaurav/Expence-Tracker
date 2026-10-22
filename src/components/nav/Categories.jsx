import React, { useState } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaArrowUp, 
  FaArrowDown, 
  FaTimes,
  FaTag
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useTransactions } from '../../context/TransactionContext'; // Global context import kiya

function Categories() {
  const { isDarkMode } = useTheme();
  const { transactions, categories, addCategory, deleteCategory } = useTransactions(); // Context se live data aur functions liye

  const [activeTab, setActiveTab] = useState('all');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('expense');
  const [icon, setIcon] = useState('🏷️');

  // Add New Category Handler
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCategory({
      name,
      type,
      icon
    });

    setName('');
    setType('expense');
    setIcon('🏷️');
    setIsModalOpen(false);
  };

  // Calculate Real-time Spent/Income & Count from Transactions
  const categoriesWithStats = categories.map((cat) => {
    const matchedTxns = transactions.filter(
      (t) => t.category.toLowerCase() === cat.name.toLowerCase()
    );

    const totalAmount = matchedTxns.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0
    );

    return {
      ...cat,
      count: matchedTxns.length,
      totalAmount
    };
  });

  // Filter based on selected tab
  const filteredCategories = categoriesWithStats.filter((cat) => {
    if (activeTab === 'income') return cat.type === 'income';
    if (activeTab === 'expense') return cat.type === 'expense';
    return true;
  });

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
            Categories Management
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#94a3b8' }}>
            Create and organize categories with live automated transaction counts & expense tracking.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
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
          <FaPlus /> Add Category
        </button>
      </div>

      {/* ==================== 2. TABS FILTER ==================== */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('all')}
          style={{
            backgroundColor: activeTab === 'all' ? (isDarkMode ? '#334155' : '#e2e8f0') : 'transparent',
            color: activeTab === 'all' ? (isDarkMode ? '#ffffff' : '#0f172a') : '#94a3b8',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          All Categories ({categories.length})
        </button>

        <button
          onClick={() => setActiveTab('expense')}
          style={{
            backgroundColor: activeTab === 'expense' ? (isDarkMode ? '#334155' : '#e2e8f0') : 'transparent',
            color: activeTab === 'expense' ? '#ef4444' : '#94a3b8',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <FaArrowDown size={12} /> Expense
        </button>

        <button
          onClick={() => setActiveTab('income')}
          style={{
            backgroundColor: activeTab === 'income' ? (isDarkMode ? '#334155' : '#e2e8f0') : 'transparent',
            color: activeTab === 'income' ? '#22c55e' : '#94a3b8',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <FaArrowUp size={12} /> Income
        </button>
      </div>

      {/* ==================== 3. CATEGORIES GRID ==================== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              padding: '20px',
              borderRadius: '12px',
              border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{
                  fontSize: '22px',
                  backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9',
                  padding: '10px',
                  borderRadius: '10px',
                  border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0'
                }}>
                  {cat.icon}
                </span>

                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
                    {cat.name}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      color: cat.type === 'income' ? '#22c55e' : '#ef4444'
                    }}>
                      {cat.type}
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>•</span>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{cat.count} txns</span>
                  </div>
                </div>
              </div>

              {/* Delete Action */}
              <button
                onClick={() => deleteCategory(cat.id)}
                style={{ backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}
                title="Delete Category"
              >
                <FaTrash />
              </button>
            </div>

            {/* Total Spend/Income Calculation Box */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
              padding: '10px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              marginTop: '4px'
            }}>
              <span style={{ color: '#94a3b8' }}>Total {cat.type === 'income' ? 'Earned' : 'Spent'}:</span>
              <strong style={{ color: cat.type === 'income' ? '#22c55e' : '#ef4444', fontSize: '14px' }}>
                {cat.type === 'income' ? '+' : '-'}₹{cat.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </strong>
            </div>
          </div>
        ))}
      </div>

      {/* ==================== 4. ADD CATEGORY MODAL POPUP ==================== */}
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
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Add New Category</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '16px', cursor: 'pointer' }}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8' }}>Category Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Subscriptions, Investments"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8' }}>Category Type</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
                    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                    color: isDarkMode ? '#ffffff' : '#0f172a',
                    outline: 'none',
                    fontSize: '14px'
                  }}
                >
                  <option value="expense">Expense (-)</option>
                  <option value="income">Income (+)</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8' }}>Category Emoji / Icon</label>
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
                Save Category
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Categories;