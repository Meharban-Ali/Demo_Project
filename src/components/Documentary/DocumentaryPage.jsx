import React from 'react';
import { FaPlay, FaClock, FaEye, FaCalendarAlt, FaShareAlt, FaHeart, FaSearch } from 'react-icons/fa';
import { BsThreeDotsVertical, BsArrowRight } from 'react-icons/bs';

export const DocumentaryPage = () => {
  // Sample documentary data
  const featuredDocumentaries = [
    {
      id: 1,
      title: "भारतीय मीडिया का इतिहास",
      description: "इस डॉक्यूमेंट्री में हम भारतीय मीडिया के विकास यात्रा को देखेंगे, स्वतंत्रता पूर्व काल से लेकर आधुनिक डिजिटल युग तक।",
      duration: "1:28:45",
      date: "10 जून 2023",
      category: "इतिहास",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      views: "1.2M"
    },
    {
      id: 2,
      title: "सोशल मीडिया क्रांति",
      description: "कैसे सोशल मीडिया ने पारंपरिक मीडिया को चुनौती दी और जनसंचार के तरीकों को बदल डाला।",
      duration: "1:05:22",
      date: "18 जून 2023",
      category: "तकनीक",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      views: "950K"
    },
    {
      id: 3,
      title: "ग्रामीण भारत में पत्रकारिता",
      description: "भारत के ग्रामीण इलाकों में पत्रकारिता की चुनौतियाँ और अवसरों पर केन्द्रित यह डॉक्यूमेंट्री।",
      duration: "1:35:10",
      date: "25 जून 2023",
      category: "पत्रकारिता",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      views: "1.8M"
    }
  ];

  const categories = [
    { name: "इतिहास", count: 15 },
    { name: "तकनीक", count: 12 },
    { name: "पत्रकारिता", count: 18 },
    { name: "समाचार", count: 10 },
    { name: "फिल्म निर्माण", count: 8 },
    { name: "सामाजिक मुद्दे", count: 14 }
  ];

  const latestReleases = [
    ...featuredDocumentaries,
    {
      id: 4,
      title: "फेक न्यूज का खेल",
      description: "फेक न्यूज कैसे बनती है और इसके समाज पर क्या प्रभाव पड़ते हैं, इस पर एक विस्तृत डॉक्यूमेंट्री।",
      duration: "1:12:30",
      date: "2 जुलाई 2023",
      category: "समाचार",
      image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c7e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      views: "1.5M"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">रवियोपीडिया डॉक्यूमेंट्री</h1>
            <p className="text-lg md:text-xl mb-8">
              गहन शोध और विश्लेषण पर आधारित उच्च गुणवत्ता वाली डॉक्यूमेंट्रीज। मीडिया, समाज और संस्कृति के विभिन्न पहलुओं पर विचारोत्तेजक कहानियाँ।
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-purple-800 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold flex items-center">
                <FaPlay className="mr-2" /> अभी देखें
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-purple-800 px-6 py-3 rounded-full font-semibold">
                सभी डॉक्यूमेंट्री देखें
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">डॉक्यूमेंट्री खोजें</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="विषय, श्रेणी या कीवर्ड से खोजें..."
              className="w-full px-5 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600">
              <FaSearch size={20} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {["ताजा", "लोकप्रिय", "इतिहास", "पत्रकारिता", "फिल्म निर्माण"].map((tag, index) => (
              <button key={index} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Documentaries */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">फीचर्ड डॉक्यूमेंट्री</h2>
          <a href="#" className="text-purple-600 hover:text-purple-800 font-medium flex items-center">
            सभी देखें <BsArrowRight className="ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDocumentaries.map(doc => (
            <div key={doc.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative">
                <img 
                  src={doc.image} 
                  alt={doc.title}
                  className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 text-purple-800 rounded-full p-4 hover:bg-white transition-all">
                  <FaPlay size={20} />
                </button>
                <span className="absolute bottom-4 left-4 bg-purple-800 text-white text-sm px-3 py-1 rounded-full">
                  {doc.category}
                </span>
                <span className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {doc.duration}
                </span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{doc.title}</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <BsThreeDotsVertical />
                  </button>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{doc.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-1" /> {doc.date}
                  </span>
                  <span className="flex items-center">
                    <FaEye className="mr-1" /> {doc.views}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <button className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                    पूरी जानकारी
                  </button>
                  <div className="flex space-x-3">
                    <button className="text-gray-400 hover:text-purple-600">
                      <FaShareAlt />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">श्रेणियाँ ब्राउज़ करें</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow cursor-pointer hover:border-purple-500 border border-transparent">
                <div className="bg-purple-100 text-purple-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaPlay />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} डॉक्यूमेंट्री</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Releases */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">नवीनतम रिलीज़</h2>
        <div className="space-y-6">
          {latestReleases.map((doc, index) => (
            <div key={`latest-${index}`} className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 relative">
                <img 
                  src={doc.image} 
                  alt={doc.title}
                  className="w-full h-40 md:h-full object-cover rounded-lg"
                />
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {doc.duration}
                </span>
              </div>
              <div className="md:w-3/4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-2">
                      {doc.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">{doc.title}</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <BsThreeDotsVertical />
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{doc.description}</p>
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex space-x-4 text-sm text-gray-500 mb-2 md:mb-0">
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-1" /> {doc.date}
                    </span>
                    <span className="flex items-center">
                      <FaEye className="mr-1" /> {doc.views}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center text-sm">
                      <FaPlay className="mr-2" /> देखें
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-full">
                      <FaShareAlt size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-full font-medium">
            और डॉक्यूमेंट्री लोड करें
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">अपनी खुद की डॉक्यूमेंट्री बनाना चाहते हैं?</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            हमारे विशेषज्ञों से जुड़ें और सीखें कि कैसे अपनी कहानियों को प्रभावशाली डॉक्यूमेंट्री में बदलें।
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-purple-800 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold">
              हमसे संपर्क करें
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-purple-800 px-6 py-3 rounded-full font-semibold">
              वर्कशॉप देखें
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
