import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNotifications } from './NotificationContext';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { addNotification } = useNotifications();

  // 1. Transactions State + LocalStorage
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('tracker_transactions');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Swiggy Food Order', category: 'Food & Dining', icon: '🍔', type: 'expense', amount: 350.00, source: 'HDFC Bank', date: '19 Oct 2026', time: '02:45 PM' },
      { id: 2, title: 'Monthly Salary Disbursal', category: 'Salary', icon: '💰', type: 'income', amount: 50000.00, source: 'SBI Account', date: '18 Oct 2026', time: '10:00 AM' }
    ];
  });

  // 2. Categories State + LocalStorage
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('tracker_categories');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Food & Dining', type: 'expense', icon: '🍔' },
      { id: 2, name: 'Salary', type: 'income', icon: '💰' },
      { id: 3, name: 'Rent & Utilities', type: 'expense', icon: '🏠' },
      { id: 4, name: 'Shopping & Lifestyle', type: 'expense', icon: '🛍️' },
      { id: 5, name: 'Freelance & Projects', type: 'income', icon: '💻' },
      { id: 6, name: 'Travel & Transport', type: 'expense', icon: '🚗' },
      { id: 7, name: 'Entertainment', type: 'expense', icon: '🎬' }
    ];
  });

  // 3. Budgets State + LocalStorage
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('tracker_budgets');
    return saved ? JSON.parse(saved) : [
      { id: 1, category: 'Food & Dining', icon: '🍔', allocated: 10000, spent: 350, color: '#3b82f6' },
      { id: 2, category: 'Rent & Utilities', icon: '🏠', allocated: 5000, spent: 0, color: '#ef4444' },
      { id: 3, category: 'Shopping & Lifestyle', icon: '🛍️', allocated: 5000, spent: 0, color: '#22c55e' }
    ];
  });

  // 4. Accounts State + LocalStorage (NEW ADDED)
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('tracker_accounts');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'HDFC Salary Account', type: 'Bank Account', accountNo: '•••• 4589', balance: 32450.00 },
      { id: 2, name: 'SBI Savings Account', type: 'Bank Account', accountNo: '•••• 1204', balance: 12800.00 },
      { id: 3, name: 'ICICI Platinum Credit Card', type: 'Credit Card', accountNo: '•••• 8832', balance: -4500.00 },
      { id: 4, name: 'Paytm & Google Pay Wallet', type: 'Digital Wallet', accountNo: 'UPI / Linked', balance: 4500.00 },
      { id: 5, name: 'Physical Cash', type: 'Cash in Hand', accountNo: 'Wallet Cash', balance: 2800.00 }
    ];
  });

  // Save to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem('tracker_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('tracker_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('tracker_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('tracker_accounts', JSON.stringify(accounts));
  }, [accounts]);

  // Actions
  const addTransaction = (newTxn) => {
    const txnWithId = {
      id: Date.now(),
      icon: newTxn.type === 'income' ? '💰' : '🛒',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...newTxn
    };

    setTransactions(prev => [txnWithId, ...prev]);

    addNotification(
      newTxn.type === 'income' ? 'Income Credited' : 'Expense Added',
      `₹${Number(newTxn.amount).toLocaleString('en-IN')} for ${newTxn.title}`
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addCategory = (newCat) => {
    setCategories(prev => [...prev, { id: Date.now(), ...newCat }]);
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const updateBudgets = (newBudgets) => {
    setBudgets(newBudgets);
  };

  // Account Actions
  const addAccount = (acc) => {
    setAccounts(prev => [...prev, { id: Date.now(), ...acc }]);
  };

  const updateAccount = (updatedAcc) => {
    setAccounts(prev => prev.map(a => a.id === updatedAcc.id ? updatedAcc : a));
  };

  const deleteAccount = (id) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
  };

  const transferFunds = (fromId, toId, amount) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === Number(fromId)) {
        return { ...acc, balance: Number(acc.balance) - Number(amount) };
      }
      if (acc.id === Number(toId)) {
        return { ...acc, balance: Number(acc.balance) + Number(amount) };
      }
      return acc;
    }));
  };

  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      addTransaction, 
      deleteTransaction, 
      categories, 
      addCategory, 
      deleteCategory, 
      budgets, 
      updateBudgets,
      accounts,
      addAccount,
      updateAccount,
      deleteAccount,
      transferFunds
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);