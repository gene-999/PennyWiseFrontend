'use client';
import React, { useEffect, useState } from 'react';
import CreateTransaction from '@/components/createTransaction';
import Header from '@/components/header';
import TransactionCards from '@/components/transactionCards';
import Chart from '@/components/chart';
import { ChatComponent } from '../../../components/chat';
import { useUserStore } from '@/lib/store';
import { toast, Toaster } from 'sonner';
import { getTransactions } from '@/lib/hooks/transcations';
type ExpenseDashboardProps = {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  username: string;
};

const ExpenseDashboard = ({
  isChatOpen,
  setIsChatOpen,
  username,
}: ExpenseDashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
        toast.success("Transactions loaded successfully.");
      } catch (error: any) {
        toast.error(error.message || "Failed to load transactions.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen font-mono ">
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
            Hello,<span className="font-normal">{username}</span> ✨
          </h2>
        </div>

        <TransactionCards transactions={transactions} />

        <Chart transactions={transactions}/>
      </div>
    </div>
  );
};

// export default ExpenseDashboard;

export function Home({ userId, username, email }: {
  userId: string
  username: string
  email: string
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const setUserId = useUserStore((state) => state.setUserId)
  const setUserName = useUserStore((state) => state.setUserName)
  const setUserEmail = useUserStore((state) => state.setUserEmail)

  useEffect(() => {
    setUserId(userId)
    setUserName(username)
    setUserEmail(email)
  }, [userId, username, email])

  return (
    <>
        <Toaster position="top-right"/>

      {/* Desktop view */}
      <div className="hidden lg:flex w-full overflow-hidden">
        {/* Transactions area */}
        <div className={`transition-all duration-300 ${isChatOpen ? 'w-2/3' : 'w-full'} overflow-hidden`}>
          <ExpenseDashboard isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} username={username} />
        </div>

        {/* Chat area (shown only if open) */}
        {isChatOpen && (
          <div className="w-1/3 h-full overflow-hidden border-l border-gray-200">
            <ChatComponent isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen}  userId={userId} username={username} email={email}/>
          </div>
        )}
      </div>

      {/* Mobile view */}
      <div className="lg:hidden overflow-hidden">
        {isChatOpen ? (
          <ChatComponent isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen}  userId={userId} username={username} email={email}/>
        ) : (
          <ExpenseDashboard isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} username={username} />
        )}
      </div>
    </>
  );
}


