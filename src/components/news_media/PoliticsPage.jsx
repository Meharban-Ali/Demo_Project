import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHouse,
  FaLandmarkDome,
  FaPen,
  FaClock
} from 'react-icons/fa6';

export const PoliticsPage = () => {
  // Politics news data array
  const newsArticles = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1567791124560-68e6ba7a2fe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "राजनीति",
      title: "केंद्र सरकार का बड़ा फैसला: अब सभी सरकारी योजनाओं का लाभ सीधे लाभार्थियों के खाते में जाएगा",
      date: "05 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1575320181282-9afab399332c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "राजनीति",
      title: "लोकसभा चुनाव 2025: पहले चरण के मतदान के लिए तैयार हैं 20 राज्यों के 102 संसदीय क्षेत्र",
      date: "04 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "राजनीति",
      title: "राहुल गांधी की भारत जोड़ो यात्रा: दिल्ली पहुंचने पर हजारों कार्यकर्ताओं ने किया स्वागत",
      date: "04 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "राजनीति",
      title: "नए कृषि विधेयक पर संसद में बहस: किसान संगठनों ने फिर उठाए सवाल",
      date: "03 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "राजनीति",
      title: "प्रधानमंत्री मोदी ने वाराणसी में किया 5 नए परियोजनाओं का उद्घाटन",
      date: "03 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "राजनीति",
      title: "राज्यसभा में विपक्ष ने उठाए सरकारी नीतियों पर सवाल, गृह मंत्री ने दिए जवाब",
      date: "02 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "राजनीति",
      title: "सुप्रीम कोर्ट का अहम फैसला: नागरिकता संशोधन कानून पर सुनवाई अगले महीने",
      date: "02 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "राजनीति",
      title: "कांग्रेस नेता प्रियंका गांधी ने उत्तर प्रदेश में किया नया कार्यालय उद्घाटन",
      date: "01 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1575320181282-9afab399332c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "राजनीति",
      title: "राज्यपालों की नियुक्ति पर विवाद: कई राज्यों ने केंद्र सरकार को भेजा ज्ञापन",
      date: "01 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1567791124560-68e6ba7a2fe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "राजनीति",
      title: "नई शिक्षा नीति पर संसदीय समिति की बैठक: विशेषज्ञों ने रखे अपने सुझाव",
      date: "31 मार्च 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "राजनीति",
      title: "वित्त मंत्री निर्मला सीतारमण ने पेश किया आर्थिक सर्वेक्षण 2024-25",
      date: "30 मार्च 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">राजनीति</h3>
        <div className="relative overflow-hidden h-1">
          <div className="absolute top-0 left-0 right-0 h-full bg-gray-200"></div>
          <div className="absolute top-0 left-0 h-full w-8 bg-blue-600 rounded-full animate-marquee"></div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6 p-4 shadow-lg bg-gray-100 rounded-lg">
        <div className="breadcrumbs__col">
          <Link to="/" className="flex items-center text-blue-600 hover:text-gray-800">
            <FaHouse className="mr-1" /> होम
          </Link>
        </div>
        <span className="mx-2">/</span>
        <div className="breadcrumbs__col">
          <Link to="/politics" className="flex items-center text-blue-600 hover:text-gray-800">
            <FaLandmarkDome className="mr-1" /> राजनीति
          </Link>
        </div>
        <span className="mx-2">/</span>
        <div className="breadcrumbs__col">
          <span className="flex items-center text-gray-800">
            <FaPen className="mr-1" /> ताज़ा खबरें
          </span>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="mb-8 text-center bg-white p-2 rounded-lg shadow-md">
        <Link to="/advertisement">
          <img 
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Advertisement" 
            className="w-full max-w-4xl mx-auto rounded-md"
          />
        </Link>
      </div>

      {/* News Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {newsArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* News Image */}
            <div className="relative">
              <Link to={`/news/${article.id}`}>
                <img 
                  src={article.image} 
                  alt="News" 
                  className="w-full h-48 object-cover"
                />
              </Link>
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {article.category}
              </span>
            </div>

            {/* News Content */}
            <div className="p-4">
              <Link to={`/news/${article.id}`} className="hover:text-blue-600">
                <h3 className="font-bold text-lg mb-2">
                  {article.title}
                </h3>
              </Link>

              {/* Published Date */}
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <FaClock className="mr-1" /> {article.date}
              </div>

              {/* Publisher */}
              <div className="flex items-center">
                <Link to="/about">
                  <img 
                    src={article.publisherImage} 
                    alt={article.publisher} 
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                </Link>
                <Link to="/about" className="text-sm text-gray-600 hover:text-blue-600">
                  {article.publisher}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mb-8">
        <ul className="flex space-x-2">
          {[1, 2, 3].map((page) => (
            <li key={page}>
              <Link 
                to={`/politics/page/${page}`}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-blue-600 hover:text-white block"
              >
                {page}
              </Link>
            </li>
          ))}
          <li>
            <Link 
              to="/politics/page/next" 
              className="px-3 py-1 bg-gray-200 rounded hover:bg-blue-600 hover:text-white block"
            >
              &raquo;
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom Ad Banner */}
      <div className="mb-8 text-center bg-white p-2 rounded-lg shadow-md">
        <Link to="/advertisement">
          <img 
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Advertisement" 
            className="w-full max-w-4xl mx-auto rounded-md"
          />
        </Link>
      </div>
    </div>
  );
};
