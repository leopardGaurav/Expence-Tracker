import React from 'react';
import { FaWallet, FaArrowUp, FaArrowDown, FaCalendarWeek, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useTransactions } from '../../context/TransactionContext'; // Global Context import kiya

function Dashboard() {
  const { isDarkMode } = useTheme();
  const { transactions } = useTransactions(); // Real-time transactions list

  // Real Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  // Recent 3 Transactions for Dashboard
  const recentTransactions = transactions.slice(0, 3);

  // Category Breakdown Calculation
  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
      return acc;
    }, {});

  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

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

      {/* ==================== PART 1: HEADER SECTION ==================== */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
          Dashboard
        </h1>
        <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
          Overview of your financial performance and summaries.
        </p>
      </section>

      {/* ==================== PART 2: 3 CORE SUMMARY CARDS ==================== */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px'
      }}>

        {/* Card 1: Total Balance */}
        <div style={{
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>Total Balance</span>
            <FaWallet style={{ color: '#3b82f6', fontSize: '20px' }} />
          </div>
          <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#0f172a' }}>
            ₹{totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h2>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            {transactions.length > 0 ? 'Updated live from transactions' : 'No transactions recorded yet'}
          </span>
        </div>

        {/* Card 2: Total Income */}
        <div style={{
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>Total Income</span>
            <FaArrowUp style={{ color: '#22c55e', fontSize: '20px' }} />
          </div>
          <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#22c55e' }}>
            ₹{totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h2>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Total earnings</span>
        </div>

        {/* Card 3: Total Expense */}
        <div style={{
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>Total Expense</span>
            <FaArrowDown style={{ color: '#ef4444', fontSize: '20px' }} />
          </div>
          <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#ef4444' }}>
            ₹{totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h2>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Total spent</span>
        </div>

      </section>

      {/* ==================== PART 3: WEEKLY & MONTHLY BREAKDOWN CARDS ==================== */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>

        {/* Weekly Summary */}
        <div style={{
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaCalendarWeek style={{ color: '#3b82f6', fontSize: '20px' }} />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Weekly Summary</h3>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: isDarkMode ? '#cbd5e1' : '#475569' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Income This Week:</span>
              <strong style={{ color: '#22c55e' }}>+₹{totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Spent This Week:</span>
              <strong style={{ color: '#ef4444' }}>-₹{totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', paddingTop: '10px' }}>
              <span>Net Saved:</span>
              <strong style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}>₹{totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
            </div>
          </div>
        </div>

        {/* Monthly Summary */}
        <div style={{
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaCalendarAlt style={{ color: '#a855f7', fontSize: '20px' }} />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Monthly Summary</h3>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: isDarkMode ? '#cbd5e1' : '#475569' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Income This Month:</span>
              <strong style={{ color: '#22c55e' }}>+₹{totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Spent This Month:</span>
              <strong style={{ color: '#ef4444' }}>-₹{totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', paddingTop: '10px' }}>
              <span>Net Saved:</span>
              <strong style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}>₹{totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
            </div>
          </div>
        </div>

      </section>

      {/* ==================== PART 4: RECENT TRANSACTIONS & TOP CATEGORIES ==================== */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>

        {/* Recent Transactions List */}
        <div style={{
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Recent Transactions</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentTransactions.length > 0 ? (
              recentTransactions.map((item, index) => (
                <div key={item.id || index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  borderBottom: index !== recentTransactions.length - 1 ? (isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0') : 'none', 
                  paddingBottom: index !== recentTransactions.length - 1 ? '10px' : '0' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{item.icon || (item.type === 'income' ? '💰' : '🛒')}</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: isDarkMode ? '#ffffff' : '#0f172a' }}>{item.title}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.date} • {item.time}</div>
                    </div>
                  </div>
                  <strong style={{ color: item.type === 'income' ? '#22c55e' : '#ef4444', fontSize: '14px' }}>
                    {item.type === 'income' ? '+' : '-'}₹{Number(item.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </strong>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#94a3b8', fontSize: '13px' }}>
                No recent transactions added yet. Click <strong>+ Add Transaction</strong> to get started!
              </div>
            )}
          </div>
        </div>

        {/* Top Spending Categories */}
        <div style={{
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Top Categories</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: isDarkMode ? '#ffffff' : '#0f172a' }}>
            {topCategories.length > 0 ? (
              topCategories.map(([category, amount], index) => {
                const percentage = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;
                const colors = ['#3b82f6', '#a855f7', '#22c55e'];
                return (
                  <div key={category}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span>🏷️ {category}</span>
                      <span style={{ color: '#94a3b8' }}>{percentage}% (₹{amount.toLocaleString('en-IN')})</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: isDarkMode ? '#334155' : '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: colors[index % colors.length] }}></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#94a3b8', fontSize: '13px' }}>
                No expense categories recorded yet.
              </div>
            )}
          </div>
        </div>

      </section>

      {/* ==================== FOOTER ==================== */}
      <footer style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '13px',
        color: '#94a3b8'
      }}>
        <div>
          © 2026 ExpenseTracker • Built by Gaurav
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ cursor: 'pointer' }}>Privacy</span>
          <span style={{ cursor: 'pointer' }}>Terms</span>
          <span style={{ cursor: 'pointer' }}>Support</span>
        </div>
      </footer>

    </div>
  );
}

export default Dashboard;