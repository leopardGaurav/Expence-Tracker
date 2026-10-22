import React, { useState } from 'react';
import { 
    FaCog,
    FaGlobe,
    FaMoon,
    FaBell,
    FaDownload,
    FaTrashAlt,
    FaShieldAlt,
    FaInfoCircle,
    FaCheck,
    FaSignOutAlt
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

function Settings() {
    const { isDarkMode } = useTheme();
    const { logout, currentUser } = useAuth();

    // Safe extraction of email string from currentUser object or string
    const userEmail = typeof currentUser === 'object' && currentUser !== null ? currentUser.email : currentUser;
    const currentUserKey = userEmail || 'default';

    const [currency, setCurrency] = useState('INR');
    const [theme, setTheme] = useState('dark');
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [budgetAlerts, setBudgetAlerts] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleExportData = () => {
        const exportData = {
            profile: JSON.parse(localStorage.getItem(`tracker_profile_${currentUserKey}`)) || {},
            transactions: JSON.parse(localStorage.getItem(`tracker_transactions_${currentUserKey}`)) || [],
            categories: JSON.parse(localStorage.getItem(`tracker_categories_${currentUserKey}`)) || [],
            budgets: JSON.parse(localStorage.getItem(`tracker_budgets_${currentUserKey}`)) || [],
            accounts: JSON.parse(localStorage.getItem(`tracker_accounts_${currentUserKey}`)) || []
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `expense_tracker_data_${currentUserKey}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    };

    const handleResetData = () => {
        if (window.confirm('Kya aap sach me apna saara data reset karna chahte hain? Yeh action undo nahi ho sakta.')) {
            localStorage.removeItem(`tracker_transactions_${currentUserKey}`);
            localStorage.removeItem(`tracker_categories_${currentUserKey}`);
            localStorage.removeItem(`tracker_budgets_${currentUserKey}`);
            localStorage.removeItem(`tracker_accounts_${currentUserKey}`);
            window.location.reload();
        }
    };

    const selectStyle = {
        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#0f172a',
        border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        cursor: 'pointer'
    };

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
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
            }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: isDarkMode ? '#f8fafc' : '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaCog style={{ color: '#a855f7' }} /> App Settings
                    </h1>
                    <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#94a3b8' }}>
                        Manage your app preferences, notifications, and data backups.
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    style={{
                        backgroundColor: isSaved ? '#22c55e' : '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'background-color 0.3s ease',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                    }}
                >
                    {isSaved ? <><FaCheck /> Saved!</> : 'Save Changes'}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                
                {/* Account & Session Management */}
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
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaShieldAlt style={{ color: '#3b82f6' }} /> Account & Session
                    </h3>
                    <hr style={{ border: 'none', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', margin: 0 }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ fontSize: '14px', color: '#94a3b8' }}>Logged in as:</span>
                        <strong style={{ fontSize: '15px', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
                            {userEmail || 'User'}
                        </strong>
                    </div>

                    <button
                        onClick={logout}
                        style={{
                            backgroundColor: '#ef4444',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '6px'
                        }}
                    >
                        <FaSignOutAlt /> Logout & Sign Up New Account
                    </button>
                </div>

                {/* General Preferences */}
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
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaGlobe style={{ color: '#3b82f6' }} /> General Preferences
                    </h3>
                    <hr style={{ border: 'none', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', margin: 0 }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', color: '#94a3b8' }}>Default Currency</label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            style={selectStyle}
                        >
                            <option value="INR" style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>₹ Indian Rupee (INR)</option>
                            <option value="USD" style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>$ US Dollar (USD)</option>
                            <option value="EUR" style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>€ Euro (EUR)</option>
                            <option value="GBP" style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>£ British Pound (GBP)</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', color: '#94a3b8' }}>Theme Mode</label>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            style={selectStyle}
                        >
                            <option value="dark" style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>Dark Mode (Default)</option>
                            <option value="light" style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>Light Mode</option>
                            <option value="system" style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>System Default</option>
                        </select>
                    </div>
                </div>

                {/* Notifications & Alerts */}
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
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaBell style={{ color: '#eab308' }} /> Notifications & Alerts
                    </h3>
                    <hr style={{ border: 'none', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', margin: 0 }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Monthly Summary Email</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Receive monthly expense reports</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={emailAlerts}
                            onChange={(e) => setEmailAlerts(e.target.checked)}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Budget Exceeded Alerts</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Get warned when budget hits 80%</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={budgetAlerts}
                            onChange={(e) => setBudgetAlerts(e.target.checked)}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                    </div>
                </div>

                {/* Data Management */}
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
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaShieldAlt style={{ color: '#22c55e' }} /> Data Management
                    </h3>
                    <hr style={{ border: 'none', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', margin: 0 }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button
                            onClick={handleExportData}
                            style={{
                                backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9',
                                color: isDarkMode ? '#f8fafc' : '#0f172a',
                                border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <FaDownload style={{ color: '#3b82f6' }} /> Export Financial Data (JSON)
                        </button>

                        <button
                            onClick={handleResetData}
                            style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <FaTrashAlt /> Reset & Clear All Data
                        </button>
                    </div>
                </div>

                {/* About Application */}
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
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaInfoCircle style={{ color: '#a855f7' }} /> About Application
                    </h3>
                    <hr style={{ border: 'none', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', margin: 0 }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px', color: '#94a3b8' }}>
                        <div><strong style={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}>App Name:</strong> Expense Tracker</div>
                        <div><strong style={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Version:</strong> v1.0.0 (Beta)</div>
                        <div><strong style={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Environment:</strong> React + Vite</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;