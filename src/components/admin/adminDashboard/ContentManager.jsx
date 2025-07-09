import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiUpload, FiPlus, FiX, FiArrowLeft, FiCheckCircle, FiPlay } from 'react-icons/fi';
import { FaNewspaper, FaVideo, FaFileAlt, FaMusic } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const ContentManager = () => {
  // Navigation hook
  const navigate = useNavigate();

  // State for active tab (blogs, news, video, audio)
  const [activeTab, setActiveTab] = useState('blogs');
  
  // State for content items
  const [content, setContent] = useState([]);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Modal visibility state
  const [showModal, setShowModal] = useState(false);
  
  // ID of item being edited
  const [editingId, setEditingId] = useState(null);
  
  // Form data state (updated for multiple files)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: 'blog', // Default to blog
    files: [],    // Array for multiple files
    fileUrls: [], // Array for multiple file URLs
    writers: []   // Array for writers
  });

  // Mobile detection state
  const [isMobile, setIsMobile] = useState(false);
  
  // Categories state
  const [categories, setCategories] = useState([]);
  
  // Delete confirmation dialog state
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // Upload confirmation dialog state
  const [showUploadConfirmation, setShowUploadConfirmation] = useState(false);
  
  // Success message state
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Currently playing media item
  const [playingItem, setPlayingItem] = useState(null);
  
  // File validation error state
  const [fileError, setFileError] = useState('');

  // Count content by type
  const contentCounts = {
    blogs: Array.isArray(content) ? content.filter(item => item?.type === 'blog').length : 0,
    news: Array.isArray(content) ? content.filter(item => item?.type === 'news').length : 0,
    video: Array.isArray(content) ? content.filter(item => item?.type === 'video').length : 0,
    audio: Array.isArray(content) ? content.filter(item => item?.type === 'audio').length : 0
  };

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://raviopedia.in';
  // Effect for mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Effect to fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Effect to fetch content
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
         const response = await fetch(`${API_BASE_URL}/api/content`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const contentData = data.data || data.content || (Array.isArray(data) ? data : [data].filter(Boolean));
        setContent(Array.isArray(contentData) ? contentData : [contentData]);
      } catch (err) {
        console.error('Error fetching content:', err);
        setContent([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  /**
   * Validates a single file (for writer photos)
   * @param {File} file - The file to validate
   * @param {string} type - Content type (blog, news, video, audio)
   * @returns {string} Error message if validation fails, empty string if valid
   */
  const validateFile = (file, type) => {
    if (!file) return 'No file selected';

    const validTypes = {
      blog: { 
        mime: ['image/jpeg', 'image/png', 'image/webp'],
        ext: ['jpg', 'jpeg', 'png', 'webp'],
        maxSize: 100 * 1024 * 1024 // 100MB
      },
      news: { 
        mime: ['image/jpeg', 'image/png', 'image/webp'],
        ext: ['jpg', 'jpeg', 'png', 'webp'],
        maxSize: 100 * 1024 * 1024 // 100MB
      },
      video: {
        mime: ['video/mp4', 'video/webm'],
        ext: ['mp4', 'webm'],
        maxSize: 100 * 1024 * 1024 // 100MB
      },
      audio: {
        mime: ['audio/mpeg', 'audio/wav'],
        ext: ['mp3', 'wav'],
        maxSize: 100 * 1024 * 1024 // 100MB
      }
    };

    const allowed = validTypes[type] || validTypes.blog;
    const fileExt = file.name.split('.').pop().toLowerCase();
    
    // Check MIME type
    if (!allowed.mime.includes(file.type)) {
      return `Invalid file type (${file.name}). Only ${allowed.ext.join(', ')} are allowed`;
    }

    // Check file extension
    if (!allowed.ext.includes(fileExt)) {
      return `Invalid file extension (${file.name}). Only ${allowed.ext.join(', ')} are allowed`;
    }

    // Check file size
    if (file.size > allowed.maxSize) {
      return `File size (${file.name}) should not exceed ${Math.floor(allowed.maxSize/(1024*1024))}MB`;
    }

    return '';
  };

  /**
   * Validates multiple files based on content type
   * @param {Array} files - Array of File objects
   * @param {string} type - Content type (blog, news, video, audio)
   * @returns {string} Error message if validation fails, empty string if valid
   */
  const validateFiles = (files, type) => {
    if (!files || files.length === 0) {
      return 'कृपया कम से कम एक फाइल चुनें | Please select at least one file';
    }

    if (files.length > 5) {
      return 'आप अधिकतम 5 फाइलें अपलोड कर सकते हैं | You can upload maximum 5 files';
    }

    const validTypes = {
      blog: { 
        mime: ['image/jpeg', 'image/png', 'image/webp'],
        ext: ['jpg', 'jpeg', 'png', 'webp'],
        maxSize: 100 * 1024 * 1024, // 100MB
        maxCount: 5
      },
      news: { 
        mime: ['image/jpeg', 'image/png', 'image/webp'],
        ext: ['jpg', 'jpeg', 'png', 'webp'],
        maxSize: 100 * 1024 * 1024, // 100MB
        maxCount: 5
      },
      video: {
        mime: ['video/mp4', 'video/webm'],
        ext: ['mp4', 'webm'],
        maxSize: 100 * 1024 * 1024, // 100MB
        maxCount: 1
      },
      audio: {
        mime: ['audio/mpeg', 'audio/wav'],
        ext: ['mp3', 'wav'],
        maxSize: 100 * 1024 * 1024, // 100MB
        maxCount: 1
      }
    };

    const allowed = validTypes[type] || validTypes.blog;

    // Check if number of files exceeds allowed count
    if (files.length > allowed.maxCount) {
      return `आप अधिकतम ${allowed.maxCount} फाइलें अपलोड कर सकते हैं | You can upload maximum ${allowed.maxCount} files`;
    }

    // Validate each file
    for (const file of files) {
      const fileExt = file.name.split('.').pop().toLowerCase();
      
      // Check MIME type
      if (!allowed.mime.includes(file.type)) {
        return `अमान्य फाइल प्रकार (${file.name}) | Invalid file type (${file.name}). केवल ${allowed.ext.join(', ')} स्वीकार्य हैं | Only ${allowed.ext.join(', ')} are allowed`;
      }

      // Check file extension
      if (!allowed.ext.includes(fileExt)) {
        return `अमान्य फाइल एक्सटेंशन (${file.name}) | Invalid file extension (${file.name}). केवल ${allowed.ext.join(', ')} स्वीकार्य हैं | Only ${allowed.ext.join(', ')} are allowed`;
      }

      // Check file size
      if (file.size > allowed.maxSize) {
        return `फाइल का आकार (${file.name}) ${Math.floor(allowed.maxSize/(1024*1024))}MB से अधिक नहीं होना चाहिए | File size (${file.name}) should not exceed ${Math.floor(allowed.maxSize/(1024*1024))}MB`;
      }
    }

    return '';
  };

  /**
   * Handles input changes for all form fields
   * @param {Object} e - Event object
   */
const handleInputChange = (e) => {
  const { name, value, type, files } = e.target;

  if (type === 'file') {
    if (name === 'files') {
      // 📦 Main content file upload (image/audio/video)
      const fileList = Array.from(files); // ✅ convert to array
      if (fileList.length > 0) {
        setFormData(prev => ({
          ...prev,
          files: fileList, // ✅ must be an array for backend
          fileUrls: fileList.map(file => URL.createObjectURL(file)) // ✅ support multiple previews if needed
        }));
      }
    } else if (name.startsWith('writers[') && name.endsWith('][photo]')) {
      // 🖼 Writer photo upload
      const indexMatch = name.match(/\[(\d+)\]/);
      if (indexMatch) {
        const index = parseInt(indexMatch[1]);
        const updatedWriters = [...formData.writers];
        if (!updatedWriters[index]) updatedWriters[index] = { name: '', role: '' };

        const photoFile = files[0];
        updatedWriters[index].photoFile = photoFile;
        updatedWriters[index].photoUrl = photoFile ? URL.createObjectURL(photoFile) : '';

        setFormData(prev => ({
          ...prev,
          writers: updatedWriters
        }));
      }
    }
  } else {
    // Text, select, etc.
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
};


  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target;
    
  //   // Handle file input
  //   if (name === 'files') {
  //     const selectedFiles = Array.from(files || []);
  //     if (selectedFiles.length > 0) {
  //       const error = validateFiles(selectedFiles, formData.type);
  //       setFileError(error);
  //       if (!error) {
  //         setFormData(prev => ({ 
  //           ...prev, 
  //           files: selectedFiles,
  //           fileUrls: selectedFiles.map(file => URL.createObjectURL(file))
  //         }));
  //       }
  //     } else {
  //       // Clear files when no selection
  //       setFormData(prev => ({ ...prev, files: [], fileUrls: [] }));
  //       setFileError('');
  //     }
  //   } 
  //   // Handle type change (resets files)
  //   else if (name === 'type') {
  //     setFormData(prev => ({
  //       ...prev,
  //       [name]: value,
  //       files: [],
  //       fileUrls: [],
  //     }));
  //     setFileError('');
  //   } 
  //   // Handle all other inputs
  //   else {
  //     setFormData(prev => ({ ...prev, [name]: value }));
  //   }
  // };

  /**
   * Handles changes in writer fields
   * @param {number} index - Writer index
   * @param {string} field - Field name (name/role)
   * @param {string} value - New value
   */
  const handleWriterChange = (index, field, value) => {
    const updatedWriters = [...formData.writers];
    updatedWriters[index] = { ...updatedWriters[index], [field]: value };
    setFormData(prev => ({ ...prev, writers: updatedWriters }));
  };

  /**
   * Handles writer photo file changes
   * @param {number} index - Writer index
   * @param {Object} e - Event object
   */
  const handleWriterFileChange = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const error = validateFile(file, formData.type);
      if (error) {
        setFileError(`Writer ${index + 1} image: ${error}`);
        return;
      }
      
      const updatedWriters = [...formData.writers];
      updatedWriters[index] = {
        ...updatedWriters[index],
        photoFile: file,
        photoUrl: URL.createObjectURL(file)
      };
      setFormData(prev => ({ ...prev, writers: updatedWriters }));
      setFileError('');
    }
  };

  /**
   * Adds a new writer to the form
   */
  const addWriter = () => {
    if (formData.writers.length < 4) {
      setFormData(prev => ({
        ...prev,
        writers: [...prev.writers, { name: '', role: '', photoFile: null, photoUrl: '' }]
      }));
    }
  };

  /**
   * Removes a writer from the form
   * @param {number} index - Index of writer to remove
   */
  const removeWriter = (index) => {
    const updatedWriters = formData.writers.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, writers: updatedWriters }));
  };

  /**
   * Resets the form to initial state
   */
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      type: activeTab === 'video' ? 'video' : 
            activeTab === 'audio' ? 'audio' : 
            activeTab === 'news' ? 'news' : 'blog',
      files: [],
      fileUrls: [],
      writers: []
    });
    setFileError('');
  };

  /**
   * Handles form submission with improved file validation
   * @param {Object} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title.trim()) {
      setFileError('शीर्षक आवश्यक है | Title is required');
      return;
    }

    if (!formData.description.trim()) {
      setFileError('विवरण आवश्यक है | Description is required');
      return;
    }

    if (!formData.category) {
      setFileError('कृपया एक श्रेणी चुनें | Please select a category');
      return;
    }

    // Improved file validation logic
    const isEditMode = !!editingId;
    const requiresNewFile = !isEditMode && formData.type !== 'blog';
    const hasExistingFiles = formData.fileUrls.length > 0;
    const hasNewFiles = formData.files.length > 0;
    
    if (requiresNewFile && !hasNewFiles) {
      let fileTypeName = 'फाइल | file';
      switch(formData.type) {
        case 'blog':
        case 'news':
          fileTypeName = 'इमेज | image';
          break;
        case 'video':
          fileTypeName = 'वीडियो | video';
          break;
        case 'audio':
          fileTypeName = 'ऑडियो | audio';
          break;
      }
      setFileError(`कृपया कम से कम एक ${fileTypeName} चुनें | Please select at least one ${fileTypeName.split('|')[1].trim()}`);
      return;
    }

    // Additional check for edit mode - either existing or new files required
    if (isEditMode && !hasExistingFiles && !hasNewFiles && formData.type !== 'blog') {
      setFileError('कृपया फाइल अपडेट करें या मौजूदा फाइल को रखें | Please update file or keep existing file');
      return;
    }

    // Show upload confirmation dialog
    setShowUploadConfirmation(true);
  };

  /**
   * Prepares form for editing an existing item
   * @param {Object} item - Content item to edit
   */
  const handleEdit = (item) => {
    if (!item || typeof item !== 'object') {
      console.error('Invalid item provided for editing');
      return;
    }
    
    setEditingId(item._id);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      category: item.category?._id || item.category || '',
      type: item.type || 'blog',
      files: [],
      fileUrls: Array.isArray(item.urls) ? item.urls : [item.url || item.fileUrl || ''],
      writers: item.writers || []
    });
    setFileError('');
    setShowModal(true);
  };

  /**
   * Prepares form for adding new content
   */
  const handleAddNewContent = () => {
    setEditingId(null);
    resetForm();
    setShowModal(true);
  };

  /**
   * Initiates delete process
   * @param {string} id - ID of item to delete
   */
  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowDeleteConfirmation(true);
  };

  /**
   * Confirms and executes content deletion
   */
  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/content/${itemToDelete}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete content');

      setContent(prev => prev.filter(item => item._id !== itemToDelete));
      showSuccess('Content deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      setFileError('Failed to delete content');
    } finally {
      setIsLoading(false);
      setShowDeleteConfirmation(false);
      setItemToDelete(null);
    }
  };

  /**
   * Shows success message
   * @param {string} message - Success message to display
   */
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setSuccessMessage('');
    }, 3000);
  };

  /**
   * Handles the actual file upload process with improved validation
   */
const confirmUpload = async () => {
  setShowUploadConfirmation(false);
  setIsLoading(true);
  setFileError('');

  try {
    const isEditMode = !!editingId;
    const hasNewFiles =
      Array.isArray(formData.files) && formData.files.length > 0;

    const form = new FormData();

    form.append('title', formData.title.trim());
    form.append('description', formData.description.trim());
    form.append('category', formData.category);
    form.append('type', formData.type);

    // ✅ FIXED: Handle single File or multiple Files
    if (formData.files) {
      if (Array.isArray(formData.files)) {
        formData.files.forEach(file => {
          if (file instanceof File) {
            form.append('files', file);
          }
        });
      } else if (formData.files instanceof File) {
        form.append('files', formData.files);
      }
    }

    // ✅ Append writers info as JSON
    const writerMeta = formData.writers.map(writer => ({
      name: writer.name,
      role: writer.role
    }));
    form.append('writersInfo', JSON.stringify(writerMeta));

    // ✅ Append writer photo files
    formData.writers.forEach((writer, index) => {
      if (writer.photoFile instanceof File) {
        form.append(`writers[${index}][photo]`, writer.photoFile);
      }
    });

    // ✅ existing files in edit mode
    if (isEditMode && formData.fileUrls.length > 0) {
      form.append('existingFileUrls', formData.fileUrls.join(','));
    }

    // 🛰 Upload
    const response = await fetch(
      `${API_BASE_URL}/api/content${isEditMode ? `/${editingId}` : ''}?type=${formData.type}`,
      {
        method: isEditMode ? 'PUT' : 'POST',
        body: form
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Upload failed');
    }

    const result = await response.json();
    showSuccess(isEditMode ? 'Content updated successfully' : 'Content uploaded successfully');
    setShowModal(false);
    resetForm();

  } catch (error) {
    console.error("Upload error:", error);
    setFileError(error.message);
  } finally {
    setIsLoading(false);
  }

  console.log('📦 Main files:', formData.files);
};


  /**
   * Filters content based on active tab
   */
  const filteredContent = (() => {
    if (!Array.isArray(content)) return [];
    
    return content.filter((item) => {
      if (!item || typeof item !== 'object') return false;
      if (activeTab === 'blogs') return item.type === 'blog';
      return item.type === activeTab;
    });
  })();

  /**
   * Gets appropriate icon for content type
   * @param {string} type - Content type
   * @returns {JSX.Element} Icon component
   */
  const getIconForType = (type) => {
    switch (type) {
      case 'blog': return <FaFileAlt />;
      case 'video': return <FaVideo />;
      case 'news': return <FaNewspaper />;
      case 'audio': return <FaMusic />;
      default: return null;
    }
  };

  /**
   * Navigates back to admin dashboard
   */
  const handleBackToDashboard = () => {
    navigate('/adminDashboard');
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {showSuccessMessage && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center z-50"
        >
          <FiCheckCircle className="mr-2" />
          {successMessage}
        </motion.div>
      )}

      <div className="w-full max-w-4xl mx-auto">
        <div className="w-full mb-4">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            <span className="font-medium">Back to Admin Dashboard</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow p-4 md:p-6 w-full"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Manage Content</h2>
            <button
              onClick={handleAddNewContent}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <FiPlus className="mr-2" />
              Add New Content
            </button>
          </div>

          <div className="flex space-x-4 mb-6">
            {['blogs', 'news', 'video', 'audio'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-md transition-colors ${
                  activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {tab === 'blogs' && <FaFileAlt className="mr-2" />}
                {tab === 'news' && <FaNewspaper className="mr-2" />}
                {tab === 'video' && <FaVideo className="mr-2" />}
                {tab === 'audio' && <FaMusic className="mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)} ({contentCounts[tab]})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddNewContent}
            >
              <div className="p-6 text-center">
                <FiPlus className="mx-auto text-3xl text-gray-400 mb-2" />
                <p className="text-gray-600">Add {activeTab === 'video' ? 'Video' : 
                 activeTab === 'audio' ? 'Audio' : 
                 activeTab === 'news' ? 'News' : 'Blog'}</p>
              </div>
            </motion.div>

            {isLoading ? (
              <div className="col-span-full flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredContent.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-8">
                No content found. Add some content to get started.
              </div>
            ) : (
              filteredContent.map((item) => (
                <motion.div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="relative">
                    {item.url && (
                      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                        {item.type === 'video' ? (
                          <video className="w-full h-full object-cover">
                            <source src={`${API_BASE_URL}${item.url}`} type="video/mp4" />
                          </video>
                        ) : item.type === 'audio' ? (
                          <div className="w-full p-4">
                            <audio controls className="w-full">
                              <source src={`${API_BASE_URL}${item.url}`} type="audio/mpeg" />
                            </audio>
                          </div>
                        ) : (
                          <div className="image-section p-2 bg-gray-50">
                            {item.type === 'blog' || item.type === 'news' ? (
                              <img
                                src={`${API_BASE_URL}${item.url}`}
                                alt={item.title}
                                className="w-full h-40 object-cover rounded"
                              />
                            ) : null}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-blue-600 mr-2">
                        {getIconForType(item.type)}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-800 truncate">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    {item.category && (
                      <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {typeof item.category === 'object' ? item.category.name : item.category}
                      </span>
                    )}
                    {item.writers && item.writers.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Writers:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.writers.map((writer, index) => (
                            <span key={index} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {writer.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 text-blue-600"
                      title="Edit"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 text-red-600"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-96 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 p-1"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingId ? 'Edit Content' : 'Add Content'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 mb-1">Content Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="blog">Blog</option>
                  <option value="news">News</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Upload File</label>
                <div className="flex items-center">
                  <label className="flex flex-col items-center px-4 py-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <FiUpload className="text-gray-600" />
                    <span className="mt-1 text-sm text-gray-600">
                      {formData.files ? formData.files.name : 'Choose file'}
                    </span>
                    <input
                        type="file"
                        name="files"
                        onChange={handleInputChange}
                        accept={
                          formData.type === 'video'
                            ? 'video/mp4,video/webm'
                            : formData.type === 'audio'
                            ? 'audio/mpeg,audio/mp3,audio/wav'
                            : 'image/jpeg,image/png,image/webp,image/gif'
                        }
                        multiple={formData.type === 'blog' || formData.type === 'news'}
                      />

                  </label>
                </div>
                {fileError && (
                  <p className="text-red-500 text-sm mt-1">{fileError}</p>
                )}
                {formData.fileUrls && (
                  <div className="mt-2">
                    {formData.type === 'video' ? (
                      <video controls className="w-full mt-2 rounded" style={{ maxHeight: '150px' }}>
                        <source src={formData.fileUrls} type="video/mp4" />
                      </video>
                    ) : formData.type === 'audio' ? (
                      <audio controls className="w-full mt-2">
                        <source src={formData.fileUrls} type="audio/mpeg" />
                      </audio>
                    ) : (
                      <div className="image-preview-section mt-4 p-2 border rounded bg-gray-50">
                        <img
                          src={formData.fileUrls}
                          alt="Preview"
                          className="w-full mt-2 rounded"
                          style={{ maxHeight: '150px' }}
                        />
                      </div>
                    )}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {formData.type === 'video'
                    ? 'Allowed: MP4, WEBM (Max 10MB)'
                    : formData.type === 'audio'
                    ? 'Allowed: MP3, WAV (Max 10MB)'
                    : 'Allowed: JPG, PNG, GIF, WEBP (Max 10MB)'}
                </p>
              </div>

              {/* Writers Section */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700">Writers</label>
                  {formData.writers.length < 4 && (
                    <button
                      type="button"
                      onClick={addWriter}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <FiPlus className="mr-1" /> Add Writer
                    </button>
                  )}
                </div>
                
                {formData.writers.map((writer, index) => (
                  <div key={index} className="mb-4 p-3 border rounded-lg relative">
                    <button
                      type="button"
                      onClick={() => removeWriter(index)}
                      className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
                      title="Remove writer"
                    >
                      <FiX size={16} />
                    </button>
                    
                    <div className="mb-2">
                      <label className="block text-sm text-gray-600 mb-1">Writer Name</label>
                      <input
                        type="text"
                        value={writer.name}
                        onChange={(e) => handleWriterChange(index, 'name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Writer name"
                      />
                    </div>
                    
                    <div className="mb-2">
                      <label className="block text-sm text-gray-600 mb-1">Role</label>
                      <input
                        type="text"
                        value={writer.role}
                        onChange={(e) => handleWriterChange(index, 'role', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Writer role (optional)"
                      />
                    </div>
                    
                    <div className="mb-2">
                      <label className="block text-sm text-gray-600 mb-1">Photo</label>
                      <div className="flex items-center">
                        <label className="flex flex-col items-center px-3 py-1 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 text-xs">
                          <FiUpload className="text-gray-600" />
                          <span className="mt-1 text-gray-600">
                            {writer.photoFile ? writer.photoFile.name : 'Choose photo'}
                          </span>
                          <input 
                            type="file" 
                            onChange={(e) => handleWriterFileChange(index, e)}
                            className="hidden"
                            accept="image/jpeg,image/png,image/webp"
                          />
                        </label>
                      </div>
                      {writer.photoUrl && (
                        <div className="mt-2">
                          <img
                            src={writer.photoUrl}
                            alt="Writer preview"
                            className="w-16 h-16 object-cover rounded-full border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors mb-4"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : editingId ? 'Update Content' : 'Add Content'}
              </button>
            </form>
          </div>
        </motion.div>
      )}

      {showUploadConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Upload
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to {editingId ? 'update' : 'upload'} this content?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowUploadConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Yes, Upload'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {showDeleteConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-4">This action cannot be undone. Are you sure?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};