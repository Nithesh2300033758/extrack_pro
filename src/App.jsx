import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import BudgetsPage from './pages/BudgetsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

import { currencies } from './data/currency';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');
  const [currency, setCurrency] = useState(currencies['INR']);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar

  const renderPage = () => {
    // ... (no changes in this function)
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard currency={currency} />;
      case 'Transactions':
        return <TransactionsPage currency={currency} />;
      case 'Budgets':
        return <BudgetsPage currency={currency} />;
      case 'Analytics':
        return <AnalyticsPage currency={currency} />;
      case 'Settings':
        return <SettingsPage currency={currency} setCurrency={setCurrency} />;
      default:
        return <Dashboard currency={currency} />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-layout">
      {/* Pass state to Sidebar */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isSidebarOpen={isSidebarOpen}
      />
      <main className="main-content">
        {/* Pass toggle function to Header */}
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="page-content-wrapper">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;