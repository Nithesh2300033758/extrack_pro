
import React from 'react';
import { Plus } from 'lucide-react';
import { recentTransactionsData } from '../data/mockData';
import { formatAmount } from '../utils/formatters';
import './TransactionsPage.css';

const getCategoryClass = (category) => {
    switch (category) {
        case 'Salary': return 'cat-salary';
        case 'Freelance': return 'cat-freelance';
        case 'Rent': return 'cat-rent';
        case 'Groceries': return 'cat-groceries';
        case 'Transport': return 'cat-transport';
        default: return 'cat-default';
    }
};

const TransactionsPage = ({ currency }) => (
    <div className="page-container">
        <h2 className="page-title">Transactions</h2>
        <div className="transactions-grid">
            <div className="card">
                 <h3 className="card-title">Add New Transaction</h3>
                 <form className="transaction-form">
                     <div>
                         <label className="form-label">Type</label>
                         <select className="form-select">
                             <option>Expense</option>
                             <option>Income</option>
                         </select>
                     </div>
                     <div>
                         <label className="form-label">Amount</label>
                         <input type="number" placeholder="0.00" className="form-input" />
                     </div>
                     <div>
                         <label className="form-label">Category</label>
                         <select className="form-select">
                            <option>Select Category</option>
                            <option>Groceries</option>
                            <option>Rent</option>
                            <option>Transport</option>
                            <option>Dining</option>
                            <option>Freelance</option>
                            <option>Salary</option>
                         </select>
                     </div>
                     <div>
                         <label className="form-label">Date</label>
                         <input type="date" defaultValue="2025-09-15" className="form-input" />
                     </div>
                     <div>
                         <label className="form-label">Description</label>
                         <input type="text" placeholder="e.g., Weekly groceries" className="form-input" />
                     </div>
                     <button type="submit" className="btn">
                         <Plus size={20} style={{marginRight: '8px'}}/>
                         Add Transaction
                     </button>
                 </form>
            </div>
            <div className="card transaction-history-card">
                <h3 className="card-title">Transaction History</h3>
                <div className="table-container">
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th className="text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTransactionsData.map(t => (
                                <tr key={t.id}>
                                    <td>{t.description}</td>
                                    <td>{t.date}</td>
                                    <td>
                                        <span className={`category-badge ${getCategoryClass(t.category)}`}>
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className={`text-right ${t.type === 'income' ? 'text-green' : 'text-red'}`}>
                                        {t.type === 'income' ? '+' : ''}{currency.symbol}{formatAmount(Math.abs(t.amount))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default TransactionsPage;