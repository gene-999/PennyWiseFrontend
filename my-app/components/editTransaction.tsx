import React, { useEffect, useState } from 'react';
import { X, Calendar, Tag, ArrowUpRight, ArrowDownLeft, Save, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';

import { getCategories } from '@/lib/hooks/categories'; // your categories API file
import { updateTransaction, deleteTransaction } from '@/lib/hooks/transcations'; // you need to implement these

const formatCurrency = (amount: number) => {
  console.log(amount)
  return `GHS ${amount.toFixed(2)}`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const getTypeIcon = (type: string) => {
  return type === 'inflow' ? (
    <ArrowDownLeft className="w-4 h-4 text-green-500" />
  ) : (
    <ArrowUpRight className="w-4 h-4 text-red-500" />
  );
};

const getTypeColor = (type: string) => {
  return type === 'inflow' ? 'text-green-600' : 'text-red-600';
};

interface Transaction {
  id: string | number;
  amount: number;
  description: string;
  category: string;
  type: 'inflow' | 'outflow';
  date: string; // ISO date string
}

interface Props {
  selectedTransaction: Transaction | null;
  setSelectedTransaction: any;
  editMode: any;
  setEditMode: (flag: boolean) => void;
}

export default function EditTransaction({
  selectedTransaction,
  setSelectedTransaction,
  editMode,
  setEditMode,
}: Props) {
  const [editData, setEditData] = useState<any>(selectedTransaction);
  const [categories, setCategories] = useState<string[]>([]);

  console.log(selectedTransaction)
  // Load categories when mounting
  useEffect(() => {
    (async () => {
      try {
        const cats = await getCategories();
        // Assume categories is array of objects, each with a `name` or `id` + `name`
        // Extract names (adjust based on your data shape)
        const names = cats.map((c: any) => c.name ?? c.category ?? c.id);
        setCategories(names);
      } catch (err) {
        console.error('Failed to load categories', err);
        toast.error('Failed to load categories');
      }
    })();
  }, []);

  // When selectedTransaction changes (e.g. opened), set editData
  useEffect(() => {
    if (selectedTransaction) {
      setEditData({
        id: selectedTransaction.id,
        amount: selectedTransaction.amount,
        description: selectedTransaction.description,
        category: selectedTransaction.category,
        type: selectedTransaction.type,
        date: selectedTransaction.date,
      });
    }
  }, [selectedTransaction]);

  const closeModal = () => {
    setSelectedTransaction(null);
    setEditMode(false);
    setEditData({});
  };

  const handleSave = async () => {
    if (!editData || !editData.id) {
      toast.error('No transaction selected');
      return;
    }

    // Basic validation
    if (
      editData.amount === undefined ||
      editData.amount < 0 ||
      !editData.category ||
      !editData.type ||
      !editData.date
    ) {
      toast.warning('Please fill all required fields');
      return;
    }

    try {
      const updated = await updateTransaction(editData.id, {
        amount: editData.amount,
        description: editData.description,
        category: editData.category,
        type: editData.type,
        date: editData.date,
      });

      // Update local
      setSelectedTransaction(updated);
      toast.success('Transaction updated');
      setEditMode(false);
    } catch (err) {
      console.error('Error updating transaction', err);
      toast.error('Failed to update transaction');
    }
  };

  const handleDelete = async () => {
    if (!editData || !editData.id) {
      toast.error('No transaction selected');
      return;
    }

    // Optionally confirm
    if (!confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    try {
      await deleteTransaction(editData.id);
      toast.success('Transaction deleted');
      closeModal();
    } catch (err) {
      console.error('Error deleting transaction', err);
      toast.error('Failed to delete transaction');
    }
  };

  if (!selectedTransaction) {
    return null;
  }

  return (
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
              {getTypeIcon(editData.type!)}
            </div>
            {editMode ? (
              <div className="space-y-3">
                <input
                  type="number"
                  value={editData.amount ?? ''}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      amount: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="text-2xl sm:text-3xl font-bold text-center border-b-2 border-gray-300 focus:border-blue-500 outline-none bg-transparent max-w-xs mx-auto"
                  min="0"
                  step="0.01"
                />
                <div className="text-sm text-gray-500 mt-1 capitalize">{editData.type}</div>
              </div>
            ) : (
              <div>
                <div className={`text-2xl sm:text-3xl font-bold ${getTypeColor(editData.type!)}`}>
                  {editData.type === 'inflow' ? '+' : '-'}
                  {formatCurrency(editData.amount!)}
                </div>
                <div className="text-sm text-gray-500 mt-1 capitalize">{editData.type}</div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Category */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              {editMode ? (
                <select
                  value={editData.category ?? ''}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center space-x-2 mt-1">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{editData.category}</span>
                </div>
              )}
            </div>

            {/* Date */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              {editMode ? (
                <input
                  type="date"
                  value={editData.date?.slice(0, 10) ?? ''}
                  onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{formatDate(editData.date!)}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              {editMode ? (
                <textarea
                  value={editData.description ?? ''}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  placeholder="Enter description..."
                />
              ) : (
                <p className="text-gray-900 min-h-[3rem] flex items-center">
                  {editData.description}
                </p>
              )}
            </div>

            {/* Transaction Type */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
              {editMode ? (
                <select
                  value={editData.type ?? ''}
                  onChange={(e) =>
                    setEditData({ ...editData, type: e.target.value as 'inflow' | 'outflow' })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="inflow">Income</option>
                  <option value="outflow">Expense</option>
                </select>
              ) : (
                <div className="flex items-center space-x-2 mt-1">
                  {getTypeIcon(editData.type!)}
                  <span className={`font-medium capitalize ${getTypeColor(editData.type!)}`}>
                    {editData.type === 'inflow' ? 'Income' : 'Expense'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
            {editMode ? (
              <>
                <button
                  onClick={() => {
                    // reset to original
                    setEditMode(false);
                    setEditData({
                      amount: selectedTransaction.amount,
                      description: selectedTransaction.description,
                      category: selectedTransaction.category,
                      type: selectedTransaction.type,
                      date: selectedTransaction.date,
                    });
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
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
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
