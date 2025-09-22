import React from 'react';
import './Header.css';
import { Search, ChevronDown, Bell, Menu } from 'lucide-react'; // Import Menu icon

// Destructure onToggleSidebar from props
const Header = ({ onToggleSidebar }) => (
    <header className="header">
        <div className="header-left-section">
            {/* Sidebar Toggle Button */}
            <button onClick={onToggleSidebar} className="sidebar-toggle-btn">
                <Menu size={22}/>
            </button>
            <div className="search-container">
                <Search className="search-icon" size={20} />
                <input type="text" placeholder="Search..." className="search-input" />
            </div>
        </div>
        <div className="header-profile-section">
            <button className="notifications-btn"><Bell size={22}/></button>
            <div className="profile-container">
                <div className="profile-avatar">UC</div>
                <div>
                    <span className="profile-name">Upesh Chowdary</span>
                    <ChevronDown className="profile-chevron" size={16} />
                </div>
            </div>
        </div>
    </header>
);

export default Header;