import { motion } from 'framer-motion';
import { FiBell, FiUser } from 'react-icons/fi';

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="fixed top-0 right-0 left-64 bg-white shadow-sm z-10"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FiBell className="text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <FiUser />
            </div>
            <span className="text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
