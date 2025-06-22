import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaVideo, FaFileAlt, FaChartLine, FaMusic, FaUsers } from 'react-icons/fa';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';

export const DashboardStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use direct URL or environment variable
        const apiUrl = 'http://localhost:5000'; 
        // Alternative: const apiUrl = process.env.REACT_APP_API_BASE_URL;

        const res = await axios.get(`${apiUrl}/api/dashboard/stats`, {
          timeout: 30000, // 10 second timeout
          headers: {
            'Content-Type': 'application/json',
            ...(localStorage.getItem('token') && {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
          }
        });

        if (!res || res.status !== 200) {
          throw new Error(`API request failed with status ${res?.status}`);
        }

        const data = res.data;

        if (!data || typeof data !== 'object') {
          throw new Error("Invalid data format from API");
        }

        const dynamicStats = [
          {
            title: 'Total Contents',
            value: data.totalContents || 0,
            icon: FaFileAlt,
            color: 'text-green-500',
            bg: 'bg-green-50',
            trend: data.recentGrowth > 0 ? 'up' : data.recentGrowth < 0 ? 'down' : 'neutral',
          },
          {
            title: 'Blogs',
            value: data.blogs || 0,
            icon: FaFileAlt,
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            trend: data.blogGrowth > 0 ? 'up' : data.blogGrowth < 0 ? 'down' : 'neutral',
          },
          {
            title: 'Videos',
            value: data.videos || 0,
            icon: FaVideo,
            color: 'text-red-500',
            bg: 'bg-red-50',
            trend: data.videoGrowth > 0 ? 'up' : data.videoGrowth < 0 ? 'down' : 'neutral',
          },
          {
            title: 'News',
            value: data.news || 0,
            icon: FaNewspaper,
            color: 'text-yellow-500',
            bg: 'bg-yellow-50',
            trend: data.newsGrowth > 0 ? 'up' : data.newsGrowth < 0 ? 'down' : 'neutral',
          },
          {
            title: 'Monthly Views',
            value: data.monthlyViews || 0,
            icon: FaChartLine,
            color: 'text-purple-500',
            bg: 'bg-purple-50',
            trend: data.viewGrowth > 0 ? 'up' : data.viewGrowth < 0 ? 'down' : 'neutral',
          },
          {
            title: 'Total Users',
            value: data.totalUsers || 0,
            icon: FaUsers,
            color: 'text-indigo-500',
            bg: 'bg-indigo-50',
            trend: data.userGrowth > 0 ? 'up' : data.userGrowth < 0 ? 'down' : 'neutral',
          },
        ];

        setStats(dynamicStats);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        
        let errorMessage = "Failed to fetch dashboard data. Please try again.";
        
        if (err.response) {
          if (err.response.status === 404) {
            errorMessage = "API endpoint not found. Please check the server.";
          } else if (err.response.status === 401) {
            errorMessage = "Unauthorized access. Please login again.";
          } else if (err.response.status === 500) {
            errorMessage = "Server error. Please try again later.";
          }
        } else if (err.request) {
          errorMessage = "No response from server. Please check your connection.";
        } else if (err.code === 'ECONNABORTED') {
          errorMessage = "Request timeout. Please try again.";
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    return () => {
      // Cleanup function
    };
  }, []);

  const renderTrendIndicator = (trend) => {
    if (trend === 'up') return <span className="ml-2 text-green-500">↑</span>;
    if (trend === 'down') return <span className="ml-2 text-red-500">↓</span>;
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PulseLoader color="#3B82F6" size={15} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-md">
          <p className="font-medium">Error Loading Dashboard</p>
          <p className="mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
          <div className="mt-3 text-sm text-red-600">
            <p>If the problem persists, please:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Check your internet connection</li>
              <li>Verify the backend server is running</li>
              <li>Contact support if needed</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="hidden md:block w-64 flex-shrink-0" />
      <main className="flex-1 p-6 mt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={`${stat.title}-${index}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`${stat.bg} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-200`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <div className="flex items-center">
                      <h3 className="text-2xl font-bold mt-1">{stat.value.toLocaleString()}</h3>
                      {renderTrendIndicator(stat.trend)}
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`text-2xl ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="text-gray-500 text-center py-8">
              Activity feed will appear here
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};