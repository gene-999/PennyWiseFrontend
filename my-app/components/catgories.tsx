import React, { useEffect, useState } from 'react';
import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} from '@/lib/hooks/categories'; // Adjust the path as needed
import { toast } from 'sonner';

function CategoriesModal() {
  const [categories, setCategories] = useState<any>([]);
  const [newCategory, setNewCategory] = useState<any>({ name: '' });
  const [editingId, setEditingId] = useState<any>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      toast.error('Failed to load categories');
    }
  }

  async function handleAdd() {
    if (!newCategory.name.trim()) {
      toast.warning('Category name is required');
      return;
    }

    try {
      const [created] = await addCategory(newCategory);
      setCategories([...categories, created]);
      setNewCategory({ name: '' });
      toast.success('Category added successfully');
    } catch (err) {
      toast.error('Error adding category');
    }
  }

  async function handleUpdate(id) {
    try {
      const [updated] = await updateCategory(id, newCategory);
      setCategories(categories.map(cat => (cat.id === id ? updated : cat)));
      setNewCategory({ name: '' });
      setEditingId(null);
      toast.success('Category updated');
    } catch (err) {
      toast.error('Error updating category');
    }
  }

  async function handleDelete(id) {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(cat => cat.id !== id));
      toast.success('Category deleted');
    } catch (err) {
      toast.error('Error deleting category');
    }
  }

  function startEdit(category) {
    setEditingId(category.id);
    setNewCategory({ name: category.name });
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="border px-3 py-1 rounded w-full"
          placeholder="Category name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ name: e.target.value })}
        />
        {editingId ? (
          <button
            onClick={() => handleUpdate(editingId)}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Add
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="flex justify-between items-center border p-2 rounded">
            <span>{cat.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => startEdit(cat)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesModal;
