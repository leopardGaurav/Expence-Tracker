import React, { useState } from 'react';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaEdit, 
  FaTrash, 
  FaArrowUp, 
  FaArrowDown,
  FaExchangeAlt
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext'; 
import { useTransactions } from '../../context/TransactionContext';

function Transactions({ onOpenModal, searchTerm, setSearchTerm }) {
  const { isDarkMode } = useTheme();
  const { transactions, deleteTransaction } = useTransactions();

  // Search & Filter States
  const [localSearch, setLocalSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // Type filter state add kar di gayi hai

  const currentSearch = searchTerm !== undefined ? searchTerm : localSearch;
  const updateSearch = setSearchTerm || setLocalSearch;

  // Filtering Logic (currentSearch use kiya hai taaki header search live chale)
  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          txn.category.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          (txn.source && txn.source.toLowerCase().includes(currentSearch.toLowerCase()));
    
    const matchesType = typeFilter === 'all' || txn.type === typeFilter;

    return matchesSearch && matchesType;
  });

  // Net Flow Calculation
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const netFlow = totalIncome - totalExpense;

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
            Transactions History
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#94a3b8' }}>
            Track where your money came from and where it was spent.
          </p>
        </div>

        <button 
          onClick={onOpenModal}
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
          <FaPlus /> Add New Transaction
        </button>
      </div>

      {/* ==================== 2. TOOLBAR & FILTER SECTION ==================== */}
      <div style={{
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        padding: '16px',
        borderRadius: '12px',
        border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9',
          border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
          borderRadius: '8px',
          padding: '8px 14px',
          width: '300px',
          gap: '10px'
        }}>
          <FaSearch style={{ color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search transaction, source, category..."
            value={currentSearch}
            onChange={(e) => updateSearch(e.target.value)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: isDarkMode ? '#ffffff' : '#0f172a',
              fontSize: '14px',
              width: '100%'
            }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#94a3b8' }}>
            <FaFilter />
            <span>Filter By:</span>
          </div>

          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#0f172a',
              border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="all" style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>All Types</option>
            <option value="income" style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>Income Only (+)</option>
            <option value="expense" style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>Expense Only (-)</option>
          </select>
        </div>
      </div>

      {/* ==================== 3. TRANSACTIONS TABLE VIEW ==================== */}
      <div style={{
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        borderRadius: '12px',
        border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        overflowX: 'auto',
        boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{
              backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9',
              color: '#94a3b8',
              borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
              textTransform: 'uppercase',
              fontSize: '12px',
              letterSpacing: '0.5px'
            }}>
              <th style={{ padding: '16px' }}>Transaction & Category</th>
              <th style={{ padding: '16px' }}>Payment Source (Kahan se)</th>
              <th style={{ padding: '16px' }}>Date & Time</th>
              <th style={{ padding: '16px' }}>Type</th>
              <th style={{ padding: '16px', textAlign: 'right' }}>Amount</th>
              <th style={{ padding: '16px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((item) => (
                <tr 
                  key={item.id}
                  style={{
                    borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(51, 65, 85, 0.4)' : 'rgba(241, 245, 249, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {/* Title & Category */}
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ 
                        fontSize: '20px', 
                        backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9', 
                        padding: '8px', 
                        borderRadius: '8px',
                        border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0'
                      }}>
                        {item.icon || (item.type === 'income' ? '💰' : '🛒')}
                      </span>
                      <div>
                        <div style={{ fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.category}</div>
                      </div>
                    </div>
                  </td>

                  {/* Payment Source */}
                  <td style={{ padding: '16px', color: isDarkMode ? '#cbd5e1' : '#475569' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FaExchangeAlt style={{ color: '#64748b', fontSize: '12px' }} />
                      <span>{item.source || 'Default Account'}</span>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td style={{ padding: '16px' }}>
                    <div style={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}>{item.date}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.time}</div>
                  </td>

                  {/* Type Badge */}
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: item.type === 'income' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: item.type === 'income' ? '#22c55e' : '#ef4444'
                    }}>
                      {item.type === 'income' ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                      {item.type.toUpperCase()}
                    </span>
                  </td>

                  {/* Amount */}
                  <td style={{ 
                    padding: '16px', 
                    textAlign: 'right', 
                    fontWeight: 'bold', 
                    fontSize: '15px',
                    color: item.type === 'income' ? '#22c55e' : '#ef4444'
                  }}>
                    {item.type === 'income' ? '+' : '-'}₹{Number(item.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button 
                        onClick={() => deleteTransaction(item.id)}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                        title="Delete Transaction"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                  No transactions found matching your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ==================== 4. FOOTER SUMMARY BAR ==================== */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        borderRadius: '8px',
        border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        fontSize: '13px',
        color: '#94a3b8',
        boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <span>Showing <strong>{filteredTransactions.length}</strong> of <strong>{transactions.length}</strong> transactions</span>
        <span>
          Net Flow: <strong style={{ color: netFlow >= 0 ? '#22c55e' : '#ef4444' }}>
            {netFlow >= 0 ? '+' : '-'}₹{Math.abs(netFlow).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </strong>
        </span>
      </div>

    </div>
  );
}

export default Transactions;