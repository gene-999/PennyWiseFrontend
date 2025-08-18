import React, { useState } from 'react';
import { X, Calendar, Tag, ArrowUpRight, ArrowDownLeft, Search, Filter } from 'lucide-react';

const TransactionsPage = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
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
    return matchesSearch && matchesFilter;
  });

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-gray-900">Penny Wise</h1>
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Transactions</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">AI Chatbot</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add New Transaction
            </button>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">E</span>
            </div>
            <span className="text-gray-700">Eugene</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">All Transactions</h2>
          <p className="text-gray-600">Track and manage your financial activities</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="inflow">Income</option>
                <option value="outflow">Expenses</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => openModal(transaction)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getTypeIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{transaction.category}</span>
                        <span className="text-gray-300">•</span>
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{formatDate(transaction.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`text-lg font-semibold ${getTypeColor(transaction.type)}`}>
                    {transaction.type === 'inflow' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Transaction Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Amount */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {getTypeIcon(selectedTransaction.type)}
                </div>
                <div className={`text-3xl font-bold ${getTypeColor(selectedTransaction.type)}`}>
                  {selectedTransaction.type === 'inflow' ? '+' : '-'}{formatCurrency(selectedTransaction.amount)}
                </div>
                <div className="text-sm text-gray-500 mt-1 capitalize">
                  {selectedTransaction.type}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-gray-900">{selectedTransaction.description}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{selectedTransaction.category}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{formatDate(selectedTransaction.date)}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                  <p className="text-gray-500 font-mono text-sm">#{selectedTransaction.id.toString().padStart(6, '0')}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Transaction
                </button>
                <button className="flex-1 bg-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors">
                  Delete
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