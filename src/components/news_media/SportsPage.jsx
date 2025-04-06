import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTrophy, FaPenNib, FaClock, FaUser, FaComment, FaFire } from 'react-icons/fa';

export const SportsPage = () => {
  // Sports news data with actual Hindi content
  const sportsNews = [
    {
      id: 1,
      title: "T20 विश्व कप: भारत ने पाकिस्तान को 5 विकेट से हराया",
      category: "क्रिकेट",
      date: "15 जून 2024",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "विराट कोहली की शानदार अर्धशतकीय पारी की बदौलत भारत ने पाकिस्तान को रोमांचक मुकाबले में 5 विकेट से हरा दिया।",
      author: "विकास सिंह",
      comments: 156,
      isBreaking: true
    },
    {
      id: 2,
      title: "ओलंपिक 2024: नीरज चोपड़ा ने जीता गोल्ड मेडल",
      category: "एथलेटिक्स",
      date: "14 जून 2024",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "भारत के नीरज चोपड़ा ने पेरिस ओलंपिक में भाला फेंक स्पर्धा में स्वर्ण पदक जीतकर इतिहास रच दिया।",
      author: "राहुल शर्मा",
      comments: 89,
      isBreaking: false
    },
    {
      id: 3,
      title: "फुटबॉल: मेसी ने जीता आठवां बैलन डी'ओर पुरस्कार",
      category: "फुटबॉल",
      date: "13 जून 2024",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "लियोनेल मेसी ने लगातार दूसरे साल बैलन डी'ओर पुरस्कार जीता और इस मामले में क्रिस्टियानो रोनाल्डो को पीछे छोड़ दिया।",
      author: "प्रिया पाटिल",
      comments: 203,
      isBreaking: true
    },
    {
      id: 4,
      title: "बैडमिंटन: पीवी सिंधु ने जीता डेनमार्क ओपन खिताब",
      category: "बैडमिंटन",
      date: "12 जून 2024",
      image: "https://images.unsplash.com/photo-1592921870789-04563d6b8e2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "भारत की पीवी सिंधु ने डेनमार्क ओपन बैडमिंटन टूर्नामेंट के फाइनल में जापान की अकाने यामागुची को हराया।",
      author: "अनुराधा जोशी",
      comments: 67,
      isBreaking: false
    },
    {
      id: 5,
      title: "हॉकी: भारत ने जीता एशिया कप खिताब",
      category: "हॉकी",
      date: "11 जून 2024",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "भारतीय हॉकी टीम ने पाकिस्तान को 3-1 से हराकर एशिया कप जीत लिया। यह भारत का इस टूर्नामेंट में 10वां खिताब है।",
      author: "मोहित अग्रवाल",
      comments: 94,
      isBreaking: false
    },
    {
      id: 6,
      title: "टेनिस: सानिया मिर्जा ने जीता मिक्स्ड डबल्स खिताब",
      category: "टेनिस",
      date: "10 जून 2024",
      image: "https://images.unsplash.com/photo-1544298621-a28c005444a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "सानिया मिर्जा और उनके साथी ने विंबलडन में मिक्स्ड डबल्स का खिताब जीतकर इतिहास रच दिया।",
      author: "नीलम वर्मा",
      comments: 58,
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
          <h3 className="text-2xl font-bold text-gray-800">खेल</h3>
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
            <Link to="/sports" className="breadcrumbs__item flex items-center gap-1 text-blue-600 hover:text-blue-800">
              <FaTrophy className="text-yellow-500" /> खेल
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
              <FaFire className="mr-1" /> ब्रेकिंग न्यूज़:
            </span>
            <div className="ticker-content overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee">
                <span className="mx-4">• T20 विश्व कप: भारत बनाम पाकिस्तान मैच आज</span>
                <span className="mx-4">• ओलंपिक 2024: भारत के लिए 3 और गोल्ड मेडल</span>
                <span className="mx-4">• विराट कोहली ने तोड़ा सचिन तेंदुलकर का रिकॉर्ड</span>
              </div>
            </div>
          </div>
        </div>

        {/* News container */}
        <div className="blog-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {sportsNews.map((news) => (
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
                    <FaFire className="mr-1" /> ब्रेकिंग
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
            <h3 className="text-xl font-bold text-gray-800 mb-2">खेल समाचार सीधे अपने इनबॉक्स में पाएं</h3>
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