import React, { useState, useEffect } from 'react';
import { FaNewspaper, FaDna, FaBriefcase, FaEarthAsia, FaLandmarkDome, FaTrophy, FaComputer, FaStarOfDavid, FaArrowUp, FaYoutube, FaInstagram, FaFacebook, FaShare } from 'react-icons/fa6';
import { GiClapperboard } from 'react-icons/gi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const HomeContent = () => {
  const [showMore, setShowMore] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Note: In a real app, you would use an actual weather API with your API key
        // This is a mock response for demonstration
        const mockWeatherData = {
          temp: 28,
          condition: "Partly Cloudy",
          humidity: 65,
          wind: 12,
          icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png",
          location: "New Delhi"
        };
        
        setTimeout(() => {
          setWeatherData(mockWeatherData);
          setLoadingWeather(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const categorySliderSettings = {
    ...sliderSettings,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  // Featured news data
  const featuredNews = [
    { 
      id: 1, 
      image: 'https://resize.indiatvnews.com/en/resize/gallery/840_-/2025/02/ec3-1738484216.jpg', 
      category: 'चुनाव', 
      date: 'जनवरी 01, 2025', 
      title: '2025 के आम चुनाव: क्या बदल सकता है राजनीतिक परिदृश्य?' 
    },
    { 
      id: 2, 
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
      category: 'एंटरटेनमेंट', 
      date: 'जनवरी 01, 2025', 
      title: 'बॉलीवुड की नई फिल्मों ने तोड़े सारे रिकॉर्ड' 
    },
    { 
      id: 3, 
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
      category: 'देश', 
      date: 'जनवरी 01, 2025', 
      title: 'देश में कोरोना के नए मामलों में गिरावट' 
    },
    { 
      id: 4, 
      image: 'https://feeds.abplive.com/onecms/images/uploaded-images/2025/02/02/1e06b5bc8335c0d0ef4634df688887131738487537067344_original.jpg?impolicy=abp_cdn&imwidth=1200&height=675', 
      category: 'स्पोर्ट्स', 
      date: 'जनवरी 01, 2025', 
      title: 'भारतीय क्रिकेट टीम ने जीता T20 वर्ल्ड कप' 
    },
    { 
      id: 5, 
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
      category: 'बिज़नेस', 
      date: 'जनवरी 01, 2025', 
      title: 'स्टार्टअप को बढ़ावा देने के लिए नई योजना' 
    },
  ];

  // Category news data
  const categoryNews = [
    { 
      title: 'लाइफस्टाइल', 
      icon: <FaDna />,
      items: [
        { 
          id: 1, 
          image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'लाइफस्टाइल', 
          date: 'जनवरी 01, 2025', 
          title: 'योग और मेडिटेशन से बेहतर जीवन' 
        },
        { 
          id: 2, 
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'लाइफस्टाइल', 
          date: 'जनवरी 01, 2025', 
          title: 'हेल्दी फूड हैबिट्स जो बदल देंगी आपकी लाइफ' 
        },
        { 
          id: 3, 
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'लाइफस्टाइल', 
          date: 'जनवरी 01, 2025', 
          title: 'ऑर्गेनिक फूड की बढ़ती लोकप्रियता' 
        },
      ]
    },
    { 
      title: 'एंटरटेनमेंट', 
      icon: <GiClapperboard />,
      items: [
        { 
          id: 4, 
          image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'एंटरटेनमेंट', 
          date: 'जनवरी 01, 2025', 
          title: 'ओटीटी प्लेटफॉर्म्स पर रिलीज होंगी ये बेहतरीन फिल्में' 
        },
        { 
          id: 5, 
          image: 'https://feeds.abplive.com/onecms/images/uploaded-images/2024/08/04/770e4c9798088dc4c5760c1c883521f917227729571671064_original.PNG?impolicy=abp_cdn&imwidth=720', 
          category: 'एंटरटेनमेंट', 
          date: 'जनवरी 01, 2025', 
          title: 'इस साल के सबसे ज्यादा कमाई करने वाले टीवी शो' 
        },
        { 
          id: 6, 
          image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'एंटरटेनमेंट', 
          date: 'जनवरी 01, 2025', 
          title: 'बॉलीवुड सेलेब्स की लेटेस्ट न्यूज और गॉसिप' 
        },
      ]
    },
    { 
      title: 'बिज़नेस', 
      icon: <FaBriefcase />,
      items: [
        { 
          id: 7, 
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'बिज़नेस', 
          date: 'जनवरी 01, 2025', 
          title: 'शेयर बाजार में आज कैसे रहा माहौल?' 
        },
        { 
          id: 8, 
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'बिज़नेस', 
          date: 'जनवरी 01, 2025', 
          title: 'क्रिप्टोकरेंसी में निवेश के टिप्स' 
        },
        { 
          id: 9, 
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'बिज़नेस', 
          date: 'जनवरी 01, 2025', 
          title: 'फाइनेंशियल प्लानिंग: कैसे करें अपने पैसों का सही निवेश' 
        },
      ]
    },
    { 
      title: 'देश', 
      icon: <FaEarthAsia />,
      items: [
        { 
          id: 10, 
          image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'देश', 
          date: 'जनवरी 01, 2025', 
          title: 'देशभर में मनाया गया गणतंत्र दिवस' 
        },
        { 
          id: 11, 
          image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'देश', 
          date: 'जनवरी 01, 2025', 
          title: 'नई शिक्षा नीति पर चर्चा' 
        },
        { 
          id: 12, 
          image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'देश', 
          date: 'जनवरी 01, 2025', 
          title: 'सरकार की नई योजनाएं जो बदल सकती हैं आपकी जिंदगी' 
        },
      ]
    },
  ];

  // Politics news data
  const politicsNews = [
    { 
      id: 1, 
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
      category: 'राजनीति', 
      date: 'जनवरी 01, 2025', 
      title: 'केंद्र सरकार ने पेश किया नया बजट', 
      description: 'वित्त मंत्री ने आज संसद में नया बजट पेश किया जिसमें मध्यम वर्ग के लिए कई राहत भरे प्रावधान किए गए हैं...' 
    },
    { 
      id: 2, 
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
      category: 'राजनीति', 
      date: 'जनवरी 01, 2025', 
      title: 'विपक्ष ने उठाए सरकार के खिलाफ सवाल' 
    },
    { 
      id: 3, 
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
      category: 'राजनीति', 
      date: 'जनवरी 01, 2025', 
      title: 'राज्यसभा में हुई महत्वपूर्ण बहस' 
    },
    { 
      id: 4, 
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
      category: 'राजनीति', 
      date: 'जनवरी 01, 2025', 
      title: 'चुनाव आयोग ने जारी की नई गाइडलाइंस', 
      description: 'आगामी चुनावों को लेकर चुनाव आयोग ने नई गाइडलाइंस जारी की हैं जिसमें सोशल मीडिया के इस्तेमाल पर विशेष ध्यान दिया गया है...' 
    },
    { 
      id: 5, 
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
      category: 'राजनीति', 
      date: 'जनवरी 01, 2025', 
      title: 'मुख्यमंत्री ने शुरू की नई योजना' 
    },
    { 
      id: 6, 
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
      category: 'राजनीति', 
      date: 'जनवरी 01, 2025', 
      title: 'राजनीतिक दलों की बैठक आज' 
    },
  ];

  // Sports and Tech news data
  const sportsTechNews = [
    { 
      title: 'खेल', 
      icon: <FaTrophy />,
      items: [
        { 
          id: 1, 
          image: 'https://images.unsplash.com/photo-1543357486-c2505d2bea59?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'खेल', 
          date: 'जनवरी 01, 2025', 
          title: 'भारतीय क्रिकेट टीम ने जीता T20 वर्ल्ड कप', 
          description: 'भारतीय क्रिकेट टीम ने फाइनल में इंग्लैंड को हराकर T20 वर्ल्ड कप जीत लिया है। यह भारत का तीसरा T20 वर्ल्ड कप खिताब है...' 
        },
        { 
          id: 2, 
          image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'खेल', 
          date: 'जनवरी 01, 2025', 
          title: 'ओलंपिक के लिए भारतीय टीम का चयन' 
        },
        { 
          id: 3, 
          image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'खेल', 
          date: 'जनवरी 01, 2025', 
          title: 'फुटबॉल लीग में भारतीय खिलाड़ी का शानदार प्रदर्शन' 
        },
      ]
    },
    { 
      title: 'टेक्नोलॉजी', 
      icon: <FaComputer />,
      items: [
        { 
          id: 4, 
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'टेक्नोलॉजी', 
          date: 'जनवरी 01, 2025', 
          title: 'एप्पल ने लॉन्च किया नया आईफोन', 
          description: 'एप्पल ने अपना नया आईफोन 15 सीरीज लॉन्च कर दिया है जिसमें कई नए फीचर्स जोड़े गए हैं...' 
        },
        { 
          id: 5, 
          image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'टेक्नोलॉजी', 
          date: 'जनवरी 01, 2025', 
          title: '5G टेक्नोलॉजी भारत में लॉन्च' 
        },
        { 
          id: 6, 
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
          category: 'टेक्नोलॉजी', 
          date: 'जनवरी 01, 2025', 
          title: 'भारतीय स्टार्टअप ने बनाया यूनिक टेक्नोलॉजी प्रोडक्ट' 
        },
      ]
    },
  ];

  // Load external scripts for widgets
  useEffect(() => {
    // Cricket widget script
    const loadCricketWidget = () => {
      const scoreFrame = document.getElementById('score-frame');
      if (scoreFrame) {
        scoreFrame.innerHTML = '<iframe src="https://cwidget.crictimes.org/?v=1.1&a=2196f3&c=2196f3&bo=2196f3&b=ffffff&sb=ffffff&lb=ff0000&lc=ffffff&db=2196f3&dc=ffffff&tc=2196f3&ti=ffffff" style="width:100%;min-height:460px;border:none;"></iframe>';
      }
    };

    loadCricketWidget();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="font-sans bg-gray-50 ml-8">
      {/* Featured News Slider */}
      <div className="container-fluid py-3 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
        <div className="container">
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 py-2 px-4 mb-3 rounded-lg shadow-sm">
            <h3 className="m-0 text-lg font-semibold flex items-center text-white">
              <FaNewspaper className="mr-2" /> न्यूज़
            </h3>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-white hover:text-orange-300 transition-colors">
                <FaYoutube className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-orange-300 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-orange-300 transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-orange-300 transition-colors">
                <FaShare className="text-xl" />
              </a>
            </div>
          </div>
          <Slider {...sliderSettings}>
            {featuredNews.map((news) => (
              <div key={news.id} className="px-2">
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" style={{ height: '300px' }}>
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                    src={news.image} 
                    alt={news.title}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                    <div className="mb-1 text-sm">
                      <a className="text-white hover:text-orange-300 transition-colors" href="#">{news.category}</a>
                      <span className="px-1">/</span>
                      <a className="text-white hover:text-orange-300 transition-colors" href="#">{news.date}</a>
                    </div>
                    <a className="text-lg font-semibold hover:text-orange-300 transition-colors" href="#">{news.title}</a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Category News Slider */}
      <div className="container-fluid bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg mt-6">
        <div className="container">
          {categoryNews.map((category, index) => (
            <div key={index} className="py-3">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-2 px-4 mb-3 flex justify-between items-center">
                  <h3 className="m-0 text-lg font-semibold flex items-center text-white">
                    <span className="mr-2">{category.icon}</span>
                    <a href="#" className="hover:text-orange-300 transition-colors">{category.title}</a>
                  </h3>
                  <div className="flex items-center space-x-3">
                    <a href="#" className="text-white hover:text-orange-300 transition-colors">
                      <FaYoutube className="text-lg" />
                    </a>
                    <a href="#" className="text-white hover:text-orange-300 transition-colors">
                      <FaInstagram className="text-lg" />
                    </a>
                    <a href="#" className="text-white hover:text-orange-300 transition-colors">
                      <FaFacebook className="text-lg" />
                    </a>
                    <a href="#" className="text-white hover:text-orange-300 transition-colors">
                      <FaShare className="text-lg" />
                    </a>
                  </div>
                </div>
                <Slider {...categorySliderSettings}>
                  {category.items.map((item) => (
                    <div key={item.id} className="px-2">
                      <div className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                        <img 
                          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" 
                          src={item.image} 
                          alt={item.title}
                        />
                        <div className="p-3 bg-white">
                          <div className="mb-2 text-xs text-gray-600">
                            <a href="#" className="hover:text-blue-600 transition-colors">{item.category}</a>
                            <span className="px-1">/</span>
                            <span>{item.date}</span>
                          </div>
                          <a className="text-md font-semibold hover:text-blue-600 transition-colors" href="#">{item.title}</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News With Sidebar */}
      <div className="container-fluid py-3 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg mt-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Politics News */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
                <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 py-2 px-4 mb-3 rounded-t-lg">
                  <h3 className="m-0 text-lg font-semibold flex items-center text-white">
                    <FaLandmarkDome className="mr-2" /> राजनीति
                  </h3>
                  <div className="flex items-center space-x-4">
                    <a href="#" className="text-white hover:text-orange-300 transition-colors">
                      <FaYoutube className="text-lg" />
                    </a>
                    <a href="#" className="text-white hover:text-orange-300 transition-colors">
                      <FaInstagram className="text-lg" />
                    </a>
                    <a href="#" className="text-white hover:text-orange-300 transition-colors">
                      <FaFacebook className="text-lg" />
                    </a>
                    <a href="#" className="text-white hover:text-orange-300 transition-colors">
                      <FaShare className="text-lg" />
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {politicsNews.slice(0, 2).map((news) => (
                    <div key={news.id} className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                      <img 
                        className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105" 
                        src={news.image} 
                        alt={news.title}
                      />
                      <div className="mt-2 p-3">
                        <div className="mb-2 text-sm text-gray-600">
                          <a href="#" className="hover:text-blue-600 transition-colors">{news.category}</a>
                          <span className="px-1">/</span>
                          <span>{news.date}</span>
                        </div>
                        <a className="text-lg font-semibold hover:text-blue-600 transition-colors" href="#">{news.title}</a>
                        <p className="mt-1 text-gray-700">{news.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {politicsNews.slice(2, 6).map((news) => (
                    <div key={news.id} className="flex bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                      <img 
                        className="w-24 h-24 object-cover" 
                        src={news.image} 
                        alt={news.title}
                      />
                      <div className="w-full flex flex-col justify-center px-3">
                        <div className="mb-1 text-xs text-gray-600">
                          <a href="#" className="hover:text-blue-600 transition-colors">{news.category}</a>
                          <span className="px-1">/</span>
                          <span>{news.date}</span>
                        </div>
                        <a className="text-sm font-semibold hover:text-blue-600 transition-colors" href="#">{news.title}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advertisement */}
              <div className="mb-6 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <a href="#">
                  <img className="w-full rounded" src="https://via.placeholder.com/700x100" alt="Advertisement" />
                </a>
              </div>

              {/* Sports and Technology News */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {sportsTechNews.map((section, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 py-2 px-4 mb-3 rounded-t-lg">
                      <h3 className="m-0 text-lg font-semibold flex items-center text-white">
                        <span className="mr-2">{section.icon}</span>
                        {section.title}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <a href="#" className="text-white hover:text-orange-300 transition-colors">
                          <FaYoutube className="text-lg" />
                        </a>
                        <a href="#" className="text-white hover:text-orange-300 transition-colors">
                          <FaInstagram className="text-lg" />
                        </a>
                        <a href="#" className="text-white hover:text-orange-300 transition-colors">
                          <FaFacebook className="text-lg" />
                        </a>
                        <a href="#" className="text-white hover:text-orange-300 transition-colors">
                          <FaShare className="text-lg" />
                        </a>
                      </div>
                    </div>
                    <div className="p-4">
                      {section.items.slice(0, 1).map((item) => (
                        <div key={item.id} className="mb-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                          <img 
                            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" 
                            src={item.image} 
                            alt={item.title}
                          />
                          <div className="mt-2 p-3">
                            <div className="mb-2 text-sm text-gray-600">
                              <a href="#" className="hover:text-blue-600 transition-colors">{item.category}</a>
                              <span className="px-1">/</span>
                              <span>{item.date}</span>
                            </div>
                            <a className="text-lg font-semibold hover:text-blue-600 transition-colors" href="#">{item.title}</a>
                            <p className="mt-1 text-gray-700">{item.description}</p>
                          </div>
                        </div>
                      ))}
                      {section.items.slice(1, 3).map((item) => (
                        <div key={item.id} className="flex mb-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                          <img 
                            className="w-20 h-20 object-cover" 
                            src={item.image} 
                            alt={item.title}
                          />
                          <div className="w-full flex flex-col justify-center px-3">
                            <div className="mb-1 text-xs text-gray-600">
                              <a href="#" className="hover:text-blue-600 transition-colors">{item.category}</a>
                              <span className="px-1">/</span>
                              <span>{item.date}</span>
                            </div>
                            <a className="text-sm font-semibold hover:text-blue-600 transition-colors" href="#">{item.title}</a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Large Advertisement */}
              <div className="mb-6 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <a href="#">
                  <img className="w-full rounded" src="https://via.placeholder.com/700x150" alt="Advertisement" />
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Weather Widget */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 mb-6 p-4">
                <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 py-2 px-4 mb-3 rounded-t-lg">
                  <h3 className="m-0 text-lg font-semibold flex items-center text-white">
                    <FaStarOfDavid className="mr-2" /> मौसम
                  </h3>
                  <div className="flex items-center space-x-2">
                    <a href="#" className="text-white hover:text-orange-300 transition-colors">
                      <FaShare className="text-lg" />
                    </a>
                  </div>
                </div>
                {loadingWeather ? (
                  <div className="text-center py-4">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-24 w-24 bg-gray-200 rounded-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ) : weatherData ? (
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <img src={weatherData.icon} alt="Weather icon" className="w-16 h-16" />
                    </div>
                    <h4 className="text-2xl font-bold mb-1">{weatherData.temp}°C</h4>
                    <p className="text-gray-700 mb-2">{weatherData.condition}</p>
                    <p className="text-sm text-gray-600">{weatherData.location}</p>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="block text-gray-500">Humidity</span>
                        <span className="font-medium">{weatherData.humidity}%</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="block text-gray-500">Wind</span>
                        <span className="font-medium">{weatherData.wind} km/h</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Weather data unavailable
                  </div>
                )}
              </div>

              {/* Newsletter */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 mb-6 p-4">
                <div className="text-center mb-3">
                  <h3 className="text-lg font-semibold text-blue-700">Newsletter</h3>
                </div>
                <div className="text-center">
                  <span className="block mb-3 text-gray-600">Join 50,000 subscribers</span>
                  <form>
                    <div className="mb-2">
                      <input 
                        type="email" 
                        className="w-full p-2 border border-gray-300 rounded-lg text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Email address..." 
                      />
                    </div>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md">
                      Sign Up
                    </button>
                  </form>
                  <div className="flex justify-center space-x-4 mt-3">
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                      <FaYoutube className="text-xl" />
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                      <FaInstagram className="text-xl" />
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                      <FaFacebook className="text-xl" />
                    </a>
                  </div>
                  <span className="block mt-3 text-xs text-gray-500">
                    By signing up, you agree to our <a href="#" className="text-blue-600 hover:text-blue-800">Privacy policy</a>
                  </span>
                </div>
              </div>

              {/* Advertisement */}
              <div className="mb-6 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <a href="#">
                  <img className="w-full rounded" src="https://via.placeholder.com/300x250" alt="Advertisement" />
                </a>
              </div>

              {/* Cricket Score */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
                <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 py-2 px-4 mb-3 rounded-t-lg">
                  <h3 className="m-0 text-lg font-semibold flex items-center text-white">
                    <FaTrophy className="mr-2" /> क्रिकेट स्कोर
                  </h3>
                  <div className="flex items-center space-x-2">
                    <a href="#" className="text-white hover:text-orange-300 transition-colors">
                      <FaShare className="text-lg" />
                    </a>
                  </div>
                </div>
                <div id="score-frame" style={{ minHeight: '460px' }}>
                  Loading cricket scores...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <div className="fixed bottom-6 right-6">
        <a href="#" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all hover:shadow-xl flex items-center justify-center">
          <FaArrowUp className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};