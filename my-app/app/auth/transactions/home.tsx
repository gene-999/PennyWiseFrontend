'use client';
import React, { useEffect, useState } from 'react';
import { Calendar, Tag, ArrowUpRight, ArrowDownLeft, Search } from 'lucide-react';
import Header from '@/components/header';
import EditTransaction from '@/components/editTransaction';
import { ChatComponent } from '../../../components/chat';
import { getTransactions } from '@/lib/hooks/transcations';
import { toast, Toaster } from 'sonner';
import { useUserStore } from '@/lib/store';

const TransactionsPage = ({ isChatOpen, setIsChatOpen }: any) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [transactions, setTransactions] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
        toast.success('Transactions loaded successfully.');
      } catch (error: any) {
        toast.error(error.message || 'Failed to load transactions.');
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: any) => {
    return `GHS ${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getTypeIcon = (type: any) => {
    return type === 'inflow' ? (
      <ArrowDownLeft className="w-4 h-4 text-green-500" />
    ) : (
      <ArrowUpRight className="w-4 h-4 text-red-500" />
    );
  };

  const getTypeColor = (type: any) => {
    return type === 'inflow' ? 'text-green-600' : 'text-red-600';
  };

  const filteredTransactions = transactions
    .filter((transaction: any) => {
      const matchesSearch =
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || transaction.type === filterType;

      // Date range filter
      const transactionDate = new Date(transaction.date);
      const matchesDateRange =
        (!dateRange.start || transactionDate >= new Date(dateRange.start)) &&
        (!dateRange.end || transactionDate <= new Date(dateRange.end));

      // Amount range filter
      const matchesAmountRange =
        (!amountRange.min || transaction.amount >= parseFloat(amountRange.min)) &&
        (!amountRange.max || transaction.amount <= parseFloat(amountRange.max));

      return matchesSearch && matchesFilter && matchesDateRange && matchesAmountRange;
    })
    .sort((a: any, b: any) => {
      switch (sortOrder) {
        case 'newest':
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore

          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore

          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b.amount - a.amount;
        case 'lowest':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

  const openModal = (transaction: any) => {
    setSelectedTransaction(transaction);
    setEditData({
      amount: transaction.amount,
      description: transaction.description,
      category: transaction.category,
      type: transaction.type,
      date: transaction.date,
    });
    setEditMode(false);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setEditMode(false);
    setEditData({});
  };

  return (
    <div className="min-h-screen  ">
      {/* Header */}
      <Header
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsChatOpen={setIsChatOpen}
        isChatOpen={isChatOpen}
      />

      {/* Main Content */}
      <main className=" mx-auto px-4 sm:px-6 py-4 sm:py-8">
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
              {/* <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" /> */}
              <select
                className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Range (GHS)
              </label>
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
          {(searchQuery ||
            filterType !== 'all' ||
            sortOrder !== 'newest' ||
            dateRange.start ||
            dateRange.end ||
            amountRange.min ||
            amountRange.max) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Search: {searchQuery}
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
        <div className="bg-white rounded-lg border border-gray-200 ">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="grid grid-rows-2 items-center justify-between">
              <h3 className="row-span-1 text-lg font-semibold text-gray-900">
                Transactions ({filteredTransactions.length})
              </h3>
              <div className="text-sm text-gray-500">
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </div>
            </div>
          </div>

          {/* ✅ Scrollable list area */}
          <div
            className="divide-y divide-gray-200 overflow-y-auto no-scrollbar"
            style={{ maxHeight: 'calc(100vh - 300px)' }} // Adjust based on actual height of header + filters
          >
            {filteredTransactions.map((transaction: any) => (
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
                      <p className="font-medium text-gray-900 truncate">
                        {transaction.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1">
                        <div className="flex items-center space-x-2">
                          <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-500 truncate">
                            {transaction.category}
                          </span>
                        </div>
                        <span className="hidden sm:inline text-gray-300">•</span>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-500">
                            {formatDate(transaction.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-base sm:text-lg font-semibold ${getTypeColor(transaction.type)} flex-shrink-0`}
                  >
                    {transaction.type === 'inflow' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
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
        <EditTransaction
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
          editMode={editMode}
          setEditMode={setEditMode}
          // editData={editData}
          // setEditData={setEditData}
        />
      )}
    </div>
  );
};

export default TransactionsPage;

export function TransactionsComponent({
  userId,
  username,
  email,
}: {
  userId: string;
  username: string;
  email: string;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const setUserId = useUserStore((state) => state.setUserId);
  const setUserName = useUserStore((state) => state.setUserName);
  const setUserEmail = useUserStore((state) => state.setUserEmail);

  useEffect(() => {
    setUserId(userId);
    setUserName(username);
    setUserEmail(email);
  }, [userId, username, email]);

  return (
    <>
      <Toaster position="top-right" />
      {/* Desktop view */}
      <div className="hidden lg:flex w-full overflow-hidden ">
        {/* Transactions area */}
        <div
          className={`transition-all duration-300 ${isChatOpen ? 'w-2/3' : 'w-full'} overflow-hidden`}
        >
          <TransactionsPage isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
        </div>

        {/* Chat area (shown only if open) */}
        {isChatOpen && (
          <div className="w-1/3 h-full overflow-hidden border-l border-gray-200">
            <ChatComponent isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} userId={userId} username={username} email={email}/>
          </div>
        )}
      </div>

      {/* Mobile view */}
      <div className="lg:hidden overflow-hidden">
        {isChatOpen ? (
          <ChatComponent isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen}  userId={userId} username={username} email={email}/>
        ) : (
          <TransactionsPage isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
        )}
      </div>
    </>
  );
}
