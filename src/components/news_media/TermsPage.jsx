import React from 'react';

export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-600 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            नियम और शर्तें | गोपनीयता नीति
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            रविओपीडिया सेवाओं के उपयोग हेतु नियमावली
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-50 dark:bg-gray-900 transform skew-y-1 origin-top-left"></div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Section 1 */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">1. परिचय</h2>
          <div className="prose dark:prose-invert">
            <p>
              नमस्कार! आपका स्वागत है <span className="font-semibold">Raviopedia</span> पर। हमारी सेवाओं का उपयोग करने से पहले कृपया हमारे नियमों और शर्तों को ध्यान से पढ़ें। यह शर्तें आपकी सुविधा और सुरक्षा के लिए बनाई गई हैं। यदि आप हमारी वेबसाइट का उपयोग करते हैं, तो इसका मतलब है कि आप इन नियमों से सहमत हैं। यदि आप सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें।
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">2. प्लेटफार्म का प्रकार</h2>
          <div className="prose dark:prose-invert">
            <p>
              हमारी वेबसाइट <span className="font-semibold">Raviopedia</span> एक समाचार पोर्टल है, जो उपयोगकर्ताओं को ताजा और प्रामाणिक समाचार, लेख, और रिपोर्ट प्रदान करता है। हमारी सेवाएं वेबसाइट, और अन्य डिजिटल माध्यमों के जरिए उपलब्ध हैं।
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">3. उपयोगकर्ता का स्थान और भाषा वरीयता</h2>
          <div className="prose dark:prose-invert">
            <p>
              यह वेबसाइट <span className="font-semibold">वैश्विक उपयोगकर्ताओं</span> के लिए उपलब्ध है, लेकिन प्राथमिक रूप से <span className="font-semibold">भारत</span> के उपयोगकर्ताओं को लक्षित करती है। वेबसाइट की मुख्य भाषा <span className="font-semibold">हिंदी और अंग्रेजी</span> है, और उपयोगकर्ता अपनी पसंद की भाषा चुन सकते हैं। किसी भी कानूनी व्याख्या में अंग्रेजी संस्करण को प्राथमिकता दी जाएगी।
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">4. वेबसाइट होस्टिंग</h2>
          <div className="prose dark:prose-invert">
            <p>
              हमारी वेबसाइट सुरक्षित होस्टिंग सेवाओं पर होस्ट की गई है और इसे नियमित रूप से अपडेट किया जाता है ताकि सर्वोत्तम अनुभव प्रदान किया जा सके।
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">5. उपयोग और विवरण</h2>
          <div className="prose dark:prose-invert">
            <ul className="list-disc pl-6 space-y-2">
              <li>वेबसाइट पर प्रकाशित सभी सामग्री केवल <span className="font-semibold">सूचनात्मक उद्देश्यों</span> के लिए हैं।</li>
              <li>उपयोगकर्ता वेबसाइट को केवल <span className="font-semibold">व्यक्तिगत और गैर-व्यावसायिक उद्देश्यों</span> के लिए उपयोग कर सकते हैं।</li>
              <li>हम सामग्री की <span className="font-semibold">सटीकता और पूर्णता की गारंटी नहीं</span> देते।</li>
              <li>आप हमारी सेवाओं का उपयोग केवल वैध उद्देश्यों के लिए कर सकते हैं। किसी भी अनैतिक, अवैध या अनुपयुक्त गतिविधि निषिद्ध है।</li>
              <li>हमारी सेवाओं का उपयोग करने वाले प्रत्येक उपयोगकर्ता को हमारे दिशानिर्देशों और नीति का पालन करना आवश्यक है।</li>
            </ul>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">6. पंजीकरण और समाप्ति</h2>
          <div className="prose dark:prose-invert">
            <ul className="list-disc pl-6 space-y-2">
              <li>कुछ सुविधाओं का उपयोग करने के लिए उपयोगकर्ताओं को पंजीकरण करना आवश्यक हो सकता है।</li>
              <li>उपयोगकर्ता को सही और सटीक जानकारी प्रदान करनी होगी।</li>
              <li>उपयोगकर्ता को अपनी लॉगिन जानकारी सुरक्षित रखनी होगी।</li>
              <li>हम किसी भी खाते को चेतावनी के बिना निलंबित या समाप्त करने का अधिकार रखते हैं। यदि आप नियमों का पालन नहीं करते।</li>
            </ul>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">7. सूचना का संग्रह</h2>
          <div className="prose dark:prose-invert">
            <p>
              हम उपयोगकर्ताओं की व्यक्तिगत और गैर-व्यक्तिगत जानकारी एकत्र करते हैं, जिसमें नाम, ईमेल, फोन नंबर, ब्राउज़िंग डेटा, डिवाइस की जानकारी आदि शामिल हो सकते हैं।
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">8. जानकारी का उपयोग</h2>
          <div className="prose dark:prose-invert">
            <p>हम आपकी जानकारी का उपयोग निम्नलिखित उद्देश्यों के लिए करते हैं:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>सेवाओं को अनुकूलित और सुधारने के लिए</li>
              <li>विज्ञापन और प्रचार उद्देश्यों के लिए</li>
              <li>कानूनी आवश्यकताओं का पालन करने के लिए</li>
            </ul>
          </div>
        </section>

        {/* Section 9 */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">9. जानकारी साझा करना</h2>
          <div className="prose dark:prose-invert">
            <p>
              हम आपकी व्यक्तिगत जानकारी किसी तीसरे पक्ष के साथ साझा नहीं करेंगे, जब तक कि यह कानूनी रूप से आवश्यक न हो या सेवाएं प्रदान करने के लिए अनिवार्य न हो।
            </p>
          </div>
        </section>

        {/* Section 10 */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">10. जानकारी की सुरक्षा</h2>
          <div className="prose dark:prose-invert">
            <p>
              हम उपयोगकर्ताओं की जानकारी को सुरक्षित रखने के लिए उचित तकनीकी और संगठनात्मक उपाय अपनाते हैं, लेकिन कोई भी डिजिटल प्लेटफॉर्म 100% सुरक्षित नहीं होता।
            </p>
          </div>
        </section>

        {/* Continue with remaining sections in the same pattern */}

        {/* Last Section */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">34. धन्यवाद</h2>
          <div className="prose dark:prose-invert">
            <p>
              Raviopedia पर आने के लिए आपका धन्यवाद। हमें उम्मीद है कि आपको हमारी सेवाएं पसंद आएँगी।
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">संपर्क करें</h2>
          <div className="prose dark:prose-invert">
            <p>किसी भी प्रश्न या स्पष्टीकरण के लिए कृपया संपर्क करें:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>ईमेल: raviopedia@gmail.com</li>
              <li>फोन: +91-8804922607</li>
              <li>पता: गया, बिहार 823001</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

