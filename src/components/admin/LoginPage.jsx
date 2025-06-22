import { FaUser, FaLock, FaSignInAlt, FaExclamationCircle, FaChevronDown, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'admin' // Default role
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // New state for success message
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRoleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Strong validation patterns
  const USERNAME_REGEX = /^[a-zA-Z0-9_-]{4,20}$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear submit error when user types
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
    setShowRoleDropdown(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(''); // Clear previous errors
    setLoginSuccess(false); // Clear previous success
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
  
        const data = await response.json();
        
        if (!response.ok) {
          // Show specific error message from server or default message
          throw new Error(data.message || 'Invalid username or password');
        }
  
        // Save token and redirect
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Show success message for admin before redirect
        if (formData.role === 'admin') {
          setLoginSuccess(true);
          setTimeout(() => {
            navigate('/adminDashboard');
          }, 1500); // Redirect after 1.5 seconds
        } else {
          navigate('/errorPage');
        }
      } catch (error) {
        // Set the error message to be displayed
        setSubmitError(error.message || 'Login failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Prevent paste and inspect element manipulation
  const handlePaste = (e) => {
    e.preventDefault();
    return false;
  };

  const handleContextMenu = (e) => {
    if (e.target.type === 'password') {
      e.preventDefault();
    }
    return false;
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', password: '' };

    if (!USERNAME_REGEX.test(formData.username)) {
      newErrors.username = 'Username must be 4-20 characters and can only contain letters, numbers, underscores, or hyphens';
      valid = false;
    }

    if (!PASSWORD_REGEX.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
      style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-white bg-opacity-90 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-center mb-6 md:mb-8">
          <motion.h1 
            className="text-2xl md:text-3xl font-bold text-blue-600 flex items-center justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <FaSignInAlt className="mr-2" /> Login Portal
          </motion.h1>
          <motion.p 
            className="text-gray-600 mt-2 text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            Enter your credentials to access dashboard
          </motion.p>
        </div>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} noValidate>
          {/* Success Message Display */}
          {loginSuccess && (
            <motion.div
              className="p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center">
                <FaCheckCircle className="mr-2" />
                <p>Login successful! Redirecting to admin dashboard...</p>
              </div>
            </motion.div>
          )}

          {/* Error Message Display */}
          {submitError && (
            <motion.div
              className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                <FaExclamationCircle className="mr-2" />
                <p>{submitError}</p>
              </div>
            </motion.div>
          )}

          {/* Rest of the form remains the same */}
          {/* Role Selection Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login As
            </label>
            <button
              type="button"
              className="w-full px-4 py-2 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all flex items-center justify-between"
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            >
              <span className="capitalize">{formData.role}</span>
              <motion.div
                animate={{ rotate: showRoleDropdown ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaChevronDown className="text-gray-500" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {showRoleDropdown && (
                <motion.div
                  className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    type="button"
                    className={`w-full text-left px-4 py-2 hover:bg-indigo-50 ${formData.role === 'user' ? 'bg-indigo-100 text-blue-600' : ''}`}
                    onClick={() => handleRoleSelect('user')}
                  >
                    User
                  </button>
                  <button
                    type="button"
                    className={`w-full text-left px-4 py-2 hover:bg-indigo-50 ${formData.role === 'admin' ? 'bg-indigo-100 text-blue-600' : ''}`}
                    onClick={() => handleRoleSelect('admin')}
                  >
                    Admin
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Username Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaUser className="mr-2 text-blue-600" /> Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onPaste={handlePaste}
              className={`w-full px-4 py-2 md:py-3 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all`}
              placeholder="Enter username"
              pattern="[a-zA-Z0-9_-]{4,20}"
              required
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FaExclamationCircle className="mr-1" /> {errors.username}
              </p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 1.0 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaLock className="mr-2 text-blue-600" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onPaste={handlePaste}
                onContextMenu={handleContextMenu}
                className={`w-full px-4 py-2 md:py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all pr-10`}
                placeholder="Enter password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FaExclamationCircle className="mr-1" /> {errors.password}
              </p>
            )}
          </motion.div>

          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgetpassword" className="font-medium text-blue-600 hover:text-indigo-500">
                Forgot password?
              </Link>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSubmitting || loginSuccess}
            className="w-full flex justify-center items-center py-2 md:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.4 }}
          >
            {isSubmitting ? (
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Signing in...
              </motion.span>
            ) : (
              <>
                <FaSignInAlt className="mr-2" /> Sign In
              </>
            )}
          </motion.button>
        </form>

        <motion.div 
          className="mt-4 md:mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.6 }}
        >
          <p className="text-xs md:text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/contact-admin" className="font-medium text-blue-600 hover:text-blue-600">
              Contact admin
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};