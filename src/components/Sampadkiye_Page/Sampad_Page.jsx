import React, { useState } from 'react';
import { FaInfoCircle, FaCalendarAlt, FaUserEdit, FaSearch, FaShareAlt, FaBookmark, FaRegComment } from 'react-icons/fa';
import { GiNewspaper } from 'react-icons/gi';
import { motion } from 'framer-motion';

export const Sampad_Page = () => {
  const [activeTab, setActiveTab] = useState('editorial');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarked, setBookmarked] = useState([]);

  // Sample data for editorials and interviews
  const contentData = {
    editorial: [
      {
        id: 1,
        title: 'भारतीय अर्थव्यवस्था: चुनौतियाँ और संभावनाएँ',
        author: 'डॉ. रमेश चंद्र',
        date: '15 मार्च 2024',
        excerpt: 'कोविड-19 के बाद की दुनिया में भारतीय अर्थव्यवस्था ने कई चुनौतियों का सामना किया है, लेकिन साथ ही नई संभावनाएँ भी पैदा हुई हैं...',
        content: 'कोविड-19 महामारी ने वैश्विक अर्थव्यवस्था को गहरा झटका दिया, और भारत भी इससे अछूता नहीं रहा। हालांकि, हाल के महीनों में आर्थिक सुधार के संकेत दिखाई दे रहे हैं। जीएसटी संग्रह में वृद्धि, विनिर्माण क्षेत्र में सुधार और निर्यात में तेजी इसके प्रमुख संकेतक हैं।',
        tags: ['अर्थव्यवस्था', 'नीति', 'विश्लेषण'],
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 2,
        title: 'शिक्षा प्रणाली में डिजिटल परिवर्तन',
        author: 'प्रो. अंजलि शर्मा',
        date: '10 मार्च 2024',
        excerpt: 'डिजिटल इंडिया की दिशा में शिक्षा क्षेत्र में हो रहे बदलाव और भविष्य की राह...',
        content: 'कोरोना काल ने भारतीय शिक्षा प्रणाली में एक बड़े बदलाव की शुरुआत की। ऑनलाइन शिक्षा जो पहले एक विकल्प मात्र थी, वह अब मुख्यधारा बन चुकी है। इस परिवर्तन ने शिक्षा के क्षेत्र में कई नई संभावनाओं के द्वार खोले हैं।',
        tags: ['शिक्षा', 'तकनीक', 'भविष्य'],
        image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 3,
        title: 'स्वास्थ्य सेवाओं में क्रांति',
        author: 'डॉ. सुमित शर्मा',
        date: '8 मार्च 2024',
        excerpt: 'टेलीमेडिसिन और डिजिटल स्वास्थ्य सेवाओं ने कैसे बदली भारत की स्वास्थ्य व्यवस्था...',
        content: 'पिछले कुछ वर्षों में भारत में डिजिटल स्वास्थ्य सेवाओं ने अभूतपूर्व वृद्धि देखी है। टेलीमेडिसिन, ई-स्वास्थ्य रिकॉर्ड और एआई आधारित निदान प्रणालियों ने ग्रामीण क्षेत्रों में स्वास्थ्य सेवाओं की पहुँच को बढ़ाया है।',
        tags: ['स्वास्थ्य', 'तकनीक', 'भारत'],
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    interviews: [
      {
        id: 4,
        title: 'किसान आंदोलन: एक विश्लेषण - कृषि मंत्री से विशेष बातचीत',
        interviewee: 'श्री नरेंद्र सिंह तोमर',
        interviewer: 'राजीव मेहता',
        date: '5 मार्च 2024',
        excerpt: 'कृषि मंत्री से विशेष बातचीत में किसान आंदोलन, नए कृषि कानून और भविष्य की योजनाओं पर चर्चा...',
        content: '**राजीव मेहता:** श्री तोमर जी, सबसे पहले आपका धन्यवाद कि आपने हमें अपना कीमती समय दिया। पिछले कई महीनों से चल रहे किसान आंदोलन को आप किस रूप में देखते हैं?',
        tags: ['कृषि', 'नीति', 'साक्षात्कार'],
        image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 5,
        title: 'युवाओं के लिए रोजगार के अवसर - नीति आयोग के सदस्य से खास बातचीत',
        interviewee: 'डॉ. विनोद पॉल',
        interviewer: 'प्रिया शर्मा',
        date: '28 फरवरी 2024',
        excerpt: 'कोविड के बाद के दौर में युवाओं के लिए रोजगार के नए अवसर और सरकार की योजनाओं पर विशेष चर्चा...',
        content: '**प्रिया शर्मा:** डॉ. पॉल, कोरोना काल के बाद रोजगार स्थिति पर क्या प्रभाव पड़ा है?',
        tags: ['रोजगार', 'युवा', 'नीति'],
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 6,
        title: 'स्टार्टअप इकोसिस्टम: विशेषज्ञ से बातचीत',
        interviewee: 'अमिताभ कांत',
        interviewer: 'नीलम शर्मा',
        date: '20 फरवरी 2024',
        excerpt: 'भारत में स्टार्टअप संस्कृति और सरकार की भूमिका पर विशेष चर्चा...',
        content: '**नीलम शर्मा:** भारत में स्टार्टअप इकोसिस्टम किस दिशा में बढ़ रहा है?',
        tags: ['स्टार्टअप', 'अर्थव्यवस्था', 'तकनीक'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ]
  };

  const toggleBookmark = (id) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter(item => item !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  const filteredContent = activeTab === 'editorial' 
    ? contentData.editorial.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : contentData.interviews.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.interviewee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-2 rounded-full mb-4 shadow-lg">
            <GiNewspaper className="mr-2 text-xl" />
            <span className="font-medium">सम्पादकीय विशेष</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">आर्टिकल</span> | <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">इंटरव्यू</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            विशेषज्ञ विश्लेषण, गहन शोध और प्रमुख हस्तियों के साथ विशेष वार्तालाप
          </p>
        </motion.div>

        {/* Tabs and Search Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-lg border border-white/20"
        >
          <div className="flex space-x-1 bg-gradient-to-r from-blue-50 to-orange-50 p-1 rounded-lg w-full md:w-auto shadow-inner">
            <button
              onClick={() => setActiveTab('editorial')}
              className={`py-2 px-6 font-medium text-sm rounded-md flex items-center transition-all duration-300 ${activeTab === 'editorial' ? 'bg-white shadow-md text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'}`}
            >
              <FaInfoCircle className="mr-2" />
              संपादकीय लेख
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`py-2 px-6 font-medium text-sm rounded-md flex items-center transition-all duration-300 ${activeTab === 'interviews' ? 'bg-white shadow-md text-orange-600' : 'text-gray-600 hover:text-orange-600 hover:bg-white/50'}`}
            >
              <FaUserEdit className="mr-2" />
              विशेष साक्षात्कार
            </button>
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-all duration-300 hover:shadow-md"
              placeholder="खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Content Grid with Animation */}
        {filteredContent.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredContent.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-white/20"
              >
                <div className="relative overflow-hidden">
                  <img 
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                    src={item.image} 
                    alt={item.title}
                  />
                  <div className="absolute top-2 right-2">
                    <button 
                      onClick={() => toggleBookmark(item.id)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-orange-100 transition-all duration-300"
                      aria-label="Bookmark"
                    >
                      <FaBookmark className={`${bookmarked.includes(item.id) ? 'text-orange-500 fill-current' : 'text-gray-400 hover:text-orange-400'}`} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="text-white text-sm font-medium flex items-center">
                      <FaCalendarAlt className="inline mr-2" />
                      {item.date}
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center text-xs mb-3">
                    {activeTab === 'editorial' ? (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                        {item.author}
                      </span>
                    ) : (
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">
                        {item.interviewee}
                      </span>
                    )}
                  </div>
                  
                  <h2 className={`text-xl font-bold mb-3 line-clamp-2 hover:underline cursor-pointer ${activeTab === 'editorial' ? 'text-blue-700 hover:text-blue-800' : 'text-orange-700 hover:text-orange-800'}`}>
                    {item.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className={`px-3 py-1 text-xs font-medium rounded-full ${activeTab === 'editorial' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <button className={`font-medium text-sm flex items-center ${activeTab === 'editorial' ? 'text-blue-600 hover:text-blue-800' : 'text-orange-600 hover:text-orange-800'}`}>
                      पूरा पढ़ें
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    <div className="flex space-x-4 text-gray-400">
                      <button className="hover:text-blue-500 transition-colors flex items-center">
                        <FaRegComment className="mr-1" />
                        <span className="text-xs">24</span>
                      </button>
                      <button className="hover:text-orange-500 transition-colors">
                        <FaShareAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-white rounded-xl shadow-lg border border-white/20"
          >
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
              <FaSearch className="text-gray-500 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">कोई परिणाम नहीं मिला</h3>
            <p className="text-gray-500 max-w-md mx-auto">आपकी खोज से मेल खाने वाला कोई लेख या साक्षात्कार नहीं मिला। कृपया अन्य शब्दों के साथ पुनः प्रयास करें।</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-lg hover:shadow-md transition-all duration-300 text-sm font-medium shadow-md"
            >
              सभी लेख देखें
            </button>
          </motion.div>
        )}

        {/* Featured Content Section */}
        {activeTab === 'editorial' && filteredContent.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-orange-500 rounded-full mr-3"></span>
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">आज का विशेष लेख</span>
            </h2>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-white/20 hover:shadow-2xl transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/2 lg:w-2/5 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    src={contentData.editorial[0].image} 
                    alt={contentData.editorial[0].title}
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {contentData.editorial[0].author}
                    </span>
                    <span className="mx-3 text-gray-300">•</span>
                    <FaCalendarAlt className="mr-1 text-gray-400" />
                    {contentData.editorial[0].date}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 cursor-pointer">
                    {contentData.editorial[0].title}
                  </h3>
                  <div className="prose max-w-none text-gray-700 mb-6">
                    {contentData.editorial[0].content.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {contentData.editorial[0].tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all duration-300 font-medium flex items-center">
                      पूरा लेख पढ़ें
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    <div className="flex space-x-4">
                      <button className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                        <FaRegComment className="mr-1" />
                        <span className="text-xs">24 टिप्पणियाँ</span>
                      </button>
                      <button className="text-gray-400 hover:text-orange-500 transition-colors">
                        <FaShareAlt />
                      </button>
                      <button 
                        onClick={() => toggleBookmark(contentData.editorial[0].id)}
                        className={`transition-colors ${bookmarked.includes(contentData.editorial[0].id) ? 'text-orange-500' : 'text-gray-400 hover:text-orange-400'}`}
                      >
                        <FaBookmark />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Popular Interviews Section */}
        {activeTab === 'interviews' && filteredContent.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-orange-500 to-blue-500 rounded-full mr-3"></span>
              <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">लोकप्रिय साक्षात्कार</span>
            </h2>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-white/20 hover:shadow-2xl transition-shadow duration-300">
              <div className="md:flex flex-row-reverse">
                <div className="md:w-1/2 lg:w-2/5 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    src={contentData.interviews[0].image} 
                    alt={contentData.interviews[0].title}
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                      {contentData.interviews[0].interviewee}
                    </span>
                    <span className="mx-3 text-gray-300">•</span>
                    <FaCalendarAlt className="mr-1 text-gray-400" />
                    {contentData.interviews[0].date}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-orange-600 cursor-pointer">
                    {contentData.interviews[0].title}
                  </h3>
                  <div className="prose max-w-none text-gray-700 mb-6">
                    <p className="mb-4">{contentData.interviews[0].excerpt}</p>
                    <p className="font-medium text-orange-600">- {contentData.interviews[0].interviewer}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {contentData.interviews[0].tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all duration-300 font-medium flex items-center">
                      पूरा साक्षात्कार पढ़ें
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    <div className="flex space-x-4">
                      <button className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                        <FaRegComment className="mr-1" />
                        <span className="text-xs">18 टिप्पणियाँ</span>
                      </button>
                      <button className="text-gray-400 hover:text-orange-500 transition-colors">
                        <FaShareAlt />
                      </button>
                      <button 
                        onClick={() => toggleBookmark(contentData.interviews[0].id)}
                        className={`transition-colors ${bookmarked.includes(contentData.interviews[0].id) ? 'text-orange-500' : 'text-gray-400 hover:text-orange-400'}`}
                      >
                        <FaBookmark />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">हमारे न्यूज़लेटर की सदस्यता लें</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">नवीनतम लेख और साक्षात्कार सीधे अपने इनबॉक्स में प्राप्त करें</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="आपका ईमेल पता"
              />
              <button className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
                सब्सक्राइब करें
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};