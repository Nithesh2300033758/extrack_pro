import React, { useState } from 'react';
import { currencies } from '../data/currency';
import './SettingsPage.css';

const SettingsPage = ({ currency, setCurrency }) => {
    const [currentCurrencyCode, setCurrentCurrencyCode] = useState(currency.code);

    const handleSave = (e) => {
        e.preventDefault();
        setCurrency(currencies[currentCurrencyCode]);
        // Here you would typically show a success message
        alert('Settings saved!');
    };

    return (
        <div className="page-container">
            <h2 className="page-title">Settings</h2>
            <div className="card settings-card">
                <h3 className="card-title">User Settings</h3>
                <form className="settings-form" onSubmit={handleSave}>
                    <div>
                        <label className="form-label">Full Name</label>
                        <input type="text" defaultValue="Upesh Chowdary" className="form-input" />
                    </div>
                    <div>
                        <label className="form-label">Currency</label>
                        <select
                            className="form-select"
                            value={currentCurrencyCode}
                            onChange={(e) => setCurrentCurrencyCode(e.target.value)}
                        >
                            <option value="INR">Indian Rupee (₹)</option>
                            <option value="USD">US Dollar ($)</option>
                            <option value="EUR">Euro (€)</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;