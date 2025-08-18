"use client"
import React, { useState } from 'react';
import { MoreHorizontal, Copy, RefreshCw, DollarSign, CreditCard, Calendar, Plus, X, Menu, ChevronDown, Wallet, WalletCards, HandCoins, ArrowLeftRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { getAllISOCodes, getParamByISO } from "iso-country-currency"

const ExpenseDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    description: '',
    category: '',
    type: 'outflow',
    date: new Date().toISOString().split('T')[0]
  });

  const [activeLabel, setActiveLabel] = useState("Today");
  

  const handleDateChange = (label) => {
    let newDate = new Date();

    if (label === "Yesterday") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (label === "Last Week") {
      newDate.setDate(newDate.getDate() - 7);
    }

    // Format date as YYYY-MM-DD
    const formattedDate = newDate.toISOString().split("T")[0];

    setNewTransaction({ ...newTransaction, date: formattedDate });
    setActiveLabel(label);
  };

  const buttons = ["Today", "Yesterday", "Last Week"];


  const chartData = [
    { day: '1st', amount: 180, label: '1st' },
    { day: '2nd', amount: 120, label: '2nd' },
    { day: '3rd', amount: 45, label: '3rd' },
    { day: '4th', amount: 80, label: '4th' },
    { day: '5th', amount: 85, label: '5th' },
    { day: '6th', amount: 160, label: '6th' },
    { day: '7th', amount: 165, label: '7th' },
    { day: '8th', amount: 110, label: '8th' },
    { day: '9th', amount: 65, label: '9th' },
    { day: '10th', amount: 55, label: '10th' },
    { day: '11th', amount: 95, label: '11th' },
    { day: '12th', amount: 120, label: '12th' },
  ];

  const categories = {
    outflow: [
      { value: 'food', label: '🍽️ Food & Dining' },
      { value: 'transport', label: '🚗 Transportation' },
      { value: 'shopping', label: '🛍️ Shopping' },
      { value: 'bills', label: '💡 Bills & Utilities' },
      { value: 'entertainment', label: '🎬 Entertainment' },
      { value: 'healthcare', label: '🏥 Healthcare' },
      { value: 'education', label: '📚 Education' },
      { value: 'other_expense', label: '💸 Other Expense' }
    ],
    inflow: [
      { value: 'salary', label: '💰 Salary' },
      { value: 'freelance', label: '💻 Freelance' },
      { value: 'investment', label: '📈 Investment' },
      { value: 'gift', label: '🎁 Gift' },
      { value: 'refund', label: '↩️ Refund' },
      { value: 'other_income', label: '💵 Other Income' }
    ]
  };

  const handleAddTransaction = () => {
    setIsModalOpen(true);
  };

  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    if (!newTransaction.amount || !newTransaction.description || !newTransaction.category) return;
    
    const transaction = {
      id: Date.now(),
      ...newTransaction,
      amount: parseFloat(newTransaction.amount)
    };
    
    setTransactions([...transactions, transaction]);
    setNewTransaction({
      amount: '',
      description: '',
      category: '',
      type: 'outflow',
      date: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTransaction({
      amount: '',
      description: '',
      category: '',
      type: 'outflow',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  console.log(getAllISOCodes().filter((it)=>it.countryName === "Ghana"))
  return (
    <div className="min-h-screen font-mono bg-[#f5f6ff] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile: Logo and Hamburger */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <h1 className="text-xl font-medium text-gray-900">Penny Wise</h1>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-500 hover:text-gray-700 p-2"
            >
              <Menu size={20} />
            </button>
          </div>
          
          {/* Desktop: Centered Navigation */}
          <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="text-gray-900 font-medium">Home</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Transactions</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">AI Chatbot</a>
          </nav>
          
          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-3">
            <button 
              onClick={handleAddTransaction}
              className="bg-[#0640ac] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Add New Transaction
            </button>
            <div className="w-8 h-8 bg-[#0640ac] rounded-full flex items-center justify-center text-white font-medium text-sm">
              E
            </div>
            <span className="text-gray-700 font-medium">Eugene</span>
            
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-900 font-medium px-4 py-2">Home</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-4 py-2">Transactions</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-4 py-2">AI Chatbot</a>
              <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 mt-2 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    E
                  </div>
                  <span className="text-gray-700 font-medium">Eugene</span>
                </div>
                <button 
                  onClick={handleAddTransaction}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
                >
                  Add Transaction
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900">
            Hello,<span className="font-normal">Eugene</span> ✨
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Today Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md">Today</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-xl sm:text-2xl font-semibold text-gray-900">{getParamByISO('GH', 'currency')} 54.30</div>
              <Wallet size={16} className="text-gray-400 mb-2"/>
            </div>
            <p className="text-sm text-gray-500 mt-2">You bought lunch and paid for a ride.</p>
          </div>

          {/* This Week Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="text-sm">🔥</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-xl sm:text-2xl font-semibold text-gray-900">{getParamByISO('GH', 'currency')} 342.75</div>
              <WalletCards size={16} className="text-gray-400 mb-2"/>
            </div>
            <p className="text-sm text-gray-500 mt-2">Includes groceries, fuel, and grass touching.</p>
          </div>

          {/* This Month Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="text-sm">💚</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-xl sm:text-2xl font-semibold text-gray-900">{getParamByISO('GH', 'currency')} 1,982.10</div>
              <HandCoins size={16} className="text-gray-400 mb-2"/>
            </div>
            <p className="text-sm text-gray-500 mt-2">Most of your spending went to food, bills, and data.</p>
          </div>

          {/* Transactions Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Transactions</span>
                  <span className="text-sm">📊</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-xl sm:text-2xl font-semibold text-gray-900">{47 + transactions.length}</div>
             <ArrowLeftRight size={16} className="text-gray-400 mb-2"/>
            </div>
            <p className="text-sm text-gray-500 mt-2">You've logged {47 + transactions.length} expenses so far this month.</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <button className="flex items-center space-x-2 text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <span className="text-sm">Penny Wise</span>
            <Copy size={14} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <RefreshCw size={16} />
          </button>
          <button className="flex items-center space-x-2 text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <Calendar size={14} />
            <span className="text-sm">1Jul-12Jul</span>
          </button>
          <button className="text-gray-400 hover:text-gray-600 bg-white w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center">
            <Plus size={16} />
          </button>
        </div>

        {/* Monthly Overview Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg text-gray-600 mb-2">Monthly Overview July</h3>
            <div className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">{getParamByISO('GH', 'currency')} 1,982.10</div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-sm">▲ (+75%)</span>
              <span className="text-gray-500 text-sm">more Last 2 Weeks</span>
            </div>
          </div>

          {/* Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right:0, left: -30, bottom: 20 }}>
                <XAxis 
                  dataKey="label" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                />
                <YAxis 
                  domain={[0, 180]}
                  ticks={[0, 45, 90, 135, 180]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700">
                          <p className="text-sm font-medium">{label}</p>
                          <p className="text-sm">
                            Amount: <span className="font-semibold">{getParamByISO('GH', 'currency')} {payload[0].value}</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{ stroke: '#6B7280', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#6B7280" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: '#6B7280', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center justify-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 text-center">Add New Transaction</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={30} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitTransaction} className="space-y-6">
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-center text-gray-700 mb-3">
                  Transaction Type
                </label>
<div className="flex flex-row space-x-4 items-center justify-center">
  <button
    type="button"
    onClick={() => setNewTransaction({ ...newTransaction, type: 'outflow', category: '' })}
    className={`p-3 rounded-lg border text-center transition-colors ${
      newTransaction.type === 'outflow'
        ? 'border-red-500 bg-red-50 text-red-700'
        : 'border-gray-300 hover:border-gray-400'
    }`}
  >
    <div className="text-lg mb-1">💸</div>
    <div className="text-sm font-medium">Expense</div>
  </button>

  <button
    type="button"
    onClick={() => setNewTransaction({ ...newTransaction, type: 'inflow', category: '' })}
    className={`p-3 rounded-lg border text-center transition-colors ${
      newTransaction.type === 'inflow'
        ? 'border-green-500 bg-green-50 text-green-700'
        : 'border-gray-300 hover:border-gray-400'
    }`}
  >
    <div className="text-lg mb-1">💰</div>
    <div className="text-sm font-medium">Income</div>
  </button>
</div>

              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-300 text-lg">{getParamByISO('GH', 'currency')} </span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={newTransaction.amount}
                    onChange={(e) => {
                      const value = Math.max(0, parseFloat(e.target.value) || 0);
                      setNewTransaction({...newTransaction, amount: value.toString()});
                    }}
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                        e.preventDefault();
                      }
                    }}
                    className="w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder={newTransaction.type === 'inflow' ? 'Source of income' : 'What did you spend on?'}
                  required
                />
              </div>
              
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories[newTransaction.type].map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <div className="space-y-3">
                  {/* Custom Date Display */}
                  <div className="relative">
                    <input
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none opacity-0 absolute inset-0 cursor-pointer"
                      required
                    />
                    <div className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white flex items-center justify-between cursor-pointer">
                      <span className="text-gray-900">{formatDate(newTransaction.date)}</span>
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Quick Date Options */}
                  <div className="grid grid-cols-3 gap-2">
{buttons.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => handleDateChange(label)}
          className={`px-3 py-2 text-xs rounded-lg border transition duration-200
            ${
              activeLabel === label
                ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
            }
          `}
        >
          {label}
        </button>
      ))}
                  </div>
                </div>
              </div>
              
              {/* Submit Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-4 py-3 text-white rounded-lg font-medium transition-colors bg-blue-500`}
                >
                  Add {newTransaction.type === 'inflow' ? 'Income' : 'Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseDashboard;