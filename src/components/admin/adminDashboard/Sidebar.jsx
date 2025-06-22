import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiFolder, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { FaNewspaper } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Sidebar = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();


  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/adminDashboard' },
    { name: 'Categories', icon: FiFolder, path: '/category' },
    { name: 'Content', icon: FaNewspaper, path: '/content' },
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [logoutMessage, setLogoutMessage] = useState('');
  const handleLogoutClick = async () => {
    try {
      if (typeof handleLogout === 'function') {
        await handleLogout();
      }
  
      // Set temporary logout message
      setLogoutMessage('✅ Admin logout successful!');
  
      // Show toast
      toast.success('✅ Admin logout successful!', {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });
  
      // Navigate after delay
      setTimeout(() => {
        setLogoutMessage(''); // Message हटाएं
        navigate('/login');
      }, 1500);
  
      if (isMobile) {
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };
  
  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.button
          onClick={toggleSidebar}
          className="fixed z-30 top-4 left-4 p-2 rounded-md bg-blue-600 text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiMenu size={24} />
        </motion.button>
      )}

      {/* Desktop Toggle Buttons */}
      {!isMobile && isOpen && (
        <motion.button
          onClick={toggleSidebar}
          className="fixed z-30 top-4 left-64 p-2 rounded-r-md bg-blue-600 text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiX size={20} />
        </motion.button>
      )}
      {!isMobile && !isOpen && (
        <motion.button
          onClick={toggleSidebar}
          className="fixed z-30 top-4 left-4 p-2 rounded-md bg-blue-600 text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiMenu size={20} />
        </motion.button>
      )}
<AnimatePresence>
  {logoutMessage && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-5 py-3 rounded-lg shadow-lg z-50"
    >
      {logoutMessage}
    </motion.div>
  )}
</AnimatePresence>

      {/* Sidebar Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0, width: isMobile ? '80%' : '16rem' }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-blue-700 to-blue-600 shadow-lg z-20 ${isMobile ? 'w-4/5' : 'w-64'}`}
          >
            <div className="flex flex-col h-full p-4 text-white">
              <div className="flex items-center justify-between py-6 px-2">
                <motion.h1 
                  className="text-2xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  News Admin
                </motion.h1>
                {isMobile && (
                  <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-blue-700">
                    <FiX size={20} />
                  </button>
                )}
              </div>
              
              <nav className="flex-1 mt-6">
                <ul>
                  {menuItems.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1, transition: { delay: 0.1 * index } }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mb-2"
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-900' : 'hover:bg-blue-700'}`
                        }
                        onClick={() => isMobile && setIsOpen(false)}
                      >
                        <item.icon className="mr-3" />
                        {item.name}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogoutClick}
                className="flex items-center p-3 mt-auto rounded-lg hover:bg-orange-700 bg-orange-600 transition-colors"
              >
                <FiLogOut className="mr-3" />
                Logout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};