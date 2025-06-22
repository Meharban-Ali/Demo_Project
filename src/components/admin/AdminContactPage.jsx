import { useState } from 'react';
import { FaUser, FaEnvelope, FaComment, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const AdminContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Add your contact API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessageSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md">
        <Link to="/login" className="flex items-center text-indigo-600 mb-4">
          <FaArrowLeft className="mr-2" /> Back to Login
        </Link>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Contact Admin</h2>
        <p className="text-gray-600 mb-6">Fill the form below to request account access</p>
        
        {messageSent ? (
          <div className="p-4 bg-green-50 text-green-700 rounded-lg">
            Your message has been sent successfully. We'll contact you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaUser className="mr-2 text-indigo-600" /> Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Enter your name"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Similar fields for email and message */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};