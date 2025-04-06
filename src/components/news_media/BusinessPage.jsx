import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHouse,
  FaBusinessTime,
  FaPen,
  FaClock
} from 'react-icons/fa6';

export const BusinessPage = () => {
  // Business news data array
  const businessArticles = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1554224161-6b0c6b1bcd51?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "बिज़नेस",
      title: "रिलायंस इंडस्ट्रीज ने लॉन्च किया नया रिटेल बिज़नेस, 10,000 करोड़ का निवेश",
      date: "05 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "बिज़नेस",
      title: "स्टार्टअप्स को बढ़ावा: सरकार ने घोषित किया 500 करोड़ का नया फंड",
      date: "04 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "बिज़नेस",
      title: "टाटा ग्रुप ने एयर इंडिया के बाद अब इस बड़ी कंपनी में किया निवेश",
      date: "04 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "बिज़नेस",
      title: "डिजिटल पेमेंट में बढ़ोतरी: UPI ने फिर बनाया रिकॉर्ड, 10 लाख करोड़ का लेनदेन",
      date: "03 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "बिज़नेस",
      title: "स्टॉक मार्केट में तेजी: सेंसेक्स 60,000 के पार, निवेशकों को मिला बड़ा फायदा",
      date: "03 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "बिज़नेस",
      title: "ई-कॉमर्स सेक्टर में बढ़ोतरी: फ्लिपकार्ट और अमेजन ने मनाया रिकॉर्ड सेल",
      date: "02 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "बिज़नेस",
      title: "ऑटोमोबाइल सेक्टर में मंदी: कार कंपनियों ने घटाई उत्पादन की गति",
      date: "02 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "बिज़नेस",
      title: "क्रिप्टोकरेंसी पर सरकार का बड़ा फैसला: नए नियमों की घोषणा",
      date: "01 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "बिज़नेस",
      title: "फिनटेक कंपनियों के लिए नए दिशा-निर्देश: RBI ने जारी की गाइडलाइन्स",
      date: "01 अप्रैल 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "बिज़नेस",
      title: "मेटावर्स में बढ़ता बिज़नेस: भारतीय कंपनियों ने किया बड़ा निवेश",
      date: "31 मार्च 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "बिज़नेस",
      title: "रियल एस्टेट सेक्टर में उछाल: बड़े शहरों में बढ़ी प्रॉपर्टी की कीमतें",
      date: "30 मार्च 2025",
      publisher: "रवि ओमेडिया",
      publisherImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">बिज़नेस</h3>
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
          <Link to="/business" className="flex items-center text-blue-600 hover:text-gray-800">
            <FaBusinessTime className="mr-1" /> बिज़नेस
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

      {/* Business News Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {businessArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* News Image */}
            <div className="relative">
              <Link to={`/business-news/${article.id}`}>
                <img 
                  src={article.image} 
                  alt="Business News" 
                  className="w-full h-48 object-cover"
                />
              </Link>
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {article.category}
              </span>
            </div>

            {/* News Content */}
            <div className="p-4">
              <Link to={`/business-news/${article.id}`} className="hover:text-blue-600">
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
                to={`/business/page/${page}`}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-blue-600 hover:text-white block"
              >
                {page}
              </Link>
            </li>
          ))}
          <li>
            <Link 
              to="/business/page/next" 
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
