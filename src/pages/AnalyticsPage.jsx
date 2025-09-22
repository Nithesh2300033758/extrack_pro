import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';

import { recentTransactionsData, spendSummaryData } from '../data/mockData';
import { formatAmount } from '../utils/formatters';
import './AnalyticsPage.css';

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

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="stat-card">
        <div className={`stat-icon-wrapper ${colorClass}-bg`}><Icon className={colorClass}/></div>
        <div>
            <p className="stat-title">{title}</p>
            <p className="stat-amount small">{value}</p>
        </div>
    </div>
);

const AnalyticsPage = ({ currency }) => {
    // Data processing for Expense by Category chart
    const expenseByCategory = recentTransactionsData
        .filter(t => t.type === 'expense')
        .reduce((acc, transaction) => {
            const category = transaction.category;
            const amount = Math.abs(transaction.amount);
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += amount;
            return acc;
        }, {});

    const expenseCategoryData = Object.keys(expenseByCategory).map(category => ({
        name: category,
        amount: expenseByCategory[category],
    })).sort((a, b) => b.amount - a.amount);

    const totalExpense = Math.abs(recentTransactionsData
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0));

    const totalIncome = recentTransactionsData
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
        
    const highestSpendingCategory = expenseCategoryData.length > 0 ? expenseCategoryData[0] : { name: 'N/A', amount: 0 };
    
    const ExpenseCategoryChart = () => (
        <div className="card">
            <h3 className="card-title">Expense by Category</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={expenseCategoryData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis type="number" stroke="#9ca3af" axisLine={false} tickLine={false} tickFormatter={(value) => `${currency.symbol}${value/1000}k`} />
                        <YAxis type="category" dataKey="name" stroke="#9ca3af" width={80} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                            formatter={(value) => [`${currency.symbol}${formatAmount(value)}`, 'Amount']}
                        />
                        <Bar dataKey="amount" fill="#3b82f6" barSize={20} radius={[0, 4, 4, 0]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

    return (
        <div className="page-container">
            <h2 className="page-title">Analytics</h2>
            
            <div className="analytics-stats-grid">
                <StatCard title="Total Spent" value={`${currency.symbol}${formatAmount(totalExpense)}`} icon={TrendingDown} colorClass="text-red" />
                <StatCard title="Total Income" value={`${currency.symbol}${formatAmount(totalIncome)}`} icon={TrendingUp} colorClass="text-green" />
                <StatCard title="Top Category" value={highestSpendingCategory.name} icon={Target} colorClass="text-blue" />
            </div>

            <div className="analytics-charts-grid">
                <SpendSummaryChart />
                <ExpenseCategoryChart />
            </div>
        </div>
    );
};

export default AnalyticsPage;