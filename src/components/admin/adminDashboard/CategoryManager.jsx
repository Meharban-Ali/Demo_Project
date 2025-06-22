import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiEdit2, FiTrash2, FiPlus, FiX,
  FiArrowLeft, FiEye, FiEyeOff
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useCategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then((res) => setCategories(res.data))
      .catch(() => toast.error('Failed to fetch categories'));
  }, []);

  return categories;
};

export const CategoryManager = ({ isSidebarOpen }) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [categoryId, setCategoryId] = useState(''); // Category ID state
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const navigate = useNavigate();

  const API_URL = 'http://localhost:5000/api/categories';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    try {
      if (editingId) {
        const res = await axios.put(`${API_URL}/${editingId}`, { name: categoryName });
        setCategories(categories.map(cat => (cat._id === editingId ? res.data : cat)));
        toast.success('Category updated successfully');
        setEditingId(null);
      } else {
        const res = await axios.post(API_URL, { name: categoryName });
        setCategories([...categories, res.data]);
        toast.success('Category added successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setCategoryName('');
      setCategoryId(''); // Reset category selection
    } catch (err) {
      toast.error('Error saving category');
    }
  };

  const handleEdit = (category) => {
    setCategoryName(category.name);
    setEditingId(category._id);
    setCategoryId(category._id); // Pre-select category for editing
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${categoryToDelete._id}`);
      setCategories(categories.filter(cat => cat._id !== categoryToDelete._id));
      toast.success('Category deleted');
    } catch {
      toast.error('Delete failed');
    } finally {
      setShowDeleteConfirmation(false);
      setCategoryToDelete(null);
    }
  };

  const toggleCategoriesVisibility = () => {
    setShowCategories(!showCategories);
  };

  const toggleIndividualVisibility = async (categoryId) => {
    try {
      const target = categories.find(cat => cat._id === categoryId);
      const res = await axios.put(`${API_URL}/${categoryId}`, {
        visible: !target.visible
      });
      setCategories(categories.map(cat => (cat._id === categoryId ? res.data : cat)));
    } catch {
      toast.error('Failed to toggle visibility');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/adminDashboard');
  };

  return (
    <div className="flex justify-center items-start p-4 md:p-6 mt-16 w-full">
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Confirm Deletion</h3>
              <button onClick={() => setShowDeleteConfirmation(false)} className="text-gray-500 hover:text-gray-700">
                <FiX size={20} />
              </button>
            </div>
            <p className="mb-6">Are you sure you want to delete the category "{categoryToDelete?.name}"?</p>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full sm:w-auto"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow p-4 md:p-6 w-full max-w-3xl relative"
      >
        <button
          onClick={handleBackToDashboard}
          className="absolute top-4 left-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft className="mr-1" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </button>

        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-gray-800">Manage Categories</h2>

        <div className="flex flex-col sm:flex-row mb-6 gap-2">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 p-3 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg flex items-center justify-center"
          >
            <FiPlus className="mr-2" />
            <span>{editingId ? 'Update' : 'Add'} Category</span>
          </button>
        </div>

        {/* Category Dropdown for selecting a category */}
        <div className="flex flex-col sm:flex-row mb-6 gap-2">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={toggleCategoriesVisibility}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            {showCategories ? (
              <>
                <FiEyeOff className="mr-1" />
                <span className="text-sm font-medium">Hide All Categories</span>
              </>
            ) : (
              <>
                <FiEye className="mr-1" />
                <span className="text-sm font-medium">Show All Categories</span>
              </>
            )}
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {categories.length > 0 ? (
              categories.map((category) => (
                <motion.div
                  key={category._id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 ${
                    category.visible && showCategories ? 'bg-gray-50' : 'bg-gray-100 opacity-70'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <span
                      className={`text-sm font-semibold ${
                        category.visible ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {category.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(category)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                    <button
                      onClick={() => toggleIndividualVisibility(category._id)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      {category.visible ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">No categories available.</p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};