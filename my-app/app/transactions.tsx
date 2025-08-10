import React, { useState } from 'react';
import { MoreHorizontal, Copy, RefreshCw, Calendar, Plus, X, Menu, ChevronDown, Filter, Search, ArrowUpRight, ArrowDownLeft, Eye } from 'lucide-react';

const TransactionsPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    dateFrom: '',
    dateTo: '',
    search: ''
  });

  // Sample transactions data
  const [transactions] = useState([
    {
      id: 1,
      amount: 54.30,
      description: 'Lunch at KFC and Uber ride',
      category: 'food',
      type: 'outflow',
      date: '2025-08-10',
      time: '14:30',
      merchant: 'KFC & Uber',
      paymentMethod: 'Card ending in 4521'
    },
    {
      id: 2,
      amount: 2500.00,
      description: 'Monthly salary deposit',
      category: 'salary',
      type: 'inflow',
      date: '2025-08-01',
      time: '09:00',
      merchant: 'ABC Company Ltd',
      paymentMethod: 'Bank transfer'
    },
    {
      id: 3,
      amount: 120.50,
      description: 'Grocery shopping at ShopRite',
      category: 'food',
      type: 'outflow',
      date: '2025-08-09',
      time: '16:45',
      merchant: 'ShopRite',
      paymentMethod: 'Card ending in 4521'
    },
    {
      id: 4,
      amount: 85.00,
      description: 'Mobile data bundle',
      category: 'bills',
      type: 'outflow',
      date: '2025-08-08',
      time: '11:20',
      merchant: 'MTN Ghana',
      paymentMethod: 'Mobile money'
    },
    {
      id: 5,
      amount: 300.00,
      description: 'Freelance project payment',
      category: 'freelance',
      type: 'inflow',
      date: '2025-08-07',
      time: '13:15',
      merchant: 'Client XYZ',
      paymentMethod: 'Bank transfer'
    },
    {
      id: 6,
      amount: 45.20,
      description: 'Movie tickets',
      category: 'entertainment',
      type: 'outflow',
      date: '2025-08-06',
      time: '19:30',
      merchant: 'SilverBird Cinemas',
      paymentMethod: 'Card ending in 4521'
    }
  ]);

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

  const allCategories = [...categories.outflow, ...categories.inflow];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCategoryLabel = (category) => {
    const cat = allCategories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filters.type === 'all' || transaction.type === filters.type;
    const matchesCategory = filters.category === 'all' || transaction.category === filters.category;
    const matchesSearch = transaction.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                         transaction.merchant.toLowerCase().includes(filters.search.toLowerCase());
    
    let matchesDate = true;
    if (filters.dateFrom && filters.dateTo) {
      matchesDate = transaction.date >= filters.dateFrom && transaction.date <= filters.dateTo;
    } else if (filters.dateFrom) {
      matchesDate = transaction.date >= filters.dateFrom;
    } else if (filters.dateTo) {
      matchesDate = transaction.date <= filters.dateTo;
    }
    
    return matchesType && matchesCategory && matchesSearch && matchesDate;
  });

  const resetFilters = () => {
    setFilters({
      type: 'all',
      category: 'all',
      dateFrom: '',
      dateTo: '',
      search: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            <a href="#" className="text-gray-500 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-900 font-medium">Transactions</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">AI Chatbot</a>
          </nav>
          
          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
              E
            </div>
            <span className="text-gray-700 font-medium">Eugene</span>
            <button className="p-1">
              <div className="w-6 h-6 grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
                ))}
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-500 hover:text-gray-900 px-4 py-2">Home</a>
              <a href="#" className="text-gray-900 font-medium px-4 py-2">Transactions</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-4 py-2">AI Chatbot</a>
              <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 mt-2 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    E
                  </div>
                  <span className="text-gray-700 font-medium">Eugene</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-2">
            Your <span className="font-normal">Transactions</span>
          </h2>
          <p className="text-gray-600">Track and manage all your financial activities</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4 lg:mb-0">Filters</h3>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-500 hover:text-blue-600 flex items-center space-x-1"
            >
              <RefreshCw size={14} />
              <span>Reset Filters</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Search transactions..."
                />
              </div>
            </div>
            
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <div className="relative">
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="inflow">💰 Income</option>
                  <option value="outflow">💸 Expenses</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="relative">
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                >
                  <option value="all">All Categories</option>
                  {allCategories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  placeholder="From"
                />
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  placeholder="To"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-semibold text-gray-900">{filteredTransactions.length}</div>
            <p className="text-sm text-gray-500">Total Transactions</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-semibold text-green-600">
              ₵{filteredTransactions.filter(t => t.type === 'inflow').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </div>
            <p className="text-sm text-gray-500">Total Income</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-semibold text-red-600">
              ₵{filteredTransactions.filter(t => t.type === 'outflow').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </div>
            <p className="text-sm text-gray-500">Total Expenses</p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'inflow' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'inflow' ? 
                            <ArrowDownLeft size={16} className="text-green-600" /> : 
                            <ArrowUpRight size={16} className="text-red-600" />
                          }
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                          <div className="text-sm text-gray-500">{transaction.merchant}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{getCategoryLabel(transaction.category)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{formatDate(transaction.date)}</div>
                      <div className="text-sm text-gray-500">{formatTime(transaction.time)}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`text-sm font-medium ${
                        transaction.type === 'inflow' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'inflow' ? '+' : '-'}₵{transaction.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedTransaction(transaction)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                onClick={() => setSelectedTransaction(transaction)}
                className="p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === 'inflow' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'inflow' ? 
                        <ArrowDownLeft size={14} className="text-green-600" /> : 
                        <ArrowUpRight size={14} className="text-red-600" />
                      }
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                      <div className="text-xs text-gray-500">{getCategoryLabel(transaction.category)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      transaction.type === 'inflow' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'inflow' ? '+' : '-'}₵{transaction.amount.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">{formatDate(transaction.date)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Filter size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
              <button
                onClick={resetFilters}
                className="text-blue-500 hover:text-blue-600 text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Transaction Details</h3>
              <button 
                onClick={() => setSelectedTransaction(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Amount */}
              <div className="text-center pb-6 border-b border-gray-200">
                <div className={`text-4xl font-bold mb-2 ${
                  selectedTransaction.type === 'inflow' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedTransaction.type === 'inflow' ? '+' : '-'}₵{selectedTransaction.amount.toFixed(2)}
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedTransaction.type === 'inflow' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {selectedTransaction.type === 'inflow' ? 
                      <ArrowDownLeft size={16} className="text-green-600" /> : 
                      <ArrowUpRight size={16} className="text-red-600" />
                    }
                  </div>
                  <span className={`text-sm font-medium ${
                    selectedTransaction.type === 'inflow' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedTransaction.type === 'inflow' ? 'Income' : 'Expense'}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-gray-900 mt-1">{selectedTransaction.description}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-gray-900 mt-1">{getCategoryLabel(selectedTransaction.category)}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Merchant</label>
                  <p className="text-gray-900 mt-1">{selectedTransaction.merchant}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date</label>
                    <p className="text-gray-900 mt-1">{formatDate(selectedTransaction.date)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Time</label>
                    <p className="text-gray-900 mt-1">{formatTime(selectedTransaction.time)}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Method</label>
                  <p className="text-gray-900 mt-1">{selectedTransaction.paymentMethod}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors">
                  Edit Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;