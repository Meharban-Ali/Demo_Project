import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHouse, 
  FaStar, 
  FaPen, 
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp
} from 'react-icons/fa6';

export const StatePage = () => {
  // Real news data array
  const newsArticles = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "राज्य",
      title: "उत्तर प्रदेश: योगी सरकार का बड़ा फैसला, अब सरकारी स्कूलों में मुफ्त होगी यूनिफॉर्म और किताबें",
      date: "05 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    // ... (other news articles remain the same)
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">राज्य समाचार</h3>
        <div className="relative overflow-hidden h-1">
          <div className="absolute top-0 left-0 right-0 h-full bg-gray-200"></div>
          <div className="absolute top-0 left-0 h-full w-8 bg-blue-600 rounded-full animate-marquee"></div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6 p-4 shadow-lg bg-gray-100 rounded-lg">
        <div className="breadcrumbs__col">
          <Link to="/" className="flex items-center text-blue-600 hover:text-gray-800">
            <FaHouse className="mr-1" /> होम
          </Link>
        </div>
        <span className="mx-2">/</span>
        <div className="breadcrumbs__col">
          <Link to="/state" className="flex items-center text-blue-600 hover:text-gray-800">
            <FaStar className="mr-1" /> राज्य समाचार
          </Link>
        </div>
        <span className="mx-2">/</span>
        <div className="breadcrumbs__col">
          <span className="flex items-center text-gray-800">
            <FaPen className="mr-1" /> ताज़ा खबरें
          </span>
        </div>
      </div>

      {/* Ad Banner - Converted to Link */}
      <div className="mb-8 text-center bg-white p-2 rounded-lg shadow-md">
        <Link to="/advertisement">
          <img 
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Advertisement" 
            className="w-full max-w-4xl mx-auto rounded-md"
          />
        </Link>
      </div>

      {/* Blog Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {newsArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Blog Image */}
            <div className="relative">
              <Link to={`/news/${article.id}`}>
                <img 
                  src={article.image} 
                  alt="News" 
                  className="w-full h-48 object-cover"
                />
              </Link>
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {article.category}
              </span>
            </div>

            {/* Blog Content */}
            <div className="p-4">
              <Link to={`/news/${article.id}`} className="hover:text-blue-600">
                <h3 className="font-bold text-lg mb-2">
                  {article.title}
                </h3>
              </Link>

              {/* Published Date */}
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <FaClock className="mr-1" /> {article.date}
              </div>

              {/* Publisher */}
              <div className="flex items-center">
                <Link to="/about">
                  <img 
                    src={article.publisherImage} 
                    alt={article.publisher} 
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                </Link>
                <Link to="/about" className="text-sm text-gray-600 hover:text-blue-600">
                  {article.publisher}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mb-8">
        <ul className="flex space-x-2">
          {[1, 2, 3].map((page) => (
            <li key={page}>
              <Link 
                to={`/state/page/${page}`}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-blue-600 hover:text-white block"
              >
                {page}
              </Link>
            </li>
          ))}
          <li>
            <Link 
              to="/state/page/next" 
              className="px-3 py-1 bg-gray-200 rounded hover:bg-blue-600 hover:text-white block"
            >
              &raquo;
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom Ad Banner - Converted to Link */}
      <div className="mb-8 text-center bg-white p-2 rounded-lg shadow-md">
        <Link to="/advertisement">
          <img 
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Advertisement" 
            className="w-full max-w-4xl mx-auto rounded-md"
          />
        </Link>
      </div>

      {/* Social Media Links */}
      <div className="text-center py-4 border-t border-gray-200">
        <h4 className="text-lg font-semibold mb-3">रवि ओमेडिया को फॉलो करें</h4>
        <div className="flex justify-center space-x-4">
          <Link to="https://facebook.com/raviomedia" className="text-blue-600 hover:text-blue-800">
            <FaFacebook className="text-2xl" />
          </Link>
          <Link to="https://twitter.com/raviomedia" className="text-sky-400 hover:text-sky-600">
            <FaTwitter className="text-2xl" />
          </Link>
          <Link to="https://instagram.com/raviomedia" className="text-pink-600 hover:text-pink-800">
            <FaInstagram className="text-2xl" />
          </Link>
          <Link to="https://youtube.com/raviomedia" className="text-red-600 hover:text-red-800">
            <FaYoutube className="text-2xl" />
          </Link>
          <Link to="https://linkedin.com/company/raviomedia" className="text-blue-700 hover:text-blue-900">
            <FaLinkedin className="text-2xl" />
          </Link>
          <Link to="https://t.me/raviomedia" className="text-blue-400 hover:text-blue-600">
            <FaTelegram className="text-2xl" />
          </Link>
          <Link to="https://wa.me/yournumber" className="text-green-500 hover:text-green-700">
            <FaWhatsapp className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};