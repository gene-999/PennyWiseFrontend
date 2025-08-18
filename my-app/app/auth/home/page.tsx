'use client';
import React, { useState } from 'react';
import CreateTransaction from '@/components/createTransaction';
import Header from '@/components/header';
import TransactionCards from '@/components/transactionCards';
import Chart from '@/components/chart';
import { ChatComponent } from '../../../components/chat';

const ExpenseDashboard = ({isChatOpen, setIsChatOpen}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);



  return (
    <div className="min-h-screen font-mono bg-[#f5f6ff] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat">
      <Header
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsChatOpen={setIsChatOpen}
        isChatOpen={isChatOpen}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900">
            Hello,<span className="font-normal">Eugene</span> ✨
          </h2>
        </div>

        <TransactionCards transactions={transactions} />

        {/* Bottom Section */}
        {/* <div className="flex flex-wrap items-center gap-4 mb-6">
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
        </div> */}

        {/* Monthly Overview Chart */}
        <Chart />
      </div>
    </div>
  );
};

// export default ExpenseDashboard;

export default function Thing() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Desktop view */}
      <div className="hidden lg:flex w-full overflow-hidden">
        {/* Transactions area */}
        <div className={`transition-all duration-300 ${isChatOpen ? 'w-2/3' : 'w-full'} overflow-hidden`}>
          <ExpenseDashboard isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
        </div>

        {/* Chat area (shown only if open) */}
        {isChatOpen && (
          <div className="w-1/3 h-full overflow-hidden border-l border-gray-200">
            <ChatComponent isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
          </div>
        )}
      </div>

      {/* Mobile view */}
      <div className="lg:hidden overflow-hidden">
        {isChatOpen ? (
          <ChatComponent isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
        ) : (
          <ExpenseDashboard isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
        )}
      </div>
    </>
  );
}


