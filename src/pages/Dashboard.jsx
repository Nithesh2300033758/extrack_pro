import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

import { recentTransactionsData, budgetsData, spendSummaryData } from '../data/mockData';
import { formatAmount } from '../utils/formatters';
import './Dashboard.css';

const SpendSummaryChart = () => (
    <div className="card">
        <h3 className="card-title">Spend Summary</h3>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={spendSummaryData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                    <Line type="monotone" dataKey="spent" stroke="#34d399" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);


const Dashboard = ({ currency }) => {
    const totalIncome = recentTransactionsData.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = recentTransactionsData.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome + totalExpense;

    return (
        <div className="page-container">
            <h2 className="page-title">Dashboard</h2>
            
            <div className="dashboard-grid-top">
                <div className="dashboard-chart-container">
                    <SpendSummaryChart />
                </div>
                <div className="dashboard-stats-container">
                    <div className="stat-card">
                        <div className="stat-icon-wrapper green-bg"><TrendingUp className="text-green"/></div>
                        <div>
                            <p className="stat-title">Total Income</p>
                            <p className="stat-amount">{currency.symbol}{formatAmount(totalIncome)}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-wrapper red-bg"><TrendingDown className="text-red"/></div>
                        <div>
                            <p className="stat-title">Total Expense</p>
                            <p className="stat-amount">{currency.symbol}{formatAmount(Math.abs(totalExpense))}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-wrapper blue-bg"><DollarSign className="text-blue"/></div>
                        <div>
                            <p className="stat-title">Balance</p>
                            <p className="stat-amount">{currency.symbol}{formatAmount(balance)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid-bottom">
                <div className="card">
                    <h3 className="card-title">Recent Transactions</h3>
                    <ul className="transactions-list">
                        {recentTransactionsData.slice(0, 4).map(t => (
                            <li key={t.id} className="transaction-item">
                                <div className="transaction-details">
                                    <div className={`transaction-icon-wrapper ${t.type === 'income' ? 'green-bg' : 'red-bg'}`}>
                                        {t.type === 'income' ? <TrendingUp className="text-green" size={20}/> : <TrendingDown className="text-red" size={20}/>}
                                    </div>
                                    <div>
                                        <p className="transaction-description">{t.description}</p>
                                        <p className="transaction-date">{t.date}</p>
                                    </div>
                                </div>
                                <p className={`transaction-amount ${t.type === 'income' ? 'text-green' : 'text-red'}`}>
                                    {t.type === 'income' ? '+' : ''}{currency.symbol}{formatAmount(Math.abs(t.amount))}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card">
                    <h3 className="card-title">Budget Overview</h3>
                    <div className="budgets-container">
                        {budgetsData.map(budget => (
                            <div key={budget.id} className="budget-item">
                                <div className="budget-header">
                                    <span>{budget.category}</span>
                                    <span>{currency.symbol}{formatAmount(budget.spent)} / {currency.symbol}{formatAmount(budget.total)}</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div className="progress-bar-fg" style={{ width: `${(budget.spent / budget.total) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;