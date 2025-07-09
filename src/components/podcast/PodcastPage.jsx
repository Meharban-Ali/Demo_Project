import React from 'react';
import { FaPlay, FaClock, FaHeadphones, FaMicrophone, FaShareAlt, FaHeart } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const PodcastPage = () => {
  // Sample podcast data
  const featuredPodcasts = [
    {
      id: 1,
      title: "मीडिया और समाज की भूमिका",
      description: "इस एपिसोड में हम चर्चा करेंगे कि आज के दौर में मीडिया की समाज में क्या भूमिका है और यह कैसे जनमत को प्रभावित करता है।",
      duration: "45:22",
      date: "15 मई 2023",
      category: "मीडिया विश्लेषण",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      listens: "12.5k"
    },
    {
      id: 2,
      title: "डिजिटल मीडिया का उदय",
      description: "पारंपरिक मीडिया से डिजिटल मीडिया की ओर बढ़ते इस सफर पर विशेषज्ञों के साथ विस्तृत चर्चा।",
      duration: "38:15",
      date: "22 मई 2023",
      category: "डिजिटल मीडिया",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      listens: "9.8k"
    },
    {
      id: 3,
      title: "समाचारों में निष्पक्षता",
      description: "समाचार मीडिया में निष्पक्षता क्या है और कैसे इसे सुनिश्चित किया जा सकता है, इस पर गहन विश्लेषण।",
      duration: "52:40",
      date: "30 मई 2023",
      category: "समाचार विश्लेषण",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      listens: "15.2k"
    }
  ];

  const categories = [
    { name: "मीडिया विश्लेषण", count: 24 },
    { name: "समाचार विश्लेषण", count: 18 },
    { name: "डिजिटल मीडिया", count: 15 },
    { name: "पत्रकारिता", count: 12 },
    { name: "सोशल मीडिया", count: 20 },
    { name: "फिल्म और टीवी", count: 16 }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Raviopedia Podcast</h1>
            <p className="text-lg md:text-xl mb-8">
              मीडिया, समाचार और संचार के विभिन्न पहलुओं पर गहन चर्चा और विश्लेषण। विशेषज्ञों के साथ संवाद और ताजा जानकारी।
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-800 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold flex items-center">
                <FaPlay className="mr-2" /> सुनना शुरू करें
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-blue-800 px-6 py-3 rounded-full font-semibold">
                सभी एपिसोड देखें
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Featured Podcasts */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">फीचर्ड पॉडकास्ट</h2>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">सभी देखें</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPodcasts.map(podcast => (
            <div key={podcast.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={podcast.image} 
                  alt={podcast.title}
                  className="w-full h-48 md:h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 text-blue-800 rounded-full p-4 hover:bg-white transition-all">
                  <FaPlay size={20} />
                </button>
                <span className="absolute bottom-4 left-4 bg-blue-800 text-white text-sm px-3 py-1 rounded-full">
                  {podcast.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{podcast.title}</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <BsThreeDotsVertical />
                  </button>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{podcast.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <FaClock className="mr-1" /> {podcast.duration}
                  </span>
                  <span className="flex items-center">
                    <FaHeadphones className="mr-1" /> {podcast.listens}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-gray-500 text-sm">{podcast.date}</span>
                  <div className="flex space-x-3">
                    <button className="text-gray-400 hover:text-blue-600">
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">श्रेणियाँ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaMicrophone />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} एपिसोड</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Episodes */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">नवीनतम एपिसोड</h2>
        <div className="space-y-6">
          {[...featuredPodcasts, ...featuredPodcasts].slice(0, 4).map((podcast, index) => (
            <div key={`latest-${index}`} className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <img 
                  src={podcast.image} 
                  alt={podcast.title}
                  className="w-full h-40 md:h-full object-cover rounded-lg"
                />
              </div>
              <div className="md:w-3/4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                      {podcast.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">{podcast.title}</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <BsThreeDotsVertical />
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{podcast.description}</p>
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex space-x-4 text-sm text-gray-500 mb-2 md:mb-0">
                    <span className="flex items-center">
                      <FaClock className="mr-1" /> {podcast.duration}
                    </span>
                    <span className="flex items-center">
                      <FaHeadphones className="mr-1" /> {podcast.listens}
                    </span>
                    <span>{podcast.date}</span>
                  </div>
                  <div className="flex space-x-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center text-sm">
                      <FaPlay className="mr-2" /> सुनें
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
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-medium">
            और एपिसोड लोड करें
          </button>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">पॉडकास्ट सब्सक्राइब करें</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            नए एपिसोड की सूचना सीधे अपने इनबॉक्स में प्राप्त करें। किसी भी प्लेटफॉर्म पर हमारे पॉडकास्ट सुनें।
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="आपका ईमेल पता" 
              className="flex-grow px-4 py-3 rounded-full text-gray-800 focus:outline-none"
            />
            <button className="bg-white text-blue-800 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold whitespace-nowrap">
              सब्सक्राइब करें
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
