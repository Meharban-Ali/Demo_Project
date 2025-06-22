import React from 'react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">रविओपीडिया के बारे में</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            समाचार और मीडिया कवरेज का आपका विश्वसनीय स्रोत
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white dark:bg-gray-900 transform skew-y-1 origin-top-left"></div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Founder Image */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative group">
              <img 
                src="https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137122/RK_Ranjan_gyn96s.png" 
                alt="रवि, रविओपीडिया के संस्थापक"
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-blue-500 shadow-xl group-hover:shadow-2xl transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-blue-300 transition-all duration-300"></div>
            </div>
          </div>

          {/* About Text */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">हमारे बारे में:</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">हमारी वेबसाइट</span>  हमारी वेबसाइट (Raviopedia) एक समर्पित ऑनलाइन प्लेटफ़ॉर्म है, जो देश-दुनिया की हर महत्वपूर्ण खबर, घटनाओं और ट्रेंड्स को आपके पास लाती है। हमारा उद्देश्य आपके लिए एक ऐसा स्रोत प्रदान करना है, जो न केवल ताजातरीन खबरें, बल्कि व्यापक दृष्टिकोण और गहराई से विश्लेषण प्रस्तुत करे।

                हमारी टीम निरंतर समाचार, विचार, और रोचक कंटेंट को एकत्रित करती है, ताकि हम आपको राजनीति, बिजनेस, खेल, एंटरटेनमेंट, विज्ञान, और अन्य महत्वपूर्ण विषयों से जुड़े विषयों पर व्यापक जानकारी प्रदान कर सकें। चाहे आप जीवन के विभिन्न पहलुओं में दिलचस्पी रखते हों या ताजातरीन खबरों की तलाश में हों, हमारे पास हर तरह का कंटेंट है।
              </p>
              <p>
                हमारा मिशन है सटीक, निष्पक्ष और समय पर समाचार प्रदान करना। हम मानते हैं कि जानकारी ही शक्ति है, और हर किसी को विश्वसनीय समाचार स्रोत तक पहुंच होनी चाहिए।
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-12 mb-6">हमारा दृष्टिकोण</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">पत्रकारिता की अखंडता</h3>
                <p>हम तथ्यों और सत्य की रिपोर्टिंग पर अडिग रहते हैं, चाहे कोई भी परिस्थिति हो।</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">समुदाय केंद्रित</h3>
                <p>हमारा फोकस उन मुद्दों पर है जो वास्तव में हमारे पाठकों के जीवन को प्रभावित करते हैं।</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">तकनीकी नवाचार</h3>
                <p>हम समाचार वितरण को बेहतर बनाने के लिए नवीनतम तकनीकों का उपयोग करते हैं।</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">वैश्विक दृष्टि</h3>
                <p>स्थानीय समाचारों को वैश्विक संदर्भ में प्रस्तुत करना हमारी विशेषता है।</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">हमारी टीम</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500">
                <img 
                  src="https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137341/Rahul_Bhartie_jccxvp.png" 
                  alt="संपादकीय टीम" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">रवि</h3>
              <p className="text-blue-600 dark:text-blue-400">संस्थापक एवं मुख्य संपादक</p>
              <p className="mt-2 text-sm">25+ वर्षों का पत्रकारिता अनुभव</p>
            </div>
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500">
                <img 
                  src="https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137428/SachinKumar_vcu2oh.jpg" 
                  alt="संवाददाता टीम" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">प्रिया शर्मा</h3>
              <p className="text-blue-600 dark:text-blue-400">वरिष्ठ संवाददाता</p>
              <p className="mt-2 text-sm">राजनीति और समाज मामलों की विशेषज्ञ</p>
            </div>
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500">
                <img 
                  src="https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137422/ProfileSunnySharma_o3bdoq.png" 
                  alt="तकनीकी टीम" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">अजय पटेल</h3>
              <p className="text-blue-600 dark:text-blue-400">तकनीकी प्रमुख</p>
              <p className="mt-2 text-sm">डिजिटल मीडिया में विशेषज्ञता</p>
            </div>
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500">
                <img 
                  src="https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137555/Profile_Sachin_Kumar_2000_kif0fb.png" 
                  alt="रचनात्मक टीम" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">नीतू सिंह</h3>
              <p className="text-blue-600 dark:text-blue-400">रचनात्मक निदेशक</p>
              <p className="mt-2 text-sm">दृश्य कथा कहने में माहिर</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mt-24 bg-blue-50 dark:bg-gray-800 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">हमारे मूल्य</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">सत्यनिष्ठा</h3>
                  <p>हम हर खबर की पुष्टि करते हैं और तथ्यों पर आधारित रिपोर्टिंग करते हैं। गलत सूचना फैलाने के इस युग में, हम सच्चाई के प्रति अपनी प्रतिबद्धता बनाए रखते हैं।</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">समावेशिता</h3>
                  <p>हम सभी वर्गों, समुदायों और विचारधाराओं को प्रतिनिधित्व देते हैं। हमारी रिपोर्टिंग में विविधता और समानता को प्राथमिकता दी जाती है।</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">नवाचार</h3>
                  <p>हम समाचार प्रस्तुति में नए तरीके खोजते रहते हैं। डिजिटल मीडिया के इस युग में, हम लगातार अपने पाठकों के लिए बेहतर अनुभव प्रदान करने का प्रयास करते हैं।</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
