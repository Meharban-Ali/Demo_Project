import React, { useState, useEffect } from 'react';
import { FaNewspaper, FaDna, FaBriefcase, FaEarthAsia, FaLandmarkDome, FaTrophy, FaComputer, FaStarOfDavid, FaArrowUp } from 'react-icons/fa6';
import { GiClapperboard } from 'react-icons/gi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const HomeContent = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

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
    { id: 1, image: 'Assets/img/team/01.jpg', category: 'चुनाव', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
    { id: 2, image: 'Assets/img/team/02.jpg', category: 'एंटरटेनमेंट', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
    { id: 3, image: 'Assets/img/team/03.jpg', category: 'देश', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
    { id: 4, image: 'Assets/img/team/04.jpg', category: 'स्पोर्ट्स', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
    { id: 5, image: 'Assets/img/team/01.jpg', category: 'बिज़नेस', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
  ];

  // Category news data
  const categoryNews = [
    { 
      title: 'लाइफस्टाइल', 
      icon: <FaDna />,
      items: [
        { id: 1, image: 'Assets/img/category/01.jpg', category: 'लाइफस्टाइल', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
        { id: 2, image: 'Assets/img/category/02.jpg', category: 'लाइफस्टाइल', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
        { id: 3, image: 'Assets/img/category/03.jpg', category: 'लाइफस्टाइल', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
      ]
    },
    { 
      title: 'एंटरटेनमेंट', 
      icon: <GiClapperboard />,
      items: [
        { id: 4, image: 'Assets/img/category/04.jpg', category: 'एंटरटेनमेंट', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
        { id: 5, image: 'Assets/img/category/05.jpg', category: 'एंटरटेनमेंट', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
        { id: 6, image: 'Assets/img/category/06.jpg', category: 'एंटरटेनमेंट', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
      ]
    },
    { 
      title: 'बिज़नेस', 
      icon: <FaBriefcase />,
      items: [
        { id: 7, image: 'Assets/img/category/07.jpg', category: 'बिज़नेस', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
        { id: 8, image: 'Assets/img/category/08.jpg', category: 'बिज़नेस', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
        { id: 9, image: 'Assets/img/category/01.jpg', category: 'बिज़नेस', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
      ]
    },
    { 
      title: 'देश', 
      icon: <FaEarthAsia />,
      items: [
        { id: 10, image: 'Assets/img/category/02.jpg', category: 'देश', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
        { id: 11, image: 'Assets/img/category/03.jpg', category: 'देश', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
        { id: 12, image: 'Assets/img/category/04.jpg', category: 'देश', date: 'जनवरी 01, 2025', title: 'Sanctus amet sed ipsum lorem' },
      ]
    },
  ];

  // Politics news data
  const politicsNews = [
    { id: 1, image: 'Assets/img/category/01.jpg', category: 'राजनीति', date: 'जनवरी 01, 2025', title: 'Est stet amet ipsum stet clita rebum duo', description: 'Rebum dolore duo et vero ipsum clita, est ea sed duo diam ipsum, clita at justo, lorem amet vero eos sed sit...' },
    { id: 2, image: 'Assets/img/host/01.jpg', category: 'राजनीति', date: 'जनवरी 01, 2025', title: 'Lorem ipsum dolor sit amet consec adipis elit' },
    { id: 3, image: 'Assets/img/host/02.jpg', category: 'राजनीति', date: 'जनवरी 01, 2025', title: 'Lorem ipsum dolor sit amet consec adipis elit' },
    { id: 4, image: 'Assets/img/category/01.jpg', category: 'राजनीति', date: 'जनवरी 01, 2025', title: 'Est stet amet ipsum stet clita rebum duo', description: 'Rebum dolore duo et vero ipsum clita, est ea sed duo diam ipsum, clita at justo, lorem amet vero eos sed sit...' },
    { id: 5, image: 'Assets/img/host/03.jpg', category: 'राजनीति', date: 'जनवरी 01, 2025', title: 'Lorem ipsum dolor sit amet consec adipis elit' },
    { id: 6, image: 'Assets/img/host/04.jpg', category: 'राजनीति', date: 'जनवरी 01, 2025', title: 'Lorem ipsum dolor sit amet consec adipis elit' },
  ];

  // Sports and Tech news data
  const sportsTechNews = [
    { 
      title: 'खेल', 
      icon: <FaTrophy />,
      items: [
        { id: 1, image: 'Assets/img/category/01.jpg', category: 'खेल', date: 'जनवरी 01, 2025', title: 'Est stet amet ipsum stet clita rebum duo', description: 'Rebum dolore duo et vero ipsum clita, est ea sed duo diam ipsum, clita at justo, lorem amet vero eos sed sit...' },
        { id: 2, image: 'Assets/img/host/01.jpg', category: 'खेल', date: 'जनवरी 01, 2025', title: 'Lorem ipsum dolor sit amet consec adipis elit' },
        { id: 3, image: 'Assets/img/host/02.jpg', category: 'खेल', date: 'जनवरी 01, 2025', title: 'Lorem ipsum dolor sit amet consec adipis elit' },
      ]
    },
    { 
      title: 'टेक्नोलॉजी', 
      icon: <FaComputer />,
      items: [
        { id: 4, image: 'Assets/img/category/02.jpg', category: 'टेक्नोलॉजी', date: 'जनवरी 01, 2025', title: 'Est stet amet ipsum stet clita rebum duo', description: 'Rebum dolore duo et vero ipsum clita, est ea sed duo diam ipsum, clita at justo, lorem amet vero eos sed sit...' },
        { id: 5, image: 'Assets/img/host/03.jpg', category: 'टेक्नोलॉजी', date: 'जनवरी 01, 2025', title: 'Lorem ipsum dolor sit amet consec adipis elit' },
        { id: 6, image: 'Assets/img/host/04.jpg', category: 'टेक्नोलॉजी', date: 'जनवरी 01, 2025', title: 'Lorem ipsum dolor sit amet consec adipis elit' },
      ]
    },
  ];

  // Load external scripts for widgets
  useEffect(() => {
    // Weather widget script
    const loadWeatherWidget = () => {
      const script = document.createElement('script');
      script.src = 'https://app3.weatherwidget.org/js/?id=ww_deb281764b71c';
      script.async = true;
      document.body.appendChild(script);
    };

    // Cricket widget script
    const loadCricketWidget = () => {
      const scoreFrame = document.getElementById('score-frame');
      if (scoreFrame) {
        scoreFrame.innerHTML = '<iframe src="https://cwidget.crictimes.org/?v=1.1&a=2196f3&c=2196f3&bo=2196f3&b=ffffff&sb=ffffff&lb=ff0000&lc=ffffff&db=2196f3&dc=ffffff&tc=2196f3&ti=ffffff" style="width:100%;min-height:460px;border:none;"></iframe>';
      }
    };

    loadWeatherWidget();
    loadCricketWidget();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="font-sans bg-gray-50 ml-8">
      {/* Featured News Slider */}
      <div className="container-fluid py-3 bg-white">
        <div className="container">
          <div className="flex items-center justify-between bg-gray-100 py-2 px-4 mb-3 rounded">
            <h3 className="m-0 text-lg font-semibold flex items-center">
              <FaNewspaper className="mr-2" /> न्यूज़
            </h3>
            <a className="text-gray-600 font-medium text-decoration-none hover:text-blue-600" href="#">
              और देखें
            </a>
          </div>
          <Slider {...sliderSettings}>
            {featuredNews.map((news) => (
              <div key={news.id} className="px-2">
                <div className="relative overflow-hidden rounded-lg" style={{ height: '300px' }}>
                  <img 
                    className="w-full h-full object-cover" 
                    src={news.image} 
                    alt={news.title}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                    <div className="mb-1 text-sm">
                      <a className="text-white hover:text-blue-300" href="#">{news.category}</a>
                      <span className="px-1">/</span>
                      <a className="text-white hover:text-blue-300" href="#">{news.date}</a>
                    </div>
                    <a className="text-lg font-semibold hover:text-blue-300" href="#">{news.title}</a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Category News Slider */}
      <div className="container-fluid bg-white">
        <div className="container">
          {categoryNews.map((category, index) => (
            <div key={index} className="py-3">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gray-100 py-2 px-4 mb-3">
                  <h3 className="m-0 text-lg font-semibold flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    <a href="#" className="hover:text-blue-600">{category.title}</a>
                  </h3>
                </div>
                <Slider {...categorySliderSettings}>
                  {category.items.map((item) => (
                    <div key={item.id} className="px-2">
                      <div className="relative">
                        <img 
                          className="w-full h-48 object-cover rounded" 
                          src={item.image} 
                          alt={item.title}
                        />
                        <div className="p-2 bg-white">
                          <div className="mb-2 text-xs text-gray-600">
                            <a href="#" className="hover:text-blue-600">{item.category}</a>
                            <span className="px-1">/</span>
                            <span>{item.date}</span>
                          </div>
                          <a className="text-md font-semibold hover:text-blue-600" href="#">{item.title}</a>
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
      <div className="container-fluid py-3 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Politics News */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
                <div className="flex items-center justify-between bg-gray-100 py-2 px-4 mb-3">
                  <h3 className="m-0 text-lg font-semibold flex items-center">
                    <FaLandmarkDome className="mr-2" /> राजनीति
                  </h3>
                  <a className="text-gray-600 font-medium text-decoration-none hover:text-blue-600" href="#">
                    और देखें
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {politicsNews.slice(0, 2).map((news) => (
                    <div key={news.id} className="relative">
                      <img 
                        className="w-full h-64 object-cover rounded" 
                        src={news.image} 
                        alt={news.title}
                      />
                      <div className="mt-2">
                        <div className="mb-2 text-sm text-gray-600">
                          <a href="#" className="hover:text-blue-600">{news.category}</a>
                          <span className="px-1">/</span>
                          <span>{news.date}</span>
                        </div>
                        <a className="text-lg font-semibold hover:text-blue-600" href="#">{news.title}</a>
                        <p className="mt-1 text-gray-700">{news.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {politicsNews.slice(2, 6).map((news) => (
                    <div key={news.id} className="flex">
                      <img 
                        className="w-24 h-24 object-cover rounded" 
                        src={news.image} 
                        alt={news.title}
                      />
                      <div className="w-full flex flex-col justify-center bg-gray-50 px-3">
                        <div className="mb-1 text-xs text-gray-600">
                          <a href="#" className="hover:text-blue-600">{news.category}</a>
                          <span className="px-1">/</span>
                          <span>{news.date}</span>
                        </div>
                        <a className="text-sm font-semibold hover:text-blue-600" href="#">{news.title}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advertisement */}
              <div className="mb-6">
                <a href="#">
                  <img className="w-full rounded" src="Assets/img/ad/ads-700x100.jpg" alt="Advertisement" />
                </a>
              </div>

              {/* Sports and Technology News */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {sportsTechNews.map((section, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between bg-gray-100 py-2 px-4 mb-3">
                      <h3 className="m-0 text-lg font-semibold flex items-center">
                        <span className="mr-2">{section.icon}</span>
                        {section.title}
                      </h3>
                      <a className="text-gray-600 font-medium text-decoration-none hover:text-blue-600" href="#">
                        और देखें
                      </a>
                    </div>
                    <div className="p-4">
                      {section.items.slice(0, 1).map((item) => (
                        <div key={item.id} className="mb-4">
                          <img 
                            className="w-full h-48 object-cover rounded" 
                            src={item.image} 
                            alt={item.title}
                          />
                          <div className="mt-2">
                            <div className="mb-2 text-sm text-gray-600">
                              <a href="#" className="hover:text-blue-600">{item.category}</a>
                              <span className="px-1">/</span>
                              <span>{item.date}</span>
                            </div>
                            <a className="text-lg font-semibold hover:text-blue-600" href="#">{item.title}</a>
                            <p className="mt-1 text-gray-700">{item.description}</p>
                          </div>
                        </div>
                      ))}
                      {section.items.slice(1, 3).map((item) => (
                        <div key={item.id} className="flex mb-3">
                          <img 
                            className="w-20 h-20 object-cover rounded" 
                            src={item.image} 
                            alt={item.title}
                          />
                          <div className="w-full flex flex-col justify-center bg-gray-50 px-3">
                            <div className="mb-1 text-xs text-gray-600">
                              <a href="#" className="hover:text-blue-600">{item.category}</a>
                              <span className="px-1">/</span>
                              <span>{item.date}</span>
                            </div>
                            <a className="text-sm font-semibold hover:text-blue-600" href="#">{item.title}</a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Large Advertisement */}
              <div className="mb-6">
                <a href="#">
                  <img className="w-full rounded" src="Assets/img/ad/ads-700x150.jpg" alt="Advertisement" />
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Weather Widget */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 p-4">
                <div className="tomorrow" 
                  data-location-id="" 
                  data-language="HI" 
                  data-unit-system="METRIC" 
                  data-skin="light" 
                  data-widget-type="aqiPollen" 
                  style={{paddingBottom: '22px', position: 'relative'}}>
                  <a 
                    href="https://www.tomorrow.io/weather-api/" 
                    rel="nofollow noopener noreferrer" 
                    target="_blank" 
                    style={{position: 'absolute', bottom: '0', transform: 'translateX(-50%)', left: '50%'}}>
                    <img 
                      alt="Powered by the Tomorrow.io Weather API" 
                      src="https://weather-website-client.tomorrow.io/img/powered-by.svg" 
                      width="250" 
                      height="18" 
                    />
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 p-4">
                <div className="text-center mb-3">
                  <h3 className="text-lg font-semibold">Newsletter</h3>
                </div>
                <div className="text-center">
                  <span className="block mb-3">Join 50,000 subscribers</span>
                  <form>
                    <div className="mb-2">
                      <input 
                        type="email" 
                        className="w-full p-2 border border-gray-300 rounded text-center" 
                        placeholder="Email address..." 
                      />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                      Sign Up
                    </button>
                  </form>
                  <span className="block mt-3 text-xs">
                    By signing up, you agree to our <a href="#" className="text-blue-600">Privacy policy</a>
                  </span>
                </div>
              </div>

              {/* Advertisement */}
              <div className="mb-6">
                <a href="#">
                  <img className="w-full rounded" src="Assets/img/ad/RAVIOPEDIA.png" alt="Advertisement" />
                </a>
              </div>

              {/* Weather Forecast */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 p-4">
                <div className="flex items-center justify-between bg-gray-100 py-2 px-4 mb-3">
                  <h3 className="m-0 text-lg font-semibold flex items-center">
                    <FaStarOfDavid className="mr-2" /> मौसम
                  </h3>
                </div>
                <div id="ww_deb281764b71c" v='1.3' loc='auto' a='{"t":"horizontal","lang":"en","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'>
                  More forecasts: <a href="https://oneweather.org/orlando/30_days/" id="ww_deb281764b71c_u" target="_blank">30 day forecast Orlando</a>
                </div>
              </div>

              {/* Cricket Score */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="flex items-center justify-between bg-gray-100 py-2 px-4 mb-3">
                  <h3 className="m-0 text-lg font-semibold flex items-center">
                    <FaTrophy className="mr-2" /> क्रिकेट स्कोर
                  </h3>
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
        <a href="#" className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center">
          <FaArrowUp className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};