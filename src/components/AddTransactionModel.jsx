import React, { useState } from 'react';
import { FaTimes, FaPlusCircle } from 'react-icons/fa';
import { useTransactions } from '../context/TransactionContext';
import { useTheme } from '../context/ThemeContext';

function AddTransactionModel({ isOpen, onClose }) {
  const { addTransaction } = useTransactions();
  const { isDarkMode } = useTheme();

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food & Dining',
    source: 'HDFC Bank Account'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) {
      alert('Kripya title aur amount bharein!');
      return;
    }

    addTransaction(formData);
    setFormData({ title: '', amount: '', type: 'expense', category: 'Food & Dining', source: 'HDFC Bank Account' });
    onClose();
  };

  const inputStyle = {
    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
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
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <div style={{
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#0f172a',
        padding: '24px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '420px',
        border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Add New Transaction</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '16px', cursor: 'pointer' }}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', color: '#94a3b8' }}>Transaction Type</label>
            <select 
              value={formData.type} 
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              style={inputStyle}
            >
              <option value="expense">Expense (-)</option>
              <option value="income">Income (+)</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', color: '#94a3b8' }}>Title / Description</label>
            <input 
              type="text" 
              placeholder="e.g. Swiggy, Groceries, Salary" 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', color: '#94a3b8' }}>Amount (₹)</label>
            <input 
              type="number" 
              placeholder="0.00" 
              value={formData.amount} 
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', color: '#94a3b8' }}>Category</label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={inputStyle}
            >
              <option value="Food & Dining">Food & Dining</option>
              <option value="Rent & Bills">Rent & Bills</option>
              <option value="Shopping">Shopping</option>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <button 
            type="submit"
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '10px'
            }}
          >
            <FaPlusCircle /> Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModel;