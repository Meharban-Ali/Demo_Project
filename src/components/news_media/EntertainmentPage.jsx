import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFilm, FaPenNib, FaClock, FaUser, FaComment, FaHeart } from 'react-icons/fa';

export const EntertainmentPage = () => {
  // Entertainment news data
  const entertainmentNews = [
    {
      id: 1,
      title: "शाहरुख खान की नई फिल्म 'दुनकी' ने बॉक्स ऑफिस पर किया धमाल",
      category: "बॉलीवुड",
      date: "15 मार्च 2024",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "शाहरुख खान की नई फिल्म 'दुनकी' ने पहले ही सप्ताह में 200 करोड़ रुपये का कलेक्शन कर लिया है। फिल्म ने दुनिया भर में बॉक्स ऑफिस पर शानदार प्रदर्शन किया है।",
      author: "सुमन राव",
      comments: 56,
      likes: 124
    },
    {
      id: 2,
      title: "सलमान खान ने की 'टाइगर 3' की घोषणा, रिलीज डेट जारी",
      category: "बॉलीवुड",
      date: "14 मार्च 2024",
      image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "सलमान खान ने आधिकारिक तौर पर 'टाइगर 3' की घोषणा की है। फिल्म ईद 2024 पर रिलीज होगी और यह स्पाई यूनिवर्स की तीसरी कड़ी होगी।",
      author: "राहुल मिश्रा",
      comments: 42,
      likes: 198
    },
    {
      id: 3,
      title: "अलिया भट्ट और रणबीर कपूर की फिल्म 'ब्रह्मास्त्र 2' की शूटिंग शुरू",
      category: "बॉलीवुड",
      date: "13 मार्च 2024",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "आयान मुखर्जी की महत्वाकांक्षी फिल्म 'ब्रह्मास्त्र 2' की शूटिंग मुंबई में शुरू हो गई है। फिल्म में अलिया भट्ट और रणबीर कपूर मुख्य भूमिकाओं में हैं।",
      author: "प्रिया शर्मा",
      comments: 38,
      likes: 156
    },
    {
      id: 4,
      title: "साउथ की सुपरहिट फिल्म 'पुष्पा 2' का ट्रेलर रिलीज",
      category: "साउथ इंडिया",
      date: "12 मार्च 2024",
      image: "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "अल्लू अर्जुन की सुपरहिट फिल्म 'पुष्पा' के सीक्वल का ट्रेलर रिलीज हो गया है। ट्रेलर ने 24 घंटे में 50 मिलियन व्यूज का रिकॉर्ड तोड़ दिया है।",
      author: "विकास सिंह",
      comments: 72,
      likes: 245
    },
    {
      id: 5,
      title: "नेटफ्लिक्स ने जारी किया 'सैक्रेड गेम्स' सीजन 3 का टीज़र",
      category: "वेब सीरीज",
      date: "11 मार्च 2024",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "नेटफ्लिक्स ने अपनी पॉपुलर सीरीज 'सैक्रेड गेम्स' के तीसरे सीजन का टीज़र जारी किया है। सीरीज में नवाजुद्दीन सिद्दीकी और सैफ अली खान मुख्य भूमिकाओं में हैं।",
      author: "अनुराधा जोशी",
      comments: 29,
      likes: 87
    },
    {
      id: 6,
      title: "आमिर खान की 'लाल सिंह चड्ढा' को मिला अंतर्राष्ट्रीय पुरस्कार",
      category: "अवार्ड्स",
      date: "10 मार्च 2024",
      image: "https://images.unsplash.com/photo-1512070679279-8988d32161be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "आमिर खान की फिल्म 'लाल सिंह चड्ढा' को बर्लिन इंटरनेशनल फिल्म फेस्टिवल में स्पेशल जूरी अवार्ड मिला है। फिल्म फॉरेस्ट गंप की हिंदी रीमेक है।",
      author: "राजीव मेहता",
      comments: 34,
      likes: 132
    }
  ];

  // Animation effect for the progress bar
  useEffect(() => {
    const progressBar = document.querySelector('.progress-bar-inner');
    if (progressBar) {
      progressBar.style.width = '0';
      setTimeout(() => {
        progressBar.style.width = '50%';
      }, 100);
    }
  }, []);

  return (
    <>
      {/* Title with animated progress bar */}
      <div className="container mx-auto px-4">
        <div className="Title py-4">
          <h3 className="text-2xl font-bold text-purple-800">एंटरटेनमेंट</h3>
          <div className="relative h-2 mt-4">
            <div className="progress-bar-outer w-full h-full bg-gray-200 rounded-full overflow-hidden shadow-inner border border-gray-300">
              <div 
                className="progress-bar-inner h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-md"
                style={{ width: '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* breadcrumb */}
      <div className="breadcrumbs bg-gray-100 py-2 px-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <div className="breadcrumbs__col">
            <Link to="/raviopedia" className="breadcrumbs__item flex items-center gap-1 text-purple-600 hover:text-purple-800">
              <FaHome className="text-purple-500" /> होम
            </Link>
          </div>
          <span className="text-gray-400">/</span>
          <div className="breadcrumbs__col">
            <Link to="/entertainment" className="breadcrumbs__item flex items-center gap-1 text-purple-600 hover:text-purple-800">
              <FaFilm className="text-red-500" /> एंटरटेनमेंट
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
        <div className="breaking-news bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 mb-6 rounded-md shadow-lg animate-pulse">
          <div className="flex items-center">
            <span className="font-bold mr-3">ताज़ा खबरें:</span>
            <div className="ticker-content overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee">
                <span className="mx-4">• शाहरुख खान की 'दुनकी' ने 200 करोड़ का कलेक्शन किया</span>
                <span className="mx-4">• सलमान खान ने की 'टाइगर 3' की घोषणा</span>
                <span className="mx-4">• 'ब्रह्मास्त्र 2' की शूटिंग शुरू</span>
              </div>
            </div>
          </div>
        </div>

        {/* News container */}
        <div className="blog-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {entertainmentNews.map((news) => (
            <div 
              key={news.id} 
              className="blog-box bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="blog-img relative">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="category absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 text-xs rounded shadow-md">
                  {news.category}
                </span>
              </div>

              <div className="blog-text p-4">
                <Link to={`/entertainment/${news.id}`} className="hover:text-purple-600">
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
                    <span className="flex items-center gap-1">
                      <FaHeart className="text-red-400" /> {news.likes}
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
                  className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe section */}
        <div className="subscribe-section mt-10 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg shadow-inner">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold text-purple-800 mb-2">एंटरटेनमेंट न्यूज़ सब्सक्राइब करें</h3>
            <p className="text-gray-600 mb-4">ताज़ा बॉलीवुड और हॉलीवुड अपडेट सीधे अपने इनबॉक्स में पाएं</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input 
                type="email" 
                placeholder="आपका ईमेल पता" 
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow max-w-md"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md shadow-md transition-colors duration-300">
                सब्सक्राइब
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
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