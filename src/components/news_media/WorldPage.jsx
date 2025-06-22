import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaGlobe, FaPenNib, FaClock, FaUser, FaComment, FaFire } from 'react-icons/fa';

export const WorldPage = () => {
  // News data with actual Hindi content
  const newsData = [
    {
      id: 1,
      title: "भारत और अमेरिका के बीच रक्षा समझौता, 3 अरब डॉलर का हथियार सौदा",
      category: "राष्ट्रीय",
      date: "15 जून 2024",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "प्रधानमंत्री मोदी और अमेरिकी राष्ट्रपति बिडेन के बीच हुई वार्ता के बाद दोनों देशों ने रक्षा समझौते पर हस्ताक्षर किए।",
      author: "राहुल शर्मा",
      comments: 42,
      isBreaking: true
    },
    {
      id: 2,
      title: "मॉनसून की देरी से किसानों की चिंता बढ़ी, सरकार ने जारी की एडवाइजरी",
      category: "कृषि",
      date: "14 जून 2024",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "इस साल मॉनसून के देरी से आने के कारण किसानों की चिंता बढ़ गई है। कृषि मंत्रालय ने वैकल्पिक फसलों के बारे में सलाह जारी की है।",
      author: "प्रिया पाटिल",
      comments: 28,
      isBreaking: false
    },
    {
      id: 3,
      title: "T20 विश्व कप: भारत ने पाकिस्तान को 5 विकेट से हराया",
      category: "खेल",
      date: "13 जून 2024",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "विराट कोहली की शानदार अर्धशतकीय पारी की बदौलत भारत ने पाकिस्तान को रोमांचक मुकाबले में 5 विकेट से हरा दिया।",
      author: "विकास सिंह",
      comments: 156,
      isBreaking: true
    },
    {
      id: 4,
      title: "बॉलीवुड अभिनेता सुशांत सिंह राजपूत मामले में नया ट्विस्ट",
      category: "मनोरंजन",
      date: "12 जून 2024",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "सीबीआई की नई जांच में कुछ नए सबूत मिले हैं जो इस मामले को नई दिशा दे सकते हैं।",
      author: "अनुराधा जोशी",
      comments: 89,
      isBreaking: false
    },
    {
      id: 5,
      title: "शेयर बाजार में भारी गिरावट, सेंसेक्स 1000 अंक लुढ़का",
      category: "व्यापार",
      date: "11 जून 2024",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "वैश्विक बाजारों में गिरावट के चलते भारतीय शेयर बाजार में भी भारी बिकवाली देखने को मिली।",
      author: "मोहित अग्रवाल",
      comments: 37,
      isBreaking: false
    },
    {
      id: 6,
      title: "दिल्ली में वायु प्रदूषण का स्तर फिर से खतरनाक स्तर पर",
      category: "पर्यावरण",
      date: "10 जून 2024",
      image: "https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "दिल्ली सरकार ने वाहनों के ऑड-ईवन योजना को फिर से लागू करने की घोषणा की है।",
      author: "नीलम वर्मा",
      comments: 24,
      isBreaking: true
    }
  ];

  // Animation for the 50% line with colorful dash
  useEffect(() => {
    const progressBar = document.querySelector('.animated-line-progress');
    if (progressBar) {
      progressBar.style.width = '0';
      setTimeout(() => {
        progressBar.style.width = '50%';
      }, 100);
    }
  }, []);

  return (
    <>
      {/* Title with animated line */}
      <div className="container mx-auto px-4">
        <div className="Title py-4">
          <h3 className="text-2xl font-bold text-gray-800">देश | दुनिया</h3>
          <div className="relative h-3 mt-4">
            <div className="animated-line-container w-full h-full bg-gray-200 rounded-full overflow-hidden border border-gray-300 shadow-sm">
              <div 
                className="animated-line-progress h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: '0%',
                  backgroundSize: '200% 100%',
                  backgroundImage: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* breadcrumb */}
      <div className="breadcrumbs bg-gray-100 py-2 px-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <div className="breadcrumbs__col">
            <Link to="/raviopedia" className="breadcrumbs__item flex items-center gap-1 text-blue-600 hover:text-blue-800">
              <FaHome className="text-blue-500" /> होम
            </Link>
          </div>
          <span className="text-gray-400">/</span>
          <div className="breadcrumbs__col">
            <Link to="/world" className="breadcrumbs__item flex items-center gap-1 text-blue-600 hover:text-blue-800">
              <FaGlobe className="text-green-500" /> देश | दुनिया
            </Link>
          </div>
          <span className="text-gray-400">/</span>
          <div className="breadcrumbs__col">
            <span className="breadcrumbs__item flex items-center gap-1 text-gray-600">
              <FaPenNib className="text-yellow-500" /> ताज़ा खबरें
            </span>
          </div>
        </div>
      </div>

      <section id="blog" className="py-6 px-4">
        {/* Breaking news ticker */}
        <div className="breaking-news bg-red-600 text-white py-2 px-4 mb-6 rounded-md shadow-lg">
          <div className="flex items-center">
            <span className="font-bold mr-3 flex items-center">
              <FaFire className="mr-1" /> ताज़ा खबरें:
            </span>
            <div className="ticker-content overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee">
                <span className="mx-4">• भारतीय अर्थव्यवस्था ने 7.8% की वृद्धि दर हासिल की</span>
                <span className="mx-4">• दिल्ली में आज से स्कूल बंद, वायु प्रदूषण के कारण</span>
                <span className="mx-4">• विश्व कप 2024: भारत ने न्यूजीलैंड को हराया</span>
              </div>
            </div>
          </div>
        </div>

        {/* News container */}
        <div className="blog-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {newsData.map((news) => (
            <div 
              key={news.id} 
              className={`blog-box bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${news.isBreaking ? 'border-l-4 border-red-500' : ''}`}
            >
              <div className="blog-img relative">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="category absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded shadow-md">
                  {news.category}
                </span>
                {news.isBreaking && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full shadow-md flex items-center">
                    <FaFire className="mr-1" /> ताज़ा खबरें
                  </span>
                )}
              </div>

              <div className="blog-text p-4">
                <Link to={`/news/${news.id}`} className="hover:text-blue-600">
                  <strong className="text-lg font-semibold line-clamp-2">
                    {news.title}
                  </strong>
                </Link>

                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  {news.excerpt}
                </p>

                <div className="category-time mt-3 text-gray-500 text-sm flex items-center justify-between">
                  <span className="published-date flex items-center gap-1">
                    <FaClock className="text-gray-400" /> {news.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-gray-400" /> {news.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaComment className="text-gray-400" /> {news.comments}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* pagination */}
        <div className="pagination mt-8 flex justify-center">
          <ul className="flex gap-1">
            {[1, 2, 3, 4, 5].map((page) => (
              <li key={page}>
                <Link 
                  to="#" 
                  className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe section */}
        <div className="subscribe-section mt-10 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg shadow-inner">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">ताज़ा खबरें सीधे अपने इनबॉक्स में पाएं</h3>
            <p className="text-gray-600 mb-4">हमारे न्यूज़लेटर को सब्सक्राइब करें और दैनिक अपडेट प्राप्त करें</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input 
                type="email" 
                placeholder="आपका ईमेल पता" 
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow max-w-md"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition-colors duration-300">
                सब्सक्राइब करें
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Add these styles for animations */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: inline-block;
          padding-left: 100%;
        }
      `}</style>
    </>
  );
};