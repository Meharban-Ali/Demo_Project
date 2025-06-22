import { useState, useEffect } from 'react';
import { FaLock, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

 export const UnauthorizedAccess = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowMessage(false);
          // Redirect to login page or home page
          window.location.href = '/login';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="bg-red-500 p-4 flex items-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FaLock className="text-white text-3xl" />
              </motion.div>
              <h2 className="ml-3 text-white text-xl font-bold">Unauthorized Access Detected</h2>
            </div>

            <div className="p-6">
              <div className="flex items-start mb-4">
                <FaExclamationTriangle className="text-red-500 text-2xl mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Access Denied
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    You don't have permission to access this page. Please login with valid credentials.
                  </p>
                </div>
              </div>

              <div className="flex items-center bg-yellow-50 dark:bg-gray-700 p-3 rounded-lg mb-4">
                <FaShieldAlt className="text-yellow-500 text-xl mr-3" />
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  Unauthorized access attempts are logged for security purposes.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg flex items-center justify-between"
              >
                <span className="text-blue-600 dark:text-blue-300">
                  Redirecting in {countdown} seconds...
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <svg
                    className="animate-spin h-5 w-5 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
