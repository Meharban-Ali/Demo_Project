import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const TermsPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <section
        className="hero py-12 text-center"
        data-aos="fade-down"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500">
          Terms & Conditions | Privacy & Policy
        </h1>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">1. परिचय</h2>
        <div className="content text-gray-700">
          <p>
            नमस्कार! आपका स्वागत है <b>www.raviopedia</b> पर। हमारी सेवाओं का उपयोग
            करने से पहले कृपया हमारे नियमों और शर्तों को ध्यान से पढ़ें। यह शर्तें
            आपकी सुविधा और सुरक्षा के लिए बनाई गई हैं। यदि आप हमारी वेबसाइट का
            उपयोग करते हैं, तो इसका मतलब है कि आप इन नियमों से सहमत हैं। यदि आप
            सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें{" "}
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          2. प्लेटफार्म का प्रकार
        </h2>
        <div className="content text-gray-700">
          <p>
            हमारी वेबसाइट <b>Raviopedia</b> एक समाचार पोर्टल है, जो उपयोगकर्ताओं
            को ताजा और प्रामाणिक समाचार, लेख, और रिपोर्ट प्रदान करता है। हमारी
            सेवाएं वेबसाइट,और अन्य डिजिटल माध्यमों के जरिए उपलब्ध हैं।
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          3. उपयोगकर्ता का स्थान और भाषा वरीयता
        </h2>
        <div className="content text-gray-700">
          यह वेबसाइट <b>वैश्विक उपयोगकर्ताओं</b> के लिए उपलब्ध है, लेकिन
          प्राथमिक रूप से <b>भारत</b> के उपयोगकर्ताओं को लक्षित करती है। वेबसाइट
          की मुख्य भाषा <b>हिंदी और अंग्रेजी</b> है, और उपयोगकर्ता अपनी पसंद की
          भाषा चुन सकते हैं। किसी भी कानूनी व्याख्या में अंग्रेजी संस्करण को
          प्राथमिकता दी जाएगी।
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          4. वेबसाइट होस्टिंग
        </h2>
        <div className="content text-gray-700">
          हमारी वेबसाइट [सुरक्षित होस्टिंग सेवाओं] पर होस्ट की गई है और इसे
          नियमित रूप से अपडेट किया जाता है ताकि सर्वोत्तम अनुभव प्रदान किया जा
          सके।
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          5. उपयोग और विवरण
        </h2>
        <div className="content text-gray-700">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              वेबसाइट पर प्रकाशित सभी सामग्री केवल <b>सूचनात्मक उद्देश्यों</b>{" "}
              के लिए हैं।
            </li>
            <li>
              उपयोगकर्ता वेबसाइट को केवल{" "}
              <b>व्यक्तिगत और गैर-व्यावसायिक उद्देश्यों</b> के लिए उपयोग कर
              सकते हैं।
            </li>
            <li>
              {" "}
              हम सामग्री की <b>सटीकता और पूर्णता की गारंटी नहीं</b> देते।{" "}
            </li>
            <li>
              आप हमारी सेवाओं का उपयोग केवल वैध उद्देश्यों के लिए कर सकते हैं।
              किसी भी अनैतिक, अवैध या अनुपयुक्त गतिविधि निषिद्ध है।{" "}
            </li>
            <li>
              हमारी सेवाओं का उपयोग करने वाले प्रत्येक उपयोगकर्ता को हमारे
              दिशानिर्देशों और निति का पालन करना आवश्यक है।{" "}
            </li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          6. पंजीकरण और समाप्ति
        </h2>
        <div className="content text-gray-700">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              कुछ सुविधाओं का उपयोग करने के लिए उपयोगकर्ताओं को पंजीकरण करना
              आवश्यक हो सकता है।
            </li>
            <li>उपयोगकर्ता को सही और सटीक जानकारी प्रदान करनी होगी।</li>
            <li>उपयोगकर्ता को अपनी लॉगिन जानकारी सुरक्षित रखनी होगी।</li>
            <li>
              {" "}
              हम किसी भी खाते को चेतावनी के बिना निलंबित या समाप्त करने का
              अधिकार रखते हैं। यदि आप नियमों का पालन नहीं करते।{" "}
            </li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          7. सूचना का संग्रह
        </h2>
        <div className="content text-gray-700">
          हम उपयोगकर्ताओं की व्यक्तिगत और गैर-व्यक्तिगत जानकारी एकत्र करते हैं,
          जिसमें नाम, ईमेल,फ़ोन नंबर, ब्राउज़िंग डेटा, डिवाइस की जानकारी आदि शामिल
          हो सकते हैं।
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          8. जानकारी का उपयोग
        </h2>
        <div className="content text-gray-700">
          <p>हम आपकी जानकारी का उपयोग निम्नलिखित उद्देश्यों के लिए करते हैं: </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>सेवाओं को अनुकूलित और सुधारने के लिए</li>
            <li>विज्ञापन और प्रचार उद्देश्यों के लिए </li>
            <li>कानूनी आवश्यकताओं का पालन करने के लिए</li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          9. जानकारी साझा करना
        </h2>
        <div className="content text-gray-700">
          <p>
            हम आपकी व्यक्तिगत जानकारी किसी तीसरे पक्ष के साथ साझा नहीं करेंगे, जब
            तक कि यह कानूनी रूप से आवश्यक न हो या सेवाएं प्रदान करने के लिए
            अनिवार्य न हो।{" "}
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          10. जानकारी की सुरक्षा{" "}
        </h2>
        <div className="content text-gray-700">
          <p>
            हम उपयोगकर्ताओं की जानकारी को सुरक्षित रखने के लिए उचित तकनीकी और
            संगठनात्मक उपाय अपनाते हैं, लेकिन कोई भी डिजिटल प्लेटफॉर्म 100%
            सुरक्षित नहीं होता।{" "}
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          11. सेवा का उपयोग करना
        </h2>
        <div className="content text-gray-700">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              उपयोगकर्ता को हमारी सेवाओं का उपयोग केवल कानूनी और नैतिक उद्देश्यों
              के लिए करना चाहिए।
            </li>
            <li>
              किसी भी अवैध गतिविधि में शामिल होने पर, आपका खाता प्रतिबंधित किया
              जा सकता है।{" "}
            </li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          12. उपयोगकर्ता खता और सदस्यता{" "}
        </h2>
        <div className="content text-gray-700">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              कुछ विशेष सुविधाओं के लिए उपयोगकर्ता को खता बनाना पड़ सकता है।
            </li>
            <li>
              उपयोगकर्ता अपने खाते की सुरक्षा के लिए स्वयं जिम्मेदार हैं ।
            </li>
            <li>
              हम किसी भी खाते को निलंबित या हटाने का अधिकार सुरक्षित रखते हैं।
            </li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          13. उपयोगकर्ता का स्थान{" "}
        </h2>
        <div className="content text-gray-700">
          <p>
            हम आपके स्थान की जानकारी एकत्र कर सकते है, यदि आपने हमें इसकी अनुमति
            दी है, ताकि हम आपको स्थान-विशिष्ट समाचार और सेवाएं प्रदान कर सकें।
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          14. उपयोगकर्ता की आयु सीमा{" "}
        </h2>
        <div className="content text-gray-700">
          <p>
            हमारी सेवाओं का उपयोग करने के लिए आपकी उम्र कम से कम 18 साल होनी
            चाहिए। यदि आप नाबालिग हैं, तो आपको माता-पित या अभिभावक की अनुमति की
            आवशयकता होगी।{" "}
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          15. बच्चों की गोपनीयता{" "}
        </h2>
        <div className="content text-gray-700">
          <p>
            हम जानबूझकर 13 वर्ष से का उम्र के बच्चों की जानकारी एकत्र नहीं करते
            हैं। यदि हमें ऐसी जानकारी प्राप्त होती है,तो हम इसे हटा देंगे।
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          16. निषिद्ध गतिविधियाँ
        </h2>
        <div className="content text-gray-700">
          <p>निम्लिखित गतिविधियाँ सख्त वर्जित हैं:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              अवैध,अपमानजनक,धमकीपूर्ण या भ्रामक सामग्री प्रकाशित करना।{" "}
            </li>
            <li>किसी अन्य उपयोगकर्ता को परेशान करना या गाली-गलौच करना।</li>
            <li>वेबसाइट की सुरक्षा से समझौता करने वाले कार्य करना।</li>
            <li>किसी अन्य उपयोगकर्ता के खाते तक अनधिकृत पहुँच।</li>
            <li>हैकिंग,स्पैमिंग या अन्य दुर्भाग्यपूर्ण गतिविधियाँ।</li>
            <li>किसी गैर कानूनी गतिविधि में शामिल होना।</li>
            <li>वेबसाइट पर गलत जानकारी डालना।</li>
            <li>बौधिक संपदा का उल्लंघन।</li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          17. उपयोगकर्ता द्वारा उत्तपन्न योगदान
        </h2>
        <div className="content text-gray-700">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              उपयोगकर्ता वेबसाइट पर *टिप्पणियां,समीक्षाएं* या अन्य सामग्री पोस्ट
              कर सकते हैं।{" "}
            </li>
            <li>
              यदि उपयोगकर्ता किसी भी सामग्री को हमारी वेबसाइट पर अपलोड करते हैं,तो
              वे उसके लिए पूरी तरह से जिम्मेदार होंगे।{" "}
            </li>
            <li>
              उपयोगकर्ता द्वारा प्रस्तुत सामग्री का{" "}
              <b>स्वामित्व उनके पास रहेगा,</b> लेकिन हम इसे अपने प्लेटफार्म पर
              प्रदर्शित करने का अधकार सुरक्षित रखते हैं।{" "}
            </li>
            <li>
              हम किसी भी अनुचित या आपत्तिजनक सामग्री को हटाने का अधिकार रखते
              हैं।{" "}
            </li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          18. सामग्री{" "}
        </h2>
        <div className="content text-gray-700">
          <p>
            हमारी वेबसाइट पर मौजूद *सभी लेख,तस्वीरें,विडियो और अन्य सामग्री * हमारी
            सम्पत्ति है.आप इन्हें बिना अनुमति के <b>कॉपी या इस्तेमाल या वितरित नहीं कर सकते।</b>
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          19. समीक्षा{" "}
        </h2>
        <div className="content text-gray-700">
          <ul className="list-disc pl-6 space-y-2">
            <li>उपयोगकर्ता को स्वतंत्र रूप से समीक्षाएं पोस्ट करने की अनुमति है ।</li>
            <li>गलत या भ्रामक समीक्षाएं पोस्ट करने की अनुमति नहीं है।</li>
            <li>
              हम किसी भी उपयोगकर्ता की समीक्षा या प्रतिक्रिया को मोडेरेट कर
              सकते हैं,लेकिन हम उसकी सटीकता या निष्पक्षता की गारंटी नहीं देते।
            </li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          20. सेवा शर्तें और नोटिस{" "}
        </h2>
        <div className="content text-gray-700">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              हम समय-समय पर इन शर्तों को अपडेट कर सकते हैं. किसी भी महत्वपूर्ण
              बदलाव की सुचना आपको ईमेल या वेबसाइट नोटिफिकेशन के माध्यम से दी
              जाएगी।
            </li>
            <li>कुछ सेवाएं सिमित क्षेत्र में उपलब्ध हो सकती है।</li>
            <li>उपयोगकर्ताओं को सभी शर्तों की समीक्षा करनी चाहिए।</li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          21. अतिरिक्त धरा{" "}
        </h2>
        <div className="content text-gray-700">
          <ul className="list-disc pl-6 space-y-2">
            <li>हम समय-समय पर *नई सुविधाओं और सेवाओं * को जोड़ सकते हैं। </li>
            <li>किसी भी नई सुविधा पर अतिरिक्त नियम लागू हो सकते हैं।</li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          22. फीडबैक और सुझाव{" "}
        </h2>
        <div className="content text-gray-700">
          <p>
            हम आपकी राय का स्वागत करते हैं,लेकिन यह जरुरी नहीं है कि हम हर सुझाव
            को लागू करें।{" "}
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          23. अन्य वेबसाइटों के लिंक{" "}
        </h2>
        <div className="content text-gray-700">
          <p>
            हमारी वेबसाइट पर कुछ <b>दूसरी वेबसाइटों के लिंक हो सकते हैं।</b> हम
            उन वेबसाइटों की सुरक्षा और विश्वसनीयता के लिए जिम्मेदार नहीं हैं।
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          24. विज्ञापन और प्रचार{" "}
        </h2>
        <div className="content text-gray-700">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              हमारी सेवा में विज्ञापन दिखाए जा सकते हैं। उपयोगकर्ता को इन
              विज्ञापनों से सम्बंधित किसी भी मुद्दे के लिए सीधे विज्ञापनदाता से
              संपर्क करना होगा ।
            </li>
            <li>
              विज्ञापनों पर क्लिक करने के बाद उपयोगकर्ताओं को तृतीय-पक्ष वेबसाइट
              पर पुननिर्देशित किया जाता है, जिनकी सामग्री पर हमारा नियंत्रण नहीं
              होता ।
            </li>
            <li>विज्ञापनदाता की सेवाओं के लिए हम जिम्मेदार नहीं हैं।</li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          25. विवाद समाधान{" "}
        </h2>
        <div className="content text-gray-700">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              अगर किसी भी बात को लेकर कोई विवाद हो, तो सबसे पहले *आपस में बातचीत
              करके हल निकालने की कोशिश की जाएगी।*
            </li>
            <li>
              अगर हल नहीं निकलता, तो मामला <b>भारत के कानूनी न्यायालयों में</b>{" "}
              उठाया एवं सुलझाया जा सकता है।
            </li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          26. दायित्व की सीमा{" "}
        </h2>
        <div className="content text-gray-700">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              हमारी सेवाओं का उपयोग "जैसा है" और "जैसा उपलब्ध हो" के आधार पर किया
              जाता है। किसी भी अप्रत्यक्ष, आकस्मिक या परिणामिक हानि के लिए हम
              जिम्मेदार नहीं होंगे।
            </li>
            <li>
              अगर हमारी सेवाओं के कारन आपको किसी भी तरह की हानि होती है, तो{" "}
              <b>हमारी जिम्मेदारी सिमित होगी।</b>
            </li>
            <li>
              हम वेबसाइट के उपयोग से होने वाले किसी भी{" "}
              <b>नुकसान,डेटा,हानि, या अन्य समस्याओं</b> के लिए जिम्मेदार नहीं
              होंगे।
            </li>
            <li>
              हम यह गारंटी नहीं देते कि वेबसाइट <b>हमेशा 100% चालु</b> रहेगी।
            </li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          27. विज्ञापन और मार्केटिंग{" "}
        </h2>
        <div className="content text-gray-700">
          <p>
            आप हमारी मार्केटिंग ईमेल और प्रचार सामग्री प्राप्त करने के लिए सहमती
            देते हैं। यदि आप इससे हटना चाहते हैं, तो आप ईमेल में दिए गए
            "अन्सब्स्क्राइब" विकल्प का उपयोग कर सकते हैं।
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          28. गोपनीयता निति{" "}
        </h2>
        <div className="content text-gray-700">
          <p>
            हम आपकी <b>गोपनीयता का पूरा ध्यान रखते हैं</b> और आपकी व्यक्तिगत
            जानकारी को एकत्रित,संग्रहीत करने, और उपयोग करने के तरीकों को सुरक्षित
            रखने की पूरी कोशश करते हैं।
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          29. शासक कानून{" "}
        </h2>
        <div className="content text-gray-700">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              इन नियमों और शर्तों पर <b>भारतीय कानून</b> लागू होगा।
            </li>
            <li>
              कोई भी कानूनी कार्यवाही केवल <b>भारतीय न्यायालयों</b> में की जाएगी.
            </li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          30. आपकी सहमति{" "}
        </h2>
        <div className="content text-gray-700">
          <p>
            हमारी वेबसाइट का उपयोग करके{" "}
            <b>आप हमारी निति और नियमो को मानने के लिए सहमत होते हैं।</b>
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          31. संपर्क जानकारी{" "}
        </h2>
        <div className="content text-gray-700">
          <p>अगर आपको कोई सवाल या संदेह हो, तो आप हमसे सम्पर्क कर सकते हैं:- </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>कंपनी का नाम: Raviopedia </li>
            <li>ईमेल: raviopedia@gmail.com </li>
            <li>फ़ोन: +91-8804922607</li>
          </ul>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          32. हमारा पता{" "}
        </h2>
        <div className="content text-gray-700">
          <p>गया,बिहार 823001.</p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          33. निष्कर्ष{" "}
        </h2>
        <div className="content text-gray-700">
          <p>
            हमारी सेवाओं का उपयोग करके, आप उपरोक्त अभी नियमों और शर्तों से सहमत
            होते हैं। यदि आप इनसे सहमत नहीं हैं, तो कृपया हमारी सेवाओ का उपयोग न
            करें।
          </p>
        </div>
      </section>

      <section className="terms-section mb-12" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          34. धन्यवाद{" "}
        </h2>
        <div className="content text-gray-700">
          <p>
            Raviopedia पर आने के लिए आपका धन्यवाद। हमें उम्मीद है कि आपको हमारी
            सेवाएं पसंद आएँगी।
          </p>
        </div>
      </section>
    </main>
  );
};
