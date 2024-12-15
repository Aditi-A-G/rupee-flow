'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Chart from '@/components/Charts'; // Import the Chart.js component

export default function ExpenseTracker() {
  const [incomeSources, setIncomeSources] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [results, setResults] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [tempInput, setTempInput] = useState({ type: '', amount: '' });

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    if (tempInput.type && tempInput.amount) {
      setIncomeSources([...incomeSources, { 
        type: tempInput.type, 
        amount: parseFloat(tempInput.amount) 
      }]);
      setTempInput({ type: '', amount: '' });
    }
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (tempInput.type && tempInput.amount) {
      setExpenseCategories([...expenseCategories, { 
        category: tempInput.type, 
        amount: parseFloat(tempInput.amount) 
      }]);
      setTempInput({ type: '', amount: '' });
    }
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (tempInput.type && tempInput.amount) {
      setBudgets({
        ...budgets,
        [tempInput.type]: parseFloat(tempInput.amount)
      });
      setTempInput({ type: '', amount: '' });
    }
  };

  const calculateResults = () => {
    const totalIncome = incomeSources.reduce((total, source) => total + source.amount, 0);
    const totalExpenses = expenseCategories.reduce((total, category) => total + category.amount, 0);
    const netSavings = totalIncome - totalExpenses;

    // Calculate Budget vs Actual for each category
    const categoryBudgetComparison = expenseCategories.map(category => ({
      category: category.category,
      budget: budgets[category.category] || 0,
      actualExpense: category.amount,
      exceedsBudget: category.amount > (budgets[category.category] || 0),
      excessAmount: category.amount - (budgets[category.category] || 0),
    }));

    const totalBudget = Object.values(budgets).reduce((total, budget) => total + budget, 0);
    const totalBudgetExceeded = categoryBudgetComparison.filter(item => item.exceedsBudget).length;

    setResults({
      totalIncome,
      totalExpenses,
      netSavings,
      totalBudget,
      categoryBudgetComparison,
      totalBudgetExceeded,
    });
  };

  // Prepare data for charts
  const incomeExpenseChartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Income vs Expenses',
        data: [results?.totalIncome, results?.totalExpenses],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#4C94E6', '#FF6B8F'],
      },
    ],
  };

  const expenseCategoryChartData = {
    labels: results?.categoryBudgetComparison.map(item => item.category) || [],
    datasets: [
      {
        label: 'Expense Categories',
        data: results?.categoryBudgetComparison.map(item => item.actualExpense) || [],
        backgroundColor: results?.categoryBudgetComparison.map((_, index) => {
          return index % 2 === 0 ? '#FF6384' : '#36A2EB';
        }),
        hoverBackgroundColor: ['#FF6B8F', '#4C94E6'],
      },
    ],
  };

  const budgetVsActualChartData = {
    labels: results?.categoryBudgetComparison.map(item => item.category) || [],
    datasets: [
      {
        label: 'Budgeted Amount',
        data: results?.categoryBudgetComparison.map(item => item.budget) || [],
        backgroundColor: '#36A2EB',
        hoverBackgroundColor: '#4C94E6',
      },
      {
        label: 'Actual Expense',
        data: results?.categoryBudgetComparison.map(item => item.actualExpense) || [],
        backgroundColor: '#FF6384',
        hoverBackgroundColor: '#FF6B8F',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `₹${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-800 text-white shadow-lg py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-semibold">Personal Expense Tracker</h1>
          <p className="mt-2 text-lg">Track your income, expenses, and budgets efficiently</p>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {/* Button Group */}
        <div className="flex justify-center space-x-6 mb-8">
          <Button onClick={() => setActiveForm('income')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out">Add Income</Button>
          <Button onClick={() => setActiveForm('expense')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out">Add Expense</Button>
          <Button onClick={() => setActiveForm('budget')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out">Set Budget</Button>
          <Button onClick={calculateResults} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out">Calculate Results</Button>
        </div>

        {/* Form for Income, Expense, and Budget */}
        <div className="max-w-md mx-auto">
          {activeForm === 'income' && (
            <form onSubmit={handleIncomeSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Income Source"
                  value={tempInput.type}
                  onChange={(e) => setTempInput({ ...tempInput, type: e.target.value })}
                  className="border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 rounded-md w-full"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Amount"
                  value={tempInput.amount}
                  onChange={(e) => setTempInput({ ...tempInput, amount: e.target.value })}
                  className="border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 rounded-md w-full"
                />
              </div>
              <div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg w-full transition duration-200 ease-in-out">Add Income</Button>
              </div>
            </form>
          )}

          {activeForm === 'expense' && (
            <form onSubmit={handleExpenseSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Expense Category"
                  value={tempInput.type}
                  onChange={(e) => setTempInput({ ...tempInput, type: e.target.value })}
                  className="border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 rounded-md w-full"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Amount"
                  value={tempInput.amount}
                  onChange={(e) => setTempInput({ ...tempInput, amount: e.target.value })}
                  className="border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 rounded-md w-full"
                />
              </div>
              <div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg w-full transition duration-200 ease-in-out">Add Expense</Button>
              </div>
            </form>
          )}

          {activeForm === 'budget' && (
            <form onSubmit={handleBudgetSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Budget Category"
                  value={tempInput.type}
                  onChange={(e) => setTempInput({ ...tempInput, type: e.target.value })}
                  className="border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 rounded-md w-full"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Amount"
                  value={tempInput.amount}
                  onChange={(e) => setTempInput({ ...tempInput, amount: e.target.value })}
                  className="border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 rounded-md w-full"
                />
              </div>
              <div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg w-full transition duration-200 ease-in-out">Set Budget</Button>
              </div>
            </form>
          )}
        </div>

        {/* Results Display */}
        {results && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {/* Financial Summary Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-200">
              <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                <span className="mr-2">📊</span> Financial Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Income</span>
                  <span className="font-bold text-lg text-blue-800">₹{results.totalIncome}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Expenses</span>
                  <span className="font-bold text-lg text-blue-800">₹{results.totalExpenses}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Net Savings</span>
                  <span className="font-bold text-lg text-green-600">₹{results.netSavings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Budget</span>
                  <span className="font-bold text-lg text-blue-800">₹{results.totalBudget}</span>
                </div>
              </div>
            </div>

            {/* Pie Chart for Income vs Expenses */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4 text-blue-800">Income vs Expenses</h2>
              <Chart data={incomeExpenseChartData} options={chartOptions} />
            </div>

            {/* Pie Chart for Expense Categories */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4 text-blue-800">Expense Breakdown</h2>
              <Chart data={expenseCategoryChartData} options={chartOptions} />
            </div>

            {/* Budget vs Actual Chart */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4 text-blue-800">Budget vs Actual Expenses</h2>
              <Chart data={budgetVsActualChartData} options={chartOptions} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
