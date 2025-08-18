import React, { useState } from 'react';
import { X, Calendar, Tag, ArrowUpRight, ArrowDownLeft, Search, Filter, Edit, Save, Trash2 } from 'lucide-react';

const TransactionsPage = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });

  // Sample transaction data
  const [transactions] = useState([
    {
      id: 1,
      amount: 54.30,
      description: 'Lunch and paid for a ride',
      category: 'Food & Transport',
      type: 'outflow',
      date: '2024-08-17'
    },
    {
      id: 2,
      amount: 1200.00,
      description: 'Monthly salary deposit',
      category: 'Salary',
      type: 'inflow',
      date: '2024-08-15'
    },
    {
      id: 3,
      amount: 45.80,
      description: 'Grocery shopping at MaxMart',
      category: 'Groceries',
      type: 'outflow',
      date: '2024-08-16'
    },
    {
      id: 4,
      amount: 25.00,
      description: 'Mobile data top-up',
      category: 'Utilities',
      type: 'outflow',
      date: '2024-08-16'
    },
    {
      id: 5,
      amount: 120.50,
      description: 'Fuel for the week',
      category: 'Transport',
      type: 'outflow',
      date: '2024-08-15'
    },
    {
      id: 6,
      amount: 85.25,
      description: 'Dinner with friends',
      category: 'Entertainment',
      type: 'outflow',
      date: '2024-08-14'
    },
    {
      id: 7,
      amount: 300.00,
      description: 'Freelance project payment',
      category: 'Income',
      type: 'inflow',
      date: '2024-08-13'
    },
    {
      id: 8,
      amount: 15.75,
      description: 'Coffee and snacks',
      category: 'Food',
      type: 'outflow',
      date: '2024-08-13'
    }
  ]);

  const formatCurrency = (amount) => {
    return `GHS ${amount.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getTypeIcon = (type) => {
    return type === 'inflow' ? 
      <ArrowDownLeft className="w-4 h-4 text-green-500" /> : 
      <ArrowUpRight className="w-4 h-4 text-red-500" />;
  };

  const getTypeColor = (type) => {
    return type === 'inflow' ? 'text-green-600' : 'text-red-600';
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    
    // Date range filter
    const transactionDate = new Date(transaction.date);
    const matchesDateRange = (!dateRange.start || transactionDate >= new Date(dateRange.start)) &&
                            (!dateRange.end || transactionDate <= new Date(dateRange.end));
    
    // Amount range filter
    const matchesAmountRange = (!amountRange.min || transaction.amount >= parseFloat(amountRange.min)) &&
                              (!amountRange.max || transaction.amount <= parseFloat(amountRange.max));
    
    return matchesSearch && matchesFilter && matchesDateRange && matchesAmountRange;
  }).sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.amount - a.amount;
      case 'lowest':
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setEditData({
      amount: transaction.amount,
      description: transaction.description,
      category: transaction.category,
      type: transaction.type,
      date: transaction.date
    });
    setEditMode(false);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setEditMode(false);
    setEditData({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Penny Wise</h1>
            <nav className="hidden sm:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Transactions</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">AI Chatbot</a>
            </nav>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="hidden sm:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add New Transaction
            </button>
            <button className="sm:hidden bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
              <X className="w-4 h-4 rotate-45" />
            </button>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">E</span>
            </div>
            <span className="hidden sm:block text-gray-700">Eugene</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">All Transactions</h2>
          <p className="text-gray-600">Track and manage your financial activities</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Transaction Type Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="inflow">Income</option>
                <option value="outflow">Expenses</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                  setSortOrder('newest');
                  setDateRange({ start: '', end: '' });
                  setAmountRange({ min: '', max: '' });
                }}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Advanced Filters Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="date"
                    placeholder="From"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="date"
                    placeholder="To"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Amount Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount Range (GHS)</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="number"
                    placeholder="Min amount"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={amountRange.min}
                    onChange={(e) => setAmountRange({ ...amountRange, min: e.target.value })}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Max amount"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={amountRange.max}
                    onChange={(e) => setAmountRange({ ...amountRange, max: e.target.value })}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(searchQuery || filterType !== 'all' || sortOrder !== 'newest' || dateRange.start || dateRange.end || amountRange.min || amountRange.max) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Search: "{searchQuery}"
                  </span>
                )}
                {filterType !== 'all' && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Type: {filterType}
                  </span>
                )}
                {sortOrder !== 'newest' && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Sort: {sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)}
                  </span>
                )}
                {(dateRange.start || dateRange.end) && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Date: {dateRange.start || '...'} to {dateRange.end || '...'}
                  </span>
                )}
                {(amountRange.min || amountRange.max) && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Amount: {amountRange.min || '0'} - {amountRange.max || '∞'}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Transactions ({filteredTransactions.length})
              </h3>
              <div className="text-sm text-gray-500">
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="px-4 sm:px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => openModal(transaction)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {getTypeIcon(transaction.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">{transaction.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1">
                        <div className="flex items-center space-x-2">
                          <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-500 truncate">{transaction.category}</span>
                        </div>
                        <span className="hidden sm:inline text-gray-300">•</span>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-500">{formatDate(transaction.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`text-base sm:text-lg font-semibold ${getTypeColor(transaction.type)} flex-shrink-0`}>
                    {transaction.type === 'inflow' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  {editMode ? 'Edit Transaction' : 'Transaction Details'}
                </h3>
                <div className="flex items-center space-x-2">
                  {!editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      className="text-blue-600 hover:text-blue-700 transition-colors p-2 rounded-lg hover:bg-blue-50"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              {/* Amount */}
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {getTypeIcon(editData.type)}
                </div>
                {editMode ? (
                  <div className="space-y-3">
                    <input
                      type="number"
                      value={editData.amount}
                      onChange={(e) => setEditData({ ...editData, amount: parseFloat(e.target.value) || 0 })}
                      className="text-2xl sm:text-3xl font-bold text-center border-b-2 border-gray-300 focus:border-blue-500 outline-none bg-transparent max-w-xs mx-auto"
                      min="0"
                      step="0.01"
                    />
                    <div className="text-sm text-gray-500 mt-1 capitalize">
                      {editData.type}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={`text-2xl sm:text-3xl font-bold ${getTypeColor(editData.type)}`}>
                      {editData.type === 'inflow' ? '+' : '-'}{formatCurrency(editData.amount)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 capitalize">
                      {editData.type}
                    </div>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    {editMode ? (
                      <textarea
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows="3"
                        placeholder="Enter description..."
                      />
                    ) : (
                      <p className="text-gray-900 min-h-[3rem] flex items-center">{editData.description}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                    {editMode ? (
                      <select
                        value={editData.type}
                        onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="inflow">Income</option>
                        <option value="outflow">Expense</option>
                      </select>
                    ) : (
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(editData.type)}
                        <span className={`font-medium capitalize ${getTypeColor(editData.type)}`}>
                          {editData.type === 'inflow' ? 'Income' : 'Expense'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    {editMode ? (
                      <select
                        value={editData.category}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select category...</option>
                        <option value="Food & Transport">Food & Transport</option>
                        <option value="Salary">Salary</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Income">Income</option>
                        <option value="Food">Food</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Investment">Investment</option>
                      </select>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{editData.category}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    {editMode ? (
                      <input
                        type="date"
                        value={editData.date}
                        onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{formatDate(editData.date)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                <p className="text-gray-500 font-mono text-sm">#{selectedTransaction.id.toString().padStart(6, '0')}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
                {editMode ? (
                  <>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setEditData({
                          amount: selectedTransaction.amount,
                          description: selectedTransaction.description,
                          category: selectedTransaction.category,
                          type: selectedTransaction.type,
                          date: selectedTransaction.date
                        });
                      }}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Here you would normally save to backend
                        alert('Changes saved! (In a real app, this would update the database)');
                        setEditMode(false);
                        // Update local state for demo purposes
                        setSelectedTransaction({ ...selectedTransaction, ...editData });
                      }}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditMode(true)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Transaction</span>
                    </button>
                    <button className="flex-1 bg-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center space-x-2">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;