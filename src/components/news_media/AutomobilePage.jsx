import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCar, FaPenNib, FaClock, FaUser, FaComment, FaHeart, FaGasPump, FaCogs, FaMotorcycle } from 'react-icons/fa';

export const AutomobilePage = () => {
  // Automobile news data
  const automobileNews = [
    {
      id: 1,
      title: "टाटा ने लॉन्च की नई इलेक्ट्रिक कार 'नेक्सन ईवी', जानें कीमत और फीचर्स",
      category: "इलेक्ट्रिक व्हीकल",
      date: "15 मार्च 2024",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "टाटा मोटर्स ने अपनी नई इलेक्ट्रिक एसयूवी 'नेक्सन ईवी' लॉन्च की है जो 450 किमी की रेंज प्रदान करती है। कीमत ₹18 लाख से शुरू होती है।",
      author: "राहुल वर्मा",
      comments: 42,
      likes: 187,
      icon: <FaCar className="text-blue-500" />
    },
    {
      id: 2,
      title: "2024 हुंडई क्रेटा फेसलिफ्ट: नए फीचर्स और अपडेटेड डिज़ाइन के साथ हुई लॉन्च",
      category: "एसयूवी",
      date: "14 मार्च 2024",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "हुंडई ने अपने पॉपुलर एसयूवी क्रेटा का अपडेटेड वर्जन लॉन्च किया है जिसमें नया डिज़ाइन, एडवांस्ड सेफ्टी फीचर्स और मजबूत इंजन ऑप्शन शामिल हैं।",
      author: "प्रिया शर्मा",
      comments: 38,
      likes: 156,
      icon: <FaCar className="text-blue-500" />
    },
    {
      id: 3,
      title: "बजाज ने लॉन्च की नई पल्सर NS400, 400cc इंजन के साथ आई है यह बाइक",
      category: "मोटरसाइकिल",
      date: "13 मार्च 2024",
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "बजाज ऑटो ने अपनी नई फ्लैगशिप बाइक पल्सर NS400 लॉन्च की है जो 400cc इंजन के साथ आती है और ₹2.10 लाख की कीमत पर उपलब्ध होगी।",
      author: "विकास सिंह",
      comments: 56,
      likes: 234,
      icon: <FaMotorcycle className="text-red-500" />
    },
    {
      id: 4,
      title: "पेट्रोल-डीजल की बढ़ती कीमतों के बीच CNG वाहनों की मांग में उछाल",
      category: "ईंधन",
      date: "12 मार्च 2024",
      image: "https://images.unsplash.com/photo-1580129958921-4c7d0cde83a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "पेट्रोल-डीजल की बढ़ती कीमतों के कारण CNG वाहनों की मांग में 40% की वृद्धि हुई है। मारुति, हुंडई और टाटा ने CNG मॉडल्स की रेंज बढ़ाई है।",
      author: "अंकिता गुप्ता",
      comments: 29,
      likes: 98,
      icon: <FaGasPump className="text-green-500" />
    },
    {
      id: 5,
      title: "मर्सिडीज ने भारत में लॉन्च की नई E-Class, कीमत ₹75 लाख से शुरू",
      category: "लक्जरी कार",
      date: "11 मार्च 2024",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "मर्सिडीज-बेंज इंडिया ने अपनी नई E-Class सेडान लॉन्च की है जो पूरी तरह से लोडेड फीचर्स के साथ आती है और ₹75 लाख की शुरुआती कीमत पर उपलब्ध है।",
      author: "राजीव मेहता",
      comments: 24,
      likes: 112,
      icon: <FaCar className="text-blue-500" />
    },
    {
      id: 6,
      title: "2024 मारुति सुजुकी स्विफ्ट: नए सेफ्टी फीचर्स के साथ होगी लॉन्च",
      category: "हैचबैक",
      date: "10 मार्च 2024",
      image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      excerpt: "मारुति सुजुकी जल्द ही अपनी पॉपुलर हैचबैक स्विफ्ट का अपडेटेड वर्जन लॉन्च करेगी जिसमें 6 एयरबैग्स और एडवांस्ड ड्राइवर असिस्टेंस सिस्टम शामिल होंगे।",
      author: "सुमन राव",
      comments: 47,
      likes: 176,
      icon: <FaCar className="text-blue-500" />
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
          <h3 className="text-2xl font-bold text-blue-800">ऑटोमोबाइल</h3>
          <div className="relative h-2 mt-4">
            <div className="progress-bar-outer w-full h-full bg-gray-200 rounded-full overflow-hidden shadow-inner border border-gray-300">
              <div 
                className="progress-bar-inner h-full bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded-full transition-all duration-1000 ease-out shadow-md"
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
            <Link to="/raviopedia" className="breadcrumbs__item flex items-center gap-1 text-blue-600 hover:text-blue-800">
              <FaHome className="text-blue-500" /> होम
            </Link>
          </div>
          <span className="text-gray-400">/</span>
          <div className="breadcrumbs__col">
            <Link to="/automobile" className="breadcrumbs__item flex items-center gap-1 text-blue-600 hover:text-blue-800">
              <FaCar className="text-red-500" /> ऑटोमोबाइल
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
        <div className="breaking-news bg-gradient-to-r from-blue-600 to-red-600 text-white py-2 px-4 mb-6 rounded-md shadow-lg animate-pulse">
          <div className="flex items-center">
            <span className="font-bold mr-3">ताज़ा खबरें:</span>
            <div className="ticker-content overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee">
                <span className="mx-4">• टाटा ने लॉन्च की नई इलेक्ट्रिक कार 'नेक्सन ईवी'</span>
                <span className="mx-4">• 2024 हुंडई क्रेटा फेसलिफ्ट लॉन्च</span>
                <span className="mx-4">• बजाज पल्सर NS400 की भारत में हुई एंट्री</span>
              </div>
            </div>
          </div>
        </div>

        {/* News container */}
        <div className="blog-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {automobileNews.map((news) => (
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
                <span className="category absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded shadow-md flex items-center gap-1">
                  {news.icon} {news.category}
                </span>
              </div>

              <div className="blog-text p-4">
                <Link to={`/automobile/${news.id}`} className="hover:text-blue-600">
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
                  className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe section */}
        <div className="subscribe-section mt-10 bg-gradient-to-r from-blue-50 to-red-50 p-6 rounded-lg shadow-inner">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold text-blue-700 mb-2">ऑटोमोबाइल न्यूज़ सब्सक्राइब करें</h3>
            <p className="text-gray-600 mb-4">नई कारों, बाइक्स और ऑटोमोबाइल ट्रेंड्स के बारे में ताज़ा अपडेट पाएं</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input 
                type="email" 
                placeholder="आपका ईमेल पता" 
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow max-w-md"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition-colors duration-300">
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