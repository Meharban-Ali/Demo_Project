import React, { useState } from 'react';
import { FaInfoCircle, FaCalendarAlt, FaUserEdit, FaSearch, FaShareAlt, FaBookmark, FaRegComment } from 'react-icons/fa';
import { GiNewspaper } from 'react-icons/gi';

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
        content: `कोविड-19 महामारी ने वैश्विक अर्थव्यवस्था को गहरा झटका दिया, और भारत भी इससे अछूता नहीं रहा। हालांकि, हाल के महीनों में आर्थिक सुधार के संकेत दिखाई दे रहे हैं। जीएसटी संग्रह में वृद्धि, विनिर्माण क्षेत्र में सुधार और निर्यात में तेजी इसके प्रमुख संकेतक हैं।

        भारत सरकार की आत्मनिर्भर भारत योजना और उत्पादन से जुड़ी प्रोत्साहन योजनाओं (PLI) ने विनिर्माण क्षेत्र को नई गति प्रदान की है। विशेष रूप से इलेक्ट्रॉनिक्स, फार्मास्यूटिकल और ऑटोमोबाइल सेक्टर में उल्लेखनीय प्रगति देखी गई है।

        हालांकि, बेरोजगारी दर, महंगाई और राजकोषीय घाटा जैसी चुनौतियाँ अभी भी बनी हुई हैं। विशेषज्ञों का मानना है कि कृषि क्षेत्र में सुधार, श्रम सुधारों को लागू करने और बुनियादी ढाँचे के विकास पर ध्यान केंद्रित करके इन चुनौतियों से निपटा जा सकता है।`,
        tags: ['अर्थव्यवस्था', 'नीति', 'विश्लेषण'],
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 2,
        title: 'शिक्षा प्रणाली में डिजिटल परिवर्तन',
        author: 'प्रो. अंजलि शर्मा',
        date: '10 मार्च 2024',
        excerpt: 'डिजिटल इंडिया की दिशा में शिक्षा क्षेत्र में हो रहे बदलाव और भविष्य की राह...',
        content: `कोरोना काल ने भारतीय शिक्षा प्रणाली में एक बड़े बदलाव की शुरुआत की। ऑनलाइन शिक्षा जो पहले एक विकल्प मात्र थी, वह अब मुख्यधारा बन चुकी है। इस परिवर्तन ने शिक्षा के क्षेत्र में कई नई संभावनाओं के द्वार खोले हैं।

        डिजिटल इंडिया कार्यक्रम के तहत सरकार द्वारा शुरू किए गए 'दीक्षा' प्लेटफॉर्म और 'स्वयं' पोर्टल ने दूरदराज के इलाकों में रहने वाले छात्रों के लिए गुणवत्तापूर्ण शिक्षा सुलभ कराई है। हालांकि, डिजिटल विभाजन, इंटरनेट की अनुपलब्धता और डिजिटल साक्षरता की कमी जैसी चुनौतियाँ अभी भी बनी हुई हैं।
        
        विशेषज्ञों का मानना है कि हाइब्रिड शिक्षा मॉडल (ऑनलाइन और ऑफलाइन का मिश्रण) भविष्य की दिशा हो सकती है। इसके लिए शिक्षक प्रशिक्षण, डिजिटल बुनियादी ढाँचे के विकास और सामग्री के स्थानीयकरण पर विशेष ध्यान देने की आवश्यकता है।`,
        tags: ['शिक्षा', 'तकनीक', 'भविष्य'],
        image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    interviews: [
      {
        id: 3,
        title: 'किसान आंदोलन: एक विश्लेषण - कृषि मंत्री से विशेष बातचीत',
        interviewee: 'श्री नरेंद्र सिंह तोमर',
        interviewer: 'राजीव मेहता',
        date: '5 मार्च 2024',
        excerpt: 'कृषि मंत्री से विशेष बातचीत में किसान आंदोलन, नए कृषि कानून और भविष्य की योजनाओं पर चर्चा...',
        content: `**राजीव मेहता:** श्री तोमर जी, सबसे पहले आपका धन्यवाद कि आपने हमें अपना कीमती समय दिया। पिछले कई महीनों से चल रहे किसान आंदोलन को आप किस रूप में देखते हैं?

        **श्री नरेंद्र सिंह तोमर:** देखिए, हमारा मानना है कि किसानों की चिंताओं को समझना और उनका समाधान करना सरकार की प्राथमिकता है। हमने लगातार संवाद का रास्ता अपनाया है और कई मुद्दों पर सहमति भी बनी है।

        **राजीव मेहता:** नए कृषि कानूनों को लेकर किसानों के मन में जो भय है, उसके बारे में आप क्या कहेंगे?

        **श्री नरेंद्र सिंह तोमर:** यह गलतफहमी फैलाई जा रही है कि एमएसपी खत्म हो जाएगी। हमने स्पष्ट किया है कि एमएसपी व्यवस्था जारी रहेगी। नए कानून किसानों को अधिक विकल्प देने के लिए हैं, न कि उनकी सुरक्षा छीनने के लिए।

        **राजीव मेहता:** सरकार की भविष्य की क्या योजनाएँ हैं?

        **श्री नरेंद्र सिंह तोमर:** हम किसानों की आय दोगुनी करने के लक्ष्य पर काम कर रहे हैं। सिंचाई सुविधाओं का विस्तार, फसल बीमा योजना को और प्रभावी बनाना और कृषि उत्पादों के प्रसंस्करण पर विशेष ध्यान दिया जा रहा है।`,
        tags: ['कृषि', 'नीति', 'साक्षात्कार'],
        image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 4,
        title: 'युवाओं के लिए रोजगार के अवसर - नीति आयोग के सद्स्य से खास बातचीत',
        interviewee: 'डॉ. विनोद पॉल',
        interviewer: 'प्रिया शर्मा',
        date: '28 फरवरी 2024',
        excerpt: 'कोविड के बाद के दौर में युवाओं के लिए रोजगार के नए अवसर और सरकार की योजनाओं पर विशेष चर्चा...',
        content: `**प्रिया शर्मा:** डॉ. पॉल, कोरोना काल के बाद रोजगार स्थिति पर क्या प्रभाव पड़ा है?

        **डॉ. विनोद पॉल:** निसंदेह, महामारी ने रोजगार पर असर डाला है, खासकर असंगठित क्षेत्र में। लेकिन हमने देखा है कि डिजिटल इकोनॉमी, हेल्थकेयर और ई-कॉमर्स जैसे क्षेत्रों में नए अवसर पैदा हुए हैं।

        **प्रिया शर्मा:** सरकार युवाओं के लिए क्या विशेष पहल कर रही है?

        **डॉ. विनोद पॉल:** प्रधानमंत्री कौशल विकास योजना को और विस्तार दिया जा रहा है। स्टार्टअप इंडिया के तहत फंडिंग और मेंटरशिप की सुविधाएँ बढ़ाई गई हैं। हम 'आत्मनिर्भर भारत' के तहत नए उद्योगों को प्रोत्साहन दे रहे हैं जिससे रोजगार सृजन होगा।

        **प्रिया शर्मा:** युवाओं को आप क्या सलाह देना चाहेंगे?

        **डॉ. विनोद पॉल:** मैं युवाओं से कहूँगा कि वे पारंपरिक रोजगार के अलावा नए क्षेत्रों में भी अवसर तलाशें। डिजिटल स्किल्स, एआई, रोबोटिक्स जैसे क्षेत्रों में विशेषज्ञता हासिल करें। सरकार की विभिन्न योजनाओं का लाभ उठाएँ और उद्यमिता को भी एक विकल्प के रूप में देखें।`,
        tags: ['रोजगार', 'युवा', 'नीति'],
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <GiNewspaper className="mr-3 text-blue-600" />
            लेख  | इंटरव्यू 
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            विशेषज्ञों की राय, गहन विश्लेषण और प्रमुख हस्तियों के साथ विस्तृत बातचीत
          </p>
        </div>

        {/* Tabs and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex border-b border-gray-200 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('editorial')}
              className={`py-2 px-4 font-medium text-lg flex items-center ${activeTab === 'editorial' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaInfoCircle className="mr-2" />
              लेख
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`py-2 px-4 font-medium text-lg flex items-center ${activeTab === 'interviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaUserEdit className="mr-2" />
              इंटरव्यू 
            </button>
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content Grid */}
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContent.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    className="w-full h-48 object-cover" 
                    src={item.image} 
                    alt={item.title}
                  />
                  <div className="absolute top-2 right-2">
                    <button 
                      onClick={() => toggleBookmark(item.id)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                      aria-label="Bookmark"
                    >
                      <FaBookmark className={bookmarked.includes(item.id) ? 'text-yellow-500 fill-current' : 'text-gray-400'} />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaCalendarAlt className="mr-1" />
                    {item.date}
                    {activeTab === 'interviews' && (
                      <span className="ml-3">
                        <FaUserEdit className="inline mr-1" />
                        {item.interviewer}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                    {item.title}
                  </h2>
                  
                  {activeTab === 'editorial' ? (
                    <p className="text-gray-600 mb-4">{item.author}</p>
                  ) : (
                    <p className="text-gray-600 mb-4">साथ: {item.interviewee}</p>
                  )}
                  
                  <p className="text-gray-700 mb-4">{item.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      पूरा पढ़ें
                    </button>
                    <div className="flex space-x-3">
                      <button className="text-gray-400 hover:text-gray-600">
                        <FaRegComment />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FaShareAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-500">कोई परिणाम नहीं मिला</h3>
            <p className="mt-2 text-gray-400">अपने खोज शब्दों को बदलकर पुनः प्रयास करें</p>
          </div>
        )}

        {/* Featured Content - Desktop Only */}
        {activeTab === 'editorial' && filteredContent.length > 0 && (
          <div className="mt-12 hidden lg:block">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FaInfoCircle className="mr-2 text-blue-600" />
              विशेष संपादकीय
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/3">
                  <img 
                    className="h-full w-full object-cover" 
                    src={contentData.editorial[0].image} 
                    alt={contentData.editorial[0].title}
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaCalendarAlt className="mr-1" />
                    {contentData.editorial[0].date}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {contentData.editorial[0].title}
                  </h3>
                  <p className="text-gray-600 font-medium mb-4">
                    {contentData.editorial[0].author}
                  </p>
                  <div className="prose max-w-none text-gray-700 mb-4">
                    {contentData.editorial[0].content.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {contentData.editorial[0].tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <button className="text-gray-400 hover:text-gray-600">
                        <FaRegComment className="mr-1" /> 24
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FaShareAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};