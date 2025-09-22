import React from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import { budgetsData } from '../data/mockData';
import { formatAmount } from '../utils/formatters';
import './BudgetsPage.css';

const BudgetsPage = ({ currency }) => (
    <div className="page-container">
        <h2 className="page-title">Budgets</h2>
        <div className="budgets-grid">
            <div className="card">
                <h3 className="card-title">Create New Budget</h3>
                <form className="new-budget-form">
                    <div>
                        <label className="form-label">Category</label>
                        <select className="form-select">
                            <option>Select Category</option>
                            <option>Groceries</option>
                            <option>Dining</option>
                            <option>Transport</option>
                            <option>Entertainment</option>
                            <option>Utilities</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Monthly Limit</label>
                        <input type="number" placeholder="e.g. 25000" className="form-input" />
                    </div>
                    <button type="submit" className="btn">
                        <Plus size={20} style={{marginRight: '8px'}} />
                        Add Budget
                    </button>
                </form>
            </div>
            <div className="your-budgets-container">
                <h3 className="card-title">Your Budgets</h3>
                <div className="your-budgets-grid">
                    {budgetsData.map(budget => (
                        <div key={budget.id} className="budget-card card">
                            <div className="budget-card-header">
                                <div>
                                    <p className="budget-category">{budget.category}</p>
                                    <p className="budget-card-amount">
                                        <span className="text-green">{currency.symbol}{formatAmount(budget.spent)}</span> /
                                        <span className="budget-total"> {currency.symbol}{formatAmount(budget.total)}</span>
                                    </p>
                                </div>
                                <button className="more-btn"><MoreVertical/></button>
                            </div>
                            <div className="progress-bar-bg mb-2">
                                <div className="progress-bar-fg" style={{ width: `${(budget.spent / budget.total) * 100}%` }}></div>
                            </div>
                            <p className="budget-remaining">{currency.symbol}{formatAmount(budget.total - budget.spent)} remaining</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default BudgetsPage;