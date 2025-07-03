import {
  FaUser,
  FaLock,
  FaSignInAlt,
  FaExclamationCircle,
  FaChevronDown,
  FaEye,
  FaEyeSlash,
  FaCheckCircle
} from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'admin'
  });
  const [errors, setErrors] = useState({ username: '', password: '', role: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRoleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const USERNAME_REGEX = /^[a-zA-Z0-9_-]{4,20}$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (submitError) setSubmitError('');
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({ ...prev, role }));
    setShowRoleDropdown(false);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setLoginSuccess(false);

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Invalid username or password');

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        if (formData.role === 'admin') {
          setLoginSuccess(true);
          setTimeout(() => navigate('/adminDashboard'), 1500);
        } else {
          navigate('/errorPage');
        }
      } catch (error) {
        setSubmitError(error.message || 'Login failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    return false;
  };

  const handleContextMenu = (e) => {
    if (e.target.type === 'password') e.preventDefault();
    return false;
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', password: '' };

    if (!USERNAME_REGEX.test(formData.username)) {
      newErrors.username = 'Username must be 4-20 characters with letters, numbers, _ or -';
      valid = false;
    }

    if (!PASSWORD_REGEX.test(formData.password)) {
      newErrors.password = 'Password must have uppercase, lowercase, number & special character';
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
          {loginSuccess && (
            <motion.div
              className="p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                <FaCheckCircle className="mr-2" />
                <p>Login successful! Redirecting...</p>
              </div>
            </motion.div>
          )}

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

          {/* Role Selector */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Login As</label>
            <button
              type="button"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 flex items-center justify-between"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaUser className="mr-2 text-blue-600" /> Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onPaste={handlePaste}
              className={`w-full px-4 py-2 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-600`}
              placeholder="Enter username"
              required
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FaExclamationCircle className="mr-1" /> {errors.username}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
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
                className={`w-full px-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-600 pr-10`}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FaExclamationCircle className="mr-1" /> {errors.password}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || loginSuccess}
            className="w-full py-2 px-4 rounded-md shadow-sm text-white bg-blue-600 hover:bg-orange-600 disabled:opacity-70"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            {isSubmitting ? "Signing in..." : (
              <><FaSignInAlt className="mr-2 inline-block" /> Sign In</>
            )}
          </motion.button>
        </form>

        <motion.div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            Don't have an account?{' '}
            <Link to="/contact-admin" className="font-medium text-blue-600 hover:text-blue-700">
              Contact admin
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
