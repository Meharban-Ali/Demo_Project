import { useState, useRef, useEffect } from 'react';
import { FiSend, FiX, FiMinimize2, FiMaximize2, FiMessageSquare, FiUser, FiMail, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

export const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: 'general',
    message: '',
    rating: null
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setFormData({
        name: '',
        email: '',
        feedbackType: 'general',
        message: '',
        rating: null
      });
    }, 2000);
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleForm = () => {
    setIsOpen(!isOpen);
    if (isOpen && isMinimized) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleForm}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
      >
        <FiMessageSquare size={24} />
      </button>
    );
  }

  return (
    <div
      ref={formRef}
      className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-xl overflow-hidden z-50 transition-all duration-300 ${isMinimized ? 'w-64 h-12' : 'w-80 h-auto'}`}
      style={{
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 flex justify-between items-center cursor-pointer" onClick={toggleMinimize}>
        <div className="flex items-center">
          <FiMessageSquare className="mr-2" />
          <span className="font-medium">Raviopedia Feedback</span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={(e) => {
            e.stopPropagation();
            toggleMinimize();
          }} className="hover:bg-blue-500 p-1 rounded">
            {isMinimized ? <FiMaximize2 size={16} /> : <FiMinimize2 size={16} />}
          </button>
          <button onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }} className="hover:bg-blue-500 p-1 rounded">
            <FiX size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="p-4 animate-fadeIn">
          {submitted ? (
            <div className="text-center py-6">
              <div className="text-green-500 text-4xl mb-2">✓</div>
              <h3 className="text-lg font-medium text-gray-800">Thank You!</h3>
              <p className="text-gray-600 mt-1">Your feedback has been submitted.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiUser className="mr-2" /> Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiMail className="mr-2" /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email (optional)"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Type</label>
                <select
                  name="feedbackType"
                  value={formData.feedbackType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">General Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="content">Content Issue</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">How would you rate your experience?</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className={`p-2 rounded-full ${formData.rating >= star ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}
                    >
                      {star <= 3 ? <FiThumbsDown size={18} /> : <FiThumbsUp size={18} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your thoughts..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-300"
              >
                <FiSend className="mr-2" /> Submit Feedback
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
