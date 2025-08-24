import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaVideo, FaFileAlt, FaChartLine, FaMusic, FaUsers, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';

export const DashboardStats = () => {
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use mock data for demonstration - replace with actual API calls
        const mockStats = {
          totalContents: 16,
          blogs: 5,
          videos: 3,
          news: 4,
          audio: 4,
          monthlyViews: 0,
          totalUsers: 1,
          recentGrowth: 0,
          blogGrowth: 150,
          videoGrowth: 50,
          newsGrowth: 33.33,
          audioGrowth: 33.33,
          userGrowth: 0
        };

        const mockActivities = [
          {
            id: 1,
            type: 'blog',
            title: 'New Blog Published',
            description: '"Getting Started with React" was added',
            timestamp: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: 2,
            type: 'video',
            title: 'Video Tutorial Uploaded',
            description: 'New dashboard tutorial video added',
            timestamp: new Date(Date.now() - 7200000).toISOString()
          },
          {
            id: 3,
            type: 'news',
            title: 'Breaking News Added',
            description: 'Latest technology updates published',
            timestamp: new Date(Date.now() - 86400000).toISOString()
          }
        ];

        // For production, uncomment this and replace with your actual API call:
        /*
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_BASE_URL}/api/dashboard/stats`);
        const mockStats = res.data;
        */

        const dynamicStats = [
          {
            title: 'Total Contents',
            value: mockStats.totalContents,
            icon: FaFileAlt,
            color: 'text-green-500',
            bg: 'bg-green-50',
            trend: mockStats.recentGrowth > 0 ? 'up' : 'neutral',
            change: mockStats.recentGrowth
          },
          {
            title: 'Blogs',
            value: mockStats.blogs,
            icon: FaFileAlt,
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            trend: mockStats.blogGrowth > 0 ? 'up' : 'neutral',
            change: mockStats.blogGrowth
          },
          {
            title: 'Videos',
            value: mockStats.videos,
            icon: FaVideo,
            color: 'text-red-500',
            bg: 'bg-red-50',
            trend: mockStats.videoGrowth > 0 ? 'up' : 'neutral',
            change: mockStats.videoGrowth
          },
          {
            title: 'News',
            value: mockStats.news,
            icon: FaNewspaper,
            color: 'text-yellow-500',
            bg: 'bg-yellow-50',
            trend: mockStats.newsGrowth > 0 ? 'up' : 'neutral',
            change: mockStats.newsGrowth
          },
          {
            title: 'Audio',
            value: mockStats.audio,
            icon: FaMusic,
            color: 'text-purple-500',
            bg: 'bg-purple-50',
            trend: mockStats.audioGrowth > 0 ? 'up' : 'neutral',
            change: mockStats.audioGrowth
          },
          {
            title: 'Total Users',
            value: mockStats.totalUsers,
            icon: FaUsers,
            color: 'text-indigo-500',
            bg: 'bg-indigo-50',
            trend: mockStats.userGrowth > 0 ? 'up' : 'neutral',
            change: mockStats.userGrowth
          }
        ];

        setStats(dynamicStats);
        setActivities(mockActivities);
        setLoading(false);

      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError("Failed to load dashboard data. Using sample data.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const renderTrendIndicator = (trend, change) => {
    if (trend === 'up') return (
      <span className="ml-2 text-green-500 text-sm">
        ↑ {change}%
      </span>
    );
    return null;
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'blog': return <FaFileAlt className="text-blue-500" />;
      case 'video': return <FaVideo className="text-red-500" />;
      case 'news': return <FaNewspaper className="text-yellow-500" />;
      case 'audio': return <FaMusic className="text-purple-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <PulseLoader color="#3B82F6" size={15} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-md">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="hidden md:block w-64 flex-shrink-0" />
      <main className="flex-1 p-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className={`${stat.bg} p-4 rounded-lg shadow-sm hover:shadow-md transition-all`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <div className="flex items-center mt-1">
                      <h3 className="text-xl font-bold">{stat.value}</h3>
                      {renderTrendIndicator(stat.trend, stat.change)}
                    </div>
                  </div>
                  <div className={`p-2 rounded-md ${stat.bg}`}>
                    <stat.icon className={`text-xl ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaClock className="mr-2 text-gray-500" />
              Recent Activities
            </h3>
            
            {activities.length > 0 ? (
              <div className="space-y-3">
                {activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex-shrink-0 mt-1 mr-3">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatDate(activity.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recent activities found
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};