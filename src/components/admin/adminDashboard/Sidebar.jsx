import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiFolder, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { FaNewspaper } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Sidebar = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false); // Start closed on mobile
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
      // On desktop, open by default; on mobile, closed by default
      setIsOpen(!mobile);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = async () => {
    try {
      if (typeof handleLogout === 'function') {
        await handleLogout();
      }
      
      toast.success('✅ Admin logout successful!', {
        position: "top-right",
        autoClose: 3000,
      });
      
      setTimeout(() => navigate('/login'), 1500);
      if (isMobile) setIsOpen(false);
      
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <>
      {/* Single Toggle Button - Always visible on mobile */}
      <motion.button
        onClick={toggleSidebar}
        className={`fixed z-30 top-4 left-4 p-2 rounded-md bg-blue-600 text-white shadow-lg ${
          isOpen && isMobile ? 'left-64' : 'left-4'
        } transition-all duration-300`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </motion.button>

      {/* Sidebar Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Overlay */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-20"
                onClick={toggleSidebar}
              />
            )}

            <motion.div
              initial={{ x: isMobile ? -300 : 0 }}
              animate={{ x: 0 }}
              exit={{ x: isMobile ? -300 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-700 to-blue-600 shadow-lg z-30 ${
                !isMobile ? 'translate-x-0' : ''
              }`}
            >
              <div className="flex flex-col h-full p-4 text-white">
                <div className="flex items-center justify-between py-6 px-2 border-b border-blue-600">
                  <h1 className="text-2xl font-bold">News Admin</h1>
                  {isMobile && (
                    <button 
                      onClick={toggleSidebar}
                      className="p-1 rounded-full hover:bg-blue-700"
                    >
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
                        animate={{ 
                          x: 0, 
                          opacity: 1, 
                          transition: { delay: 0.1 * index } 
                        }}
                        whileHover={{ scale: 1.02 }}
                        className="mb-2"
                      >
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg ${
                              isActive ? 'bg-blue-800' : 'hover:bg-blue-700'
                            }`
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
                  whileHover={{ scale: 1.02 }}
                  onClick={handleLogoutClick}
                  className="flex items-center p-3 mt-auto mb-4 rounded-lg bg-orange-600 hover:bg-orange-700"
                >
                  <FiLogOut className="mr-3" />
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};