import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaDna, FaPenNib, FaClock, FaUser, FaComment, FaHeart, FaUtensils, FaRunning, FaLeaf } from 'react-icons/fa';

export const LifestylePage = () => {
  // Lifestyle news data
  const lifestyleNews = [
    {
      id: 1,
      title: "योग और ध्यान: रोजाना 20 मिनट का अभ्यास आपके जीवन को कैसे बदल सकता है",
      category: "स्वास्थ्य",
      date: "15 मार्च 2024",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "नए शोध के अनुसार रोजाना 20 मिनट का योग और ध्यान तनाव को 40% तक कम कर सकता है। विशेषज्ञों ने सुबह के समय इसके अभ्यास की सलाह दी है।",
      author: "डॉ. प्रिया शर्मा",
      comments: 32,
      likes: 145,
      icon: <FaLeaf className="text-green-500" />
    },
    {
      id: 2,
      title: "माइंडफुल ईटिंग: जानें कैसे खाने के तरीके से वजन घटा सकते हैं",
      category: "आहार",
      date: "14 मार्च 2024",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "माइंडफुल ईटिंग तकनीक से बिना डाइटिंग के 3 महीने में 5 किलो तक वजन कम किया जा सकता है। जानें इसके 5 आसान नियम।",
      author: "राहुल वर्मा",
      comments: 28,
      likes: 98,
      icon: <FaUtensils className="text-yellow-500" />
    },
    {
      id: 3,
      title: "5 आयुर्वेदिक सुपरफूड्स जो आपकी इम्यूनिटी बढ़ाएंगे",
      category: "आयुर्वेद",
      date: "13 मार्च 2024",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "आयुर्वेद विशेषज्ञ डॉ. रमन ने बताए 5 सुपरफूड्स जो न सिर्फ इम्यूनिटी बढ़ाते हैं बल्कि लंबी उम्र भी देते हैं। जानें इन्हें कैसे उपयोग करें।",
      author: "डॉ. रमन शर्मा",
      comments: 41,
      likes: 176,
      icon: <FaLeaf className="text-green-500" />
    },
    {
      id: 4,
      title: "सुबह की 5 आदतें जो सफल लोगों को दूसरों से अलग बनाती हैं",
      category: "प्रोडक्टिविटी",
      date: "12 मार्च 2024",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "दुनिया के सबसे सफल लोग अपने दिन की शुरुआत कैसे करते हैं? जानें वो 5 आदतें जो आपकी प्रोडक्टिविटी को दोगुना कर सकती हैं।",
      author: "अंकिता गुप्ता",
      comments: 37,
      likes: 203,
      icon: <FaRunning className="text-blue-500" />
    },
    {
      id: 5,
      title: "डिजिटल डिटॉक्स: स्मार्टफोन की लत से कैसे पाएं छुटकारा",
      category: "मानसिक स्वास्थ्य",
      date: "11 मार्च 2024",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "एक शोध के अनुसार औसत व्यक्ति दिन में 150 बार फोन चेक करता है। जानें कैसे करें डिजिटल डिटॉक्स और जीवन को संतुलित बनाएं।",
      author: "डॉ. नीरज सिंह",
      comments: 52,
      likes: 187,
      icon: <FaLeaf className="text-green-500" />
    },
    {
      id: 6,
      title: "वेगन डाइट: शुरुआती लोगों के लिए पूरी गाइड",
      category: "आहार",
      date: "10 मार्च 2024",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "वेगन डाइट अपनाने वाले लोगों के लिए पोषण विशेषज्ञ डॉ. श्वेता ने बताए पूरे सप्ताह के डाइट प्लान और जरूरी सप्लीमेंट्स।",
      author: "डॉ. श्वेता मेहरा",
      comments: 45,
      likes: 134,
      icon: <FaUtensils className="text-yellow-500" />
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
          <h3 className="text-2xl font-bold text-green-700">लाइफस्टाइल</h3>
          <div className="relative h-2 mt-4">
            <div className="progress-bar-outer w-full h-full bg-gray-200 rounded-full overflow-hidden shadow-inner border border-gray-300">
              <div 
                className="progress-bar-inner h-full bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 rounded-full transition-all duration-1000 ease-out shadow-md"
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
            <Link to="/lifestyle" className="breadcrumbs__item flex items-center gap-1 text-green-600 hover:text-green-800">
              <FaDna className="text-teal-500" /> लाइफस्टाइल
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
                <span className="mx-4">• योग से तनाव में 40% तक की कमी - नया शोध</span>
                <span className="mx-4">• माइंडफुल ईटिंग से बिना डाइटिंग वजन घटाएं</span>
                <span className="mx-4">• आयुर्वेद के 5 सुपरफूड्स जो बढ़ाएंगे इम्यूनिटी</span>
              </div>
            </div>
          </div>
        </div>

        {/* News container */}
        <div className="blog-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {lifestyleNews.map((news) => (
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
                <Link to={`/lifestyle/${news.id}`} className="hover:text-green-600">
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
            <h3 className="text-xl font-bold text-green-700 mb-2">लाइफस्टाइल टिप्स सब्सक्राइब करें</h3>
            <p className="text-gray-600 mb-4">स्वास्थ्य, आहार और जीवनशैली से जुड़े ताज़ा अपडेट सीधे अपने इनबॉक्स में पाएं</p>
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