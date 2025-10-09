import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { getCategories, addCategory, updateCategory, deleteCategory } from '@/lib/hooks/categories';

const CategoriesModal = ({ isOpen, onClose, userId }: any) => {
  const [categories, setCategories] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: 'outflow' });

  const categoryColors = [
    'bg-red-500', 'bg-green-500', 'bg-blue-500', 
    'bg-purple-500', 'bg-orange-500', 'bg-pink-500',
    'bg-yellow-500', 'bg-indigo-500', 'bg-teal-500'
  ];

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      toast.error('Failed to load categories');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    
    try {
      await addCategory({
        user_id: userId,
        name: formData.name,
        type: formData.type
      });
      toast.success('Category created successfully!');
      setShowAddModal(false);
      setFormData({ name: '', type: 'outflow' });
      loadCategories();
    } catch (error) {
      toast.error('Failed to create category');
      console.error(error);
    }
  };

  const handleUpdateCategory = async () => {
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    
    try {
      await updateCategory(selectedCategory.id, {
        name: formData.name,
        type: formData.type
      });
      toast.success('Category updated successfully!');
      setShowEditModal(false);
      setSelectedCategory(null);
      setFormData({ name: '', type: 'outflow' });
      loadCategories();
    } catch (error) {
      toast.error('Failed to update category');
      console.error(error);
    }
  };

  const handleDeleteCategory = async (categoryId, categoryName) => {
    if (!confirm(`Are you sure you want to delete "${categoryName}"?`)) return;
    
    try {
      await deleteCategory(categoryId);
      toast.success('Category deleted successfully!');
      loadCategories();
    } catch (error) {
      toast.error('Failed to delete category');
      console.error(error);
    }
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name, type: category.type });
    setShowEditModal(true);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Categories Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Manage Categories</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading categories...</div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {categories.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No categories yet. Add your first category!
                  </div>
                ) : (
                  categories.map((category, index) => (
                    <div
                      key={category.id}
                      className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${categoryColors[index % categoryColors.length]}`}></div>
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-gray-500">
                              {category.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(category)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit category"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id, category.name)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Category
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add New Category</h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({ name: '', type: 'outflow' });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Food & Transport"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="outflow">Expense</option>
                    <option value="inflow">Income</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({ name: '', type: 'outflow' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Edit Category</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCategory(null);
                    setFormData({ name: '', type: 'outflow' });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && handleUpdateCategory()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Food & Transport"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="outflow">Expense</option>
                    <option value="inflow">Income</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCategory(null);
                    setFormData({ name: '', type: 'outflow' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateCategory}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesModal;