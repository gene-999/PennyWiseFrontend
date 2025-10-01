'use client';
import React, { useState } from 'react';
import { Calendar, X, ChevronDown } from 'lucide-react';
import { getParamByISO } from 'iso-country-currency';
import { addTransaction } from '@/lib/hooks/transcations';
import { useUserStore } from '@/lib/store'
import { toast } from 'sonner';

export default function CreateTransaction({ isModalOpen, setIsModalOpen }: any) {
  type TransactionType = 'outflow' | 'inflow';

  console.log(isModalOpen)
  const [newTransaction, setNewTransaction] = useState<{
    amount: string;
    description: string;
    category: string;
    type: TransactionType;
    date: string;
  }>({
    amount: '',
    description: '',
    category: '',
    type: 'outflow',
    date: new Date().toISOString().split('T')[0],
  });

  const [activeLabel, setActiveLabel] = useState('Today');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
    const userId = useUserStore((state) => state.userId)

    console.log(userId)
  const handleDateChange = (label: string) => {
    const newDate = new Date();

    if (label === 'Yesterday') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (label === 'Last Week') {
      newDate.setDate(newDate.getDate() - 7);
    }

    const formattedDate = newDate.toISOString().split('T')[0];
    setNewTransaction({ ...newTransaction, date: formattedDate });
    setActiveLabel(label);
  };

  const buttons = ['Today', 'Yesterday', 'Last Week'];

const categories = {
  outflow: [
    { value: 'Food & Dining', label: '🍽️ Food & Dining' },
    { value: 'Transportation', label: '🚗 Transportation' },
    { value: 'Shopping', label: '🛍️ Shopping' },
    { value: 'Bills & Utilities', label: '💡 Bills & Utilities' },
    { value: 'Entertainment', label: '🎬 Entertainment' },
    { value: 'Healthcare', label: '🏥 Healthcare' },
    { value: 'Education', label: '📚 Education' },
    { value: 'Other Expense', label: '💸 Other Expense' },
  ],
  inflow: [
    { value: 'Salary', label: '💰 Salary' },
    { value: 'Freelance', label: '💻 Freelance' },
    { value: 'Investment', label: '📈 Investment' },
    { value: 'Gift', label: '🎁 Gift' },
    { value: 'Refund', label: '↩️ Refund' },
    { value: 'Other Income', label: '💵 Other Income' },
  ],
};

  // Submit transaction to Supabase
  const handleSubmitTransaction = async (e: any) => {
    e.preventDefault();
    setErrorMsg('');
    if (!newTransaction.amount || !newTransaction.description || !newTransaction.category) return;

    try {
      setLoading(true);

      // get current user
      await addTransaction(
        {
          user_id: userId,
          amount: parseFloat(newTransaction.amount),
          description: newTransaction.description,
          category: newTransaction.category,
          type: newTransaction.type,
          date: newTransaction.date,
          created_at: new Date(),
        },
      );

    toast.success("Transaction added successfully ")
 
        // reset form and close modal
        setNewTransaction({
          amount: '',
          description: '',
          category: '',
          type: 'outflow',
          date: new Date().toISOString().split('T')[0],
        });
        setIsModalOpen(false);
      } catch (err:any){
        toast.error(err.message.ToUpperCase());
        if (err instanceof Error) {
    console.error(err.message)
  }
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTransaction({
      amount: '',
      description: '',
      category: '',
      type: 'outflow',
      date: new Date().toISOString().split('T')[0],
    });
    setErrorMsg('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: any = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 text-center">Add New Transaction</h3>
          <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={30} />
          </button>
        </div>

        <form onSubmit={handleSubmitTransaction} className="space-y-6">
          {/* Error message */}
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-center text-gray-700 mb-3">
              Transaction Type
            </label>
            <div className="flex flex-row space-x-4 items-center justify-center">
              <button
                type="button"
                onClick={() =>
                  setNewTransaction({ ...newTransaction, type: 'outflow', category: '' })
                }
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
                onClick={() =>
                  setNewTransaction({ ...newTransaction, type: 'inflow', category: '' })
                }
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-300 text-lg">{getParamByISO('GH', 'currency')} </span>
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, amount: e.target.value })
                }
                className="w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={newTransaction.description}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, description: e.target.value })
              }
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder={
                newTransaction.type === 'inflow' ? 'Source of income' : 'What did you spend on?'
              }
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="relative">
              <select
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                required
              >
                <option value="">Select a category</option>
                {categories[newTransaction.type].map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
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
                          ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
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
              disabled={loading}
              className={`flex-1 px-4 py-3 text-white rounded-lg font-medium transition-colors ${
                loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading
                ? 'Saving...'
                : `Add ${newTransaction.type === 'inflow' ? 'Income' : 'Expense'}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
