import React, { useState } from 'react';
import { 
  FaPlus, 
  FaWallet, 
  FaUniversity, 
  FaCreditCard, 
  FaMobileAlt, 
  FaEdit, 
  FaTrash, 
  FaArrowRight,
  FaTimes 
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useTransactions } from '../../context/TransactionContext'; // Global Context import kiya

function Accounts() {
  const { isDarkMode } = useTheme();
  const { accounts, addAccount, updateAccount, deleteAccount, transferFunds } = useTransactions();

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  // Account Form States
  const [name, setName] = useState('');
  const [type, setType] = useState('Bank Account');
  const [accountNo, setAccountNo] = useState('');
  const [balance, setBalance] = useState('');

  // Transfer Form States
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingAccount(null);
    setName('');
    setType('Bank Account');
    setAccountNo('');
    setBalance('');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (acc) => {
    setEditingAccount(acc);
    setName(acc.name);
    setType(acc.type);
    setAccountNo(acc.accountNo);
    setBalance(acc.balance);
    setIsModalOpen(true);
  };

  // Save Account (Add or Update)
  const handleSaveAccount = (e) => {
    e.preventDefault();
    if (!name || balance === '') return;

    // Type ke hisab se icon choose karna
    let iconElement = <FaUniversity style={{ color: '#3b82f6', fontSize: '22px' }} />;
    if (type === 'Credit Card') iconElement = <FaCreditCard style={{ color: '#ef4444', fontSize: '22px' }} />;
    else if (type === 'Digital Wallet') iconElement = <FaMobileAlt style={{ color: '#a855f7', fontSize: '22px' }} />;
    else if (type === 'Cash in Hand') iconElement = <FaWallet style={{ color: '#eab308', fontSize: '22px' }} />;

    if (editingAccount) {
      updateAccount({
        ...editingAccount,
        name,
        type,
        accountNo: accountNo || '•••• 0000',
        balance: Number(balance),
        iconType: type
      });
    } else {
      addAccount({
        name,
        type,
        accountNo: accountNo || '•••• 0000',
        balance: Number(balance),
        iconType: type
      });
    }

    setIsModalOpen(false);
  };

  // Handle Transfer
  const handleTransferSubmit = (e) => {
    e.preventDefault();
    if (!fromAccount || !toAccount || !transferAmount) return;
    if (fromAccount === toAccount) {
      alert("Source and Destination accounts cannot be the same!");
      return;
    }

    transferFunds(Number(fromAccount), Number(toAccount), Number(transferAmount));
    setIsTransferModalOpen(false);
    setFromAccount('');
    setToAccount('');
    setTransferAmount('');
  };

  const totalNetWorth = accounts.reduce((acc, curr) => acc + Number(curr.balance), 0);

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
            Accounts & Payment Sources
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#94a3b8' }}>
            Manage your bank accounts, credit cards, digital wallets, and cash reserves.
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
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
          <FaPlus /> Add New Account
        </button>
      </div>

      {/* ==================== 2. TOTAL NET WORTH CARD ==================== */}
      <div style={{
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>
            Total Combined Net Worth
          </span>
          <h2 style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#0f172a' }}>
            ₹{totalNetWorth.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h2>
          <span style={{ fontSize: '12px', color: '#22c55e' }}>
            Across {accounts.length} active payment sources
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setIsTransferModalOpen(true)}
            style={{
              backgroundColor: isDarkMode ? '#334155' : '#f1f5f9',
              color: isDarkMode ? '#ffffff' : '#0f172a',
              border: isDarkMode ? '1px solid #475569' : '1px solid #cbd5e1',
              padding: '10px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Transfer Funds</span> <FaArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* ==================== 3. ACCOUNTS GRID ==================== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {accounts.map((acc) => (
          <div 
            key={acc.id}
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              padding: '20px',
              borderRadius: '12px',
              border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px',
              boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9',
                  padding: '10px',
                  borderRadius: '10px',
                  border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {acc.type === 'Credit Card' ? <FaCreditCard style={{ color: '#ef4444', fontSize: '22px' }} /> :
                   acc.type === 'Digital Wallet' ? <FaMobileAlt style={{ color: '#a855f7', fontSize: '22px' }} /> :
                   acc.type === 'Cash in Hand' ? <FaWallet style={{ color: '#eab308', fontSize: '22px' }} /> :
                   <FaUniversity style={{ color: '#3b82f6', fontSize: '22px' }} />}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
                    {acc.name}
                  </h4>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {acc.type} • {acc.accountNo}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => handleOpenEdit(acc)}
                  style={{ backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}
                  title="Edit Account"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => deleteAccount(acc.id)}
                  style={{ backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}
                  title="Delete Account"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', paddingTop: '14px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>Available Balance</span>
              <h3 style={{ 
                margin: 0, 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: Number(acc.balance) < 0 ? '#ef4444' : '#22c55e' 
              }}>
                {Number(acc.balance) < 0 ? '-' : ''}₹{Math.abs(Number(acc.balance)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* ==================== 4. ADD / EDIT ACCOUNT MODAL ==================== */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', padding: '24px', borderRadius: '12px',
            width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px',
            border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
                {editingAccount ? 'Edit Account' : 'Add New Account'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '16px', cursor: 'pointer' }}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSaveAccount} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8' }}>Account / Source Name</label>
                <input 
                  type="text" placeholder="e.g. Axis Bank Salary" value={name} onChange={(e) => setName(e.target.value)} required
                  style={{ padding: '10px', borderRadius: '8px', border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1', backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? '#ffffff' : '#0f172a', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8' }}>Account Type</label>
                <select 
                  value={type} onChange={(e) => setType(e.target.value)}
                  style={{ padding: '10px', borderRadius: '8px', border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1', backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? '#ffffff' : '#0f172a', outline: 'none' }}
                >
                  <option value="Bank Account">Bank Account</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Digital Wallet">Digital Wallet</option>
                  <option value="Cash in Hand">Cash in Hand</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8' }}>Account Number / Identifier</label>
                <input 
                  type="text" placeholder="e.g. •••• 9921" value={accountNo} onChange={(e) => setAccountNo(e.target.value)}
                  style={{ padding: '10px', borderRadius: '8px', border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1', backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? '#ffffff' : '#0f172a', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8' }}>Initial Balance (₹)</label>
                <input 
                  type="number" placeholder="e.g. 15000" value={balance} onChange={(e) => setBalance(e.target.value)} required
                  style={{ padding: '10px', borderRadius: '8px', border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1', backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? '#ffffff' : '#0f172a', outline: 'none' }}
                />
              </div>

              <button type="submit" style={{ marginTop: '10px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                Save Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================== 5. TRANSFER FUNDS MODAL ==================== */}
      {isTransferModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', padding: '24px', borderRadius: '12px',
            width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px',
            border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Transfer Funds</h3>
              <button onClick={() => setIsTransferModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '16px', cursor: 'pointer' }}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleTransferSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8' }}>From Account (Sender)</label>
                <select 
                  value={fromAccount} onChange={(e) => setFromAccount(e.target.value)} required
                  style={{ padding: '10px', borderRadius: '8px', border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1', backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? '#ffffff' : '#0f172a', outline: 'none' }}
                >
                  <option value="">Select Account</option>
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.name} (₹{acc.balance})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8' }}>To Account (Receiver)</label>
                <select 
                  value={toAccount} onChange={(e) => setToAccount(e.target.value)} required
                  style={{ padding: '10px', borderRadius: '8px', border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1', backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? '#ffffff' : '#0f172a', outline: 'none' }}
                >
                  <option value="">Select Account</option>
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.name} (₹{acc.balance})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8' }}>Transfer Amount (₹)</label>
                <input 
                  type="number" placeholder="e.g. 5000" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} required
                  style={{ padding: '10px', borderRadius: '8px', border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1', backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? '#ffffff' : '#0f172a', outline: 'none' }}
                />
              </div>

              <button type="submit" style={{ marginTop: '10px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                Complete Transfer
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Accounts;