import React from 'react';
import './Sidebar.css';
import { LayoutDashboard, ArrowRightLeft, Target, BarChart2, Settings, LogOut } from 'lucide-react';

const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Transactions', icon: ArrowRightLeft },
    { name: 'Budgets', icon: Target },
    { name: 'Analytics', icon: BarChart2 },
    { name: 'Settings', icon: Settings },
];

// Destructure isSidebarOpen from props
const Sidebar = ({ activePage, setActivePage, isSidebarOpen }) => {
    return (
        // Conditionally apply 'collapsed' class
        <aside className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
            <div className="sidebar-header">ExTrack</div>
            <nav className="sidebar-nav">
                <ul>
                    {navItems.map(item => (
                        <li key={item.name}>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActivePage(item.name); }}
                                className={`sidebar-nav-link ${activePage === item.name ? 'active' : ''}`}
                            >
                                <item.icon className="sidebar-nav-icon" />
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sidebar-footer">
                <a href="#" className="sidebar-nav-link">
                    <LogOut className="sidebar-nav-icon" />
                    Logout
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;