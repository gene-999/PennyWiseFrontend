import { MoreHorizontal, Wallet, WalletCards, HandCoins, ArrowLeftRight } from 'lucide-react';
import { getParamByISO } from "iso-country-currency"

export default function TransactionCards({transactions}: any) {
  return (
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
          <div className="text-xl sm:text-2xl font-semibold text-gray-900">
            {getParamByISO('GH', 'currency')} 54.30
          </div>
          <Wallet size={16} className="text-gray-400 mb-2" />
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
          <div className="text-xl sm:text-2xl font-semibold text-gray-900">
            {getParamByISO('GH', 'currency')} 342.75
          </div>
          <WalletCards size={16} className="text-gray-400 mb-2" />
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
          <div className="text-xl sm:text-2xl font-semibold text-gray-900">
            {getParamByISO('GH', 'currency')} 1,982.10
          </div>
          <HandCoins size={16} className="text-gray-400 mb-2" />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Most of your spending went to food, bills, and data.
        </p>
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
          <div className="text-xl sm:text-2xl font-semibold text-gray-900">
            {47 + transactions.length}
          </div>
          <ArrowLeftRight size={16} className="text-gray-400 mb-2" />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          You've logged ${47 + transactions.length} expenses so far this month.
        </p>
      </div>
    </div>
  );
}
