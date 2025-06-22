import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSeedling, FaPenNib, FaClock, FaUser, FaComment, FaHeart, FaTree, FaWater, FaRecycle } from 'react-icons/fa';

export const EnvironmentPage = () => {
  // Environment news data
  const environmentNews = [
    {
      id: 1,
      title: "हिमालय के ग्लेशियरों के पिघलने की दर में 30% की वृद्धि: नया अध्ययन",
      category: "जलवायु परिवर्तन",
      date: "15 मार्च 2024",
      image: "https://images.unsplash.com/photo-1615874959474-df5456ebe122?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "हाल ही में हुए एक अध्ययन के अनुसार हिमालय के ग्लेशियर पिछले दशक की तुलना में 30% तेजी से पिघल रहे हैं, जिससे नदियों में जलस्तर बढ़ने का खतरा है।",
      author: "डॉ. प्रिया शर्मा",
      comments: 42,
      likes: 156,
      icon: <FaWater className="text-blue-500" />
    },
    {
      id: 2,
      title: "भारत में 2025 तक 50 लाख हेक्टेयर में होगा वनीकरण: पर्यावरण मंत्रालय",
      category: "वनीकरण",
      date: "14 मार्च 2024",
      image: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "केंद्रीय पर्यावरण मंत्रालय ने घोषणा की है कि देश में 2025 तक 50 लाख हेक्टेयर क्षेत्र में वनीकरण किया जाएगा, जिसमें स्थानीय प्रजातियों के पेड़ लगाए जाएंगे।",
      author: "राहुल वर्मा",
      comments: 28,
      likes: 198,
      icon: <FaTree className="text-green-500" />
    },
    {
      id: 3,
      title: "दिल्ली में वायु प्रदूषण के खिलाफ नई एक्शन प्लान लागू, ऑड-ईवन योजना फिर से शुरू",
      category: "वायु प्रदूषण",
      date: "13 मार्च 2024",
      image: "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "दिल्ली सरकार ने बढ़ते वायु प्रदूषण को नियंत्रित करने के लिए नया एक्शन प्लान लागू किया है, जिसमें ऑड-ईवन योजना और निर्माण गतिविधियों पर प्रतिबंध शामिल है।",
      author: "अंकिता गुप्ता",
      comments: 56,
      likes: 234,
      icon: <FaRecycle className="text-gray-500" />
    },
    {
      id: 4,
      title: "सिंगल यूज प्लास्टिक पर पूर्ण प्रतिबंध लागू, 1 जुलाई से सख्त कार्रवाई",
      category: "प्लास्टिक प्रदूषण",
      date: "12 मार्च 2024",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "केंद्र सरकार ने 1 जुलाई 2024 से सिंगल यूज प्लास्टिक उत्पादों पर पूर्ण प्रतिबंध लगा दिया है। उल्लंघन करने वालों पर भारी जुर्माना लगेगा।",
      author: "राजीव मेहता",
      comments: 72,
      likes: 312,
      icon: <FaRecycle className="text-gray-500" />
    },
    {
      id: 5,
      title: "गंगा नदी की सफाई में 45% सुधार: नमामि गंगे प्रोजेक्ट की रिपोर्ट",
      category: "नदी संरक्षण",
      date: "11 मार्च 2024",
      image: "https://images.unsplash.com/photo-1605360019560-2badd1e9d7a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "नमामि गंगे प्रोजेक्ट की नवीनतम रिपोर्ट के अनुसार गंगा नदी के जल की गुणवत्ता में 45% सुधार हुआ है और जलीय जीवन में वृद्धि दर्ज की गई है।",
      author: "डॉ. नीरज सिंह",
      comments: 38,
      likes: 176,
      icon: <FaWater className="text-blue-500" />
    },
    {
      id: 6,
      title: "भारत ने 2030 तक 500 गीगावाट नवीकरणीय ऊर्जा का लक्ष्य निर्धारित किया",
      category: "नवीकरणीय ऊर्जा",
      date: "10 मार्च 2024",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "केंद्रीय ऊर्जा मंत्री ने घोषणा की कि भारत 2030 तक 500 गीगावाट नवीकरणीय ऊर्जा क्षमता स्थापित करेगा, जिसमें सौर और पवन ऊर्जा प्रमुख होगी।",
      author: "सुमन राव",
      comments: 45,
      likes: 203,
      icon: <FaTree className="text-green-500" />
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
          <h3 className="text-2xl font-bold text-green-700">पर्यावरण</h3>
          <div className="relative h-2 mt-4">
            <div className="progress-bar-outer w-full h-full bg-gray-200 rounded-full overflow-hidden shadow-inner border border-gray-300">
              <div 
                className="progress-bar-inner h-full bg-gradient-to-r from-green-400 via-blue-400 to-teal-400 rounded-full transition-all duration-1000 ease-out shadow-md"
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
            <Link to="/raviopedia" className="breadcrumbs__item flex items-center gap-1 text-green-600 hover:text-green-800">
              <FaHome className="text-green-500" /> होम
            </Link>
          </div>
          <span className="text-gray-400">/</span>
          <div className="breadcrumbs__col">
            <Link to="/environment" className="breadcrumbs__item flex items-center gap-1 text-green-600 hover:text-green-800">
              <FaSeedling className="text-green-500" /> पर्यावरण
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
        <div className="breaking-news bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 px-4 mb-6 rounded-md shadow-lg animate-pulse">
          <div className="flex items-center">
            <span className="font-bold mr-3">ताज़ा खबरें:</span>
            <div className="ticker-content overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee">
                <span className="mx-4">• हिमालय के ग्लेशियर 30% तेजी से पिघल रहे हैं</span>
                <span className="mx-4">• 2025 तक 50 लाख हेक्टेयर में वनीकरण का लक्ष्य</span>
                <span className="mx-4">• सिंगल यूज प्लास्टिक पर पूर्ण प्रतिबंध लागू</span>
              </div>
            </div>
          </div>
        </div>

        {/* News container */}
        <div className="blog-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {environmentNews.map((news) => (
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
                <span className="category absolute top-2 left-2 bg-green-600 text-white px-2 py-1 text-xs rounded shadow-md flex items-center gap-1">
                  {news.icon} {news.category}
                </span>
              </div>

              <div className="blog-text p-4">
                <Link to={`/environment/${news.id}`} className="hover:text-green-600">
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
                  className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe section */}
        <div className="subscribe-section mt-10 bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg shadow-inner">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold text-green-700 mb-2">पर्यावरण समाचार सब्सक्राइब करें</h3>
            <p className="text-gray-600 mb-4">जलवायु परिवर्तन, संरक्षण और पर्यावरण नीतियों के बारे में ताज़ा अपडेट पाएं</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input 
                type="email" 
                placeholder="आपका ईमेल पता" 
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow max-w-md"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-md transition-colors duration-300">
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