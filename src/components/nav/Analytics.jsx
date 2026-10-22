import React, { useState } from 'react';
import { 
  FaChartLine, 
  FaChartPie, 
  FaPiggyBank, 
  FaCalendarAlt, 
  FaArrowDown,
  FaFilter
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useTransactions } from '../../context/TransactionContext'; // Global Transaction Context

function Analytics() {
  const { isDarkMode } = useTheme();
  const { transactions } = useTransactions(); // Real-time transactions list
  const [timeRange, setTimeRange] = useState('all');

  // Core Calculations from Real Data
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalSaved = Math.max(0, totalIncome - totalExpense);
  const savingsRate = totalIncome > 0 ? Math.round((totalSaved / totalIncome) * 100) : 0;

  // Average Daily Spend Calculation
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const uniqueExpenseDays = new Set(expenseTransactions.map(t => t.date)).size;
  const avgDailySpend = uniqueExpenseDays > 0 ? (totalExpense / uniqueExpenseDays) : 0;

  // Peak Expense Day Calculation
  const dailyExpenses = expenseTransactions.reduce((acc, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + Number(curr.amount);
    return acc;
  }, {});

  let peakDayDate = 'N/A';
  let peakDayAmount = 0;
  Object.entries(dailyExpenses).forEach(([date, amount]) => {
    if (amount > peakDayAmount) {
      peakDayAmount = amount;
      peakDayDate = date;
    }
  });

  // Category Breakdown Calculation
  const categoryTotals = expenseTransactions.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const categoryList = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]);

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

      {/* ==================== 1. HEADER & PERIOD FILTER ==================== */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
            Analytics & Insights
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#94a3b8' }}>
            Visual analysis of your income, expenses, and savings habits.
          </p>
        </div>

        {/* Time Filter */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
          padding: '6px 12px', 
          borderRadius: '8px', 
          border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <FaFilter style={{ color: '#94a3b8', fontSize: '12px' }} />
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            style={{
              backgroundColor: 'transparent',
              color: isDarkMode ? '#ffffff' : '#0f172a',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            <option value="all" style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>All Time</option>
            <option value="thisMonth" style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>Current Month</option>
          </select>
        </div>
      </div>

      {/* ==================== 2. CORE METRIC SUMMARY CARDS ==================== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {/* Savings Rate Card */}
        <div style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
          padding: '20px', 
          borderRadius: '12px', 
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>Savings Rate</span>
            <FaPiggyBank style={{ color: '#22c55e', fontSize: '18px' }} />
          </div>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: '#22c55e' }}>{savingsRate}% Saved</h2>
          <div style={{ width: '100%', height: '6px', backgroundColor: isDarkMode ? '#334155' : '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${savingsRate}%`, height: '100%', backgroundColor: '#22c55e' }}></div>
          </div>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            Saved ₹{totalSaved.toLocaleString('en-IN', { minimumFractionDigits: 2 })} of ₹{totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })} earned
          </span>
        </div>

        {/* Avg Daily Expense */}
        <div style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
          padding: '20px', 
          borderRadius: '12px', 
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>Avg Daily Spend</span>
            <FaCalendarAlt style={{ color: '#3b82f6', fontSize: '18px' }} />
          </div>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
            ₹{avgDailySpend.toLocaleString('en-IN', { minimumFractionDigits: 2 })} / day
          </h2>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Calculated over active spending days</span>
        </div>

        {/* Peak Expense Day */}
        <div style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
          padding: '20px', 
          borderRadius: '12px', 
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>Highest Spend Day</span>
            <FaArrowDown style={{ color: '#ef4444', fontSize: '18px' }} />
          </div>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: '#ef4444' }}>
            ₹{peakDayAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h2>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Recorded on {peakDayDate}</span>
        </div>
      </div>

      {/* ==================== 3. CHARTS & DETAILED BREAKDOWN ==================== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>

        {/* Cash Flow Summary Card */}
        <div style={{
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaChartLine style={{ color: '#3b82f6', fontSize: '18px' }} />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Overall Cash Flow</h3>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
              <span style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>● Income</span>
              <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>● Expense</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {transactions.length > 0 ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
                  <span>Total Overview</span>
                  <span style={{ color: '#94a3b8' }}>+₹{totalIncome.toLocaleString('en-IN')} | -₹{totalExpense.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', gap: '4px', height: '12px', backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${(totalIncome / (totalIncome + totalExpense || 1)) * 100}%`, backgroundColor: '#22c55e' }} title="Income"></div>
                  <div style={{ width: `${(totalExpense / (totalIncome + totalExpense || 1)) * 100}%`, backgroundColor: '#ef4444' }} title="Expense"></div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#94a3b8', fontSize: '13px' }}>
                No transaction data available for cash flow calculation.
              </div>
            )}
          </div>
        </div>

        {/* Expense Category Share */}
        <div style={{
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaChartPie style={{ color: '#a855f7', fontSize: '18px' }} />
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Spending Share by Category</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {categoryList.length > 0 ? (
              categoryList.map(([category, amount], index) => {
                const percentage = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;
                const barColors = ['#3b82f6', '#a855f7', '#22c55e', '#eab308', '#ec4899'];
                return (
                  <div key={category}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
                      <span>🏷️ {category}</span>
                      <strong>₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })} ({percentage}%)</strong>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: barColors[index % barColors.length] }}></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#94a3b8', fontSize: '13px' }}>
                No expense transactions recorded yet.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

export default Analytics;