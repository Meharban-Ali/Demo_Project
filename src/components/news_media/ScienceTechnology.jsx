import React, { useEffect, useRef } from 'react';
import { FaHome, FaRobot, FaPenNib, FaClock } from 'react-icons/fa';

export const ScienceTechnology = () => {
  const progressBarRef = useRef(null);

  // Animation effect for the colorful dash - using ref instead of querySelector
  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = '0';
      setTimeout(() => {
        progressBarRef.current.style.width = '100%';
      }, 100);
    }
  }, []);

  // News data with Unsplash images
  const newsArticles = [
    {
      id: 1,
      title: 'भारत ने लॉन्च किया नया सैटेलाइट, अंतरिक्ष प्रौद्योगिकी में बड़ी उपलब्धि',
      date: '15 जनवरी 2025',
      image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'विज्ञानं | तकनीक',
      publisher: 'Raviopedia'
    },
    {
      id: 2,
      title: 'भारत ने लॉन्च किया नया सैटेलाइट, अंतरिक्ष प्रौद्योगिकी में बड़ी उपलब्धि',
      date: '15 जनवरी 2025',
      image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'विज्ञानं | तकनीक',
      publisher: 'Raviopedia'
    },
    {
      id: 3,
      title: 'भारत ने लॉन्च किया नया सैटेलाइट, अंतरिक्ष प्रौद्योगिकी में बड़ी उपलब्धि',
      date: '15 जनवरी 2025',
      image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'विज्ञानं | तकनीक',
      publisher: 'Raviopedia'
    },
    {
      id: 4,
      title: 'भारत ने लॉन्च किया नया सैटेलाइट, अंतरिक्ष प्रौद्योगिकी में बड़ी उपलब्धि',
      date: '15 जनवरी 2025',
      image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'विज्ञानं | तकनीक',
      publisher: 'Raviopedia'
    },
    // ... (other articles remain the same)
  ];

  // Handle image error
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/800x500?text=Image+Not+Found";
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Title Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800">विज्ञानं | तकनीक</h3>
          {/* Animated Bar */}
          <div className="relative mt-4 h-2 w-full max-w-md mx-auto bg-gray-200 rounded-full overflow-hidden shadow-md border border-gray-300">
            <div 
              ref={progressBarRef}
              className="progress-bar absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-2000 ease-in-out"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className="breadcrumbs bg-gray-100 py-3 px-4 shadow-sm">
        <div className="container mx-auto flex flex-wrap items-center text-sm text-gray-600">
          <div className="flex items-center mr-4 mb-2 sm:mb-0">
            <a href="/" title="होम" className="flex items-center hover:text-blue-600">
              <FaHome className="mr-2" /> होम
            </a>
          </div>
          <div className="flex items-center mr-4 mb-2 sm:mb-0">
            <a href="/science-technology" title="विज्ञानं | तकनीक" className="flex items-center hover:text-blue-600">
              <FaRobot className="mr-2" /> विज्ञानं | तकनीक
            </a>
          </div>
          <div className="flex items-center">
            <span className="flex items-center text-gray-800 font-medium">
              <FaPenNib className="mr-2" /> सभी समाचार
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="blog" className="py-8">
        {/* Ad Section */}
        <div className="container mx-auto px-4 mb-8 text-center">
          <a href="#" aria-label="Advertisement">
            <img 
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" 
              alt="Advertisement" 
              className="mx-auto rounded-lg shadow-md w-full max-w-2xl h-24 object-cover"
              loading="lazy"
            />
          </a>
        </div>

        {/* Blog Container */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newsArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                {/* Image */}
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>

                {/* Text Content */}
                <div className="p-4">
                  {/* Title */}
                  <a href={`/blog/${article.id}`} className="hover:text-blue-600">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {article.title}
                    </h2>
                  </a>

                  {/* Time */}
                  <div className="mt-2">
                    <time className="text-sm text-gray-500 flex items-center">
                      <FaClock className="mr-1" /> {article.date}
                    </time>
                  </div>

                  {/* Publisher Profile */}
                  <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80" 
                      alt="Publisher" 
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                      loading="lazy"
                    />
                    <span className="text-sm text-gray-600">{article.publisher}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <nav className="container mx-auto px-4 mt-8 mb-8">
          <ul className="flex justify-center space-x-2">
            {[1, 2, 3].map((page) => (
              <li key={page}>
                <a 
                  href={`#page-${page}`} 
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-blue-600 hover:text-white"
                  aria-label={`Page ${page}`}
                >
                  {page}
                </a>
              </li>
            ))}
            <li>
              <a 
                href="#next" 
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-blue-600 hover:text-white"
                aria-label="Next page"
              >
                &raquo;
              </a>
            </li>
          </ul>
        </nav>

        {/* Bottom Ad Section */}
        <div className="container mx-auto px-4 mt-8 text-center">
          <a href="#" aria-label="Advertisement">
            <img 
              src="https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" 
              alt="Advertisement" 
              className="mx-auto rounded-lg shadow-md w-full max-w-2xl h-36 object-cover"
              loading="lazy"
            />
          </a>
        </div>
      </main>
    </div>
  );
};
