import React from 'react';

function SidebarHead({toggleSidebar}) {
    return (
        <div className="sidebar-head">
            <div className="Logo-container" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <img src="/Logo.jpg" alt="Logo" className="sidebar-logo" />
                <h3 style={{ marginLeft: '15px' ,fontSize:'20px', marginTop: '0px' }}>Expense Tracker</h3>
            </div>
        </div>
    );
}

export default SidebarHead;