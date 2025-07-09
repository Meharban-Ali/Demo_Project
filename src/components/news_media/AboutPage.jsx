import React from 'react';

export const AboutPage = () => {
  // Brand logos data with custom images
  const brands = [
    { id: 1, name: 'Tata', image: 'https://res.cloudinary.com/dh3os5xi2/image/upload/v1751914562/RK_Ranjan_rlbitx.png' },
    { id: 2, name: 'Reliance', image: 'https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137341/Rahul_Bhartie_jccxvp.png' },
    { id: 3, name: 'Adani', image: 'https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137428/SachinKumar_vcu2oh.jpg' },
    { id: 4, name: 'Mahindra', image: 'https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137422/ProfileSunnySharma_o3bdoq.png' },
    { id: 5, name: 'Infosys', image: 'https://res.cloudinary.com/dh3os5xi2/image/upload/v1751914562/RK_Ranjan_rlbitx.png' },
    { id: 6, name: 'TCS', image: 'https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137555/Profile_Sachin_Kumar_2000_kif0fb.png' },
    { id: 7, name: 'HDFC', image: 'https://res.cloudinary.com/dh3os5xi2/image/upload/v1751914812/Profile_Satyadeo_ktm7is.png' },
    { id: 8, name: 'ICICI', image: 'https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137341/Rahul_Bhartie_jccxvp.png' },
    { id: 9, name: 'Airtel', image: 'https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137428/SachinKumar_vcu2oh.jpg' },
    { id: 10, name: 'Jio', image: 'https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137422/ProfileSunnySharma_o3bdoq.png' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* About Content Section */}
      <section className="space-y-8">
        {/* About Us */}
        <div className="about-text">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">हमारे बारे में:</h2>
          <p className="text-gray-700 leading-relaxed">
            हमारी वेबसाइट (Raviopedia) एक समर्पित ऑनलाइन प्लेटफ़ॉर्म है, जो देश-दुनिया की हर महत्वपूर्ण खबर, घटनाओं और ट्रेंड्स को आपके पास लाती है। हमारा उद्देश्य आपके लिए एक ऐसा स्रोत प्रदान करना है, जो न केवल ताजातरीन खबरें, बल्कि व्यापक दृष्टिकोण और गहराई से विश्लेषण प्रस्तुत करे।

            हमारी टीम निरंतर समाचार, विचार, और रोचक कंटेंट को एकत्रित करती है, ताकि हम आपको राजनीति, बिजनेस, खेल, एंटरटेनमेंट, विज्ञान, और अन्य महत्वपूर्ण विषयों से जुड़े विषयों पर व्यापक जानकारी प्रदान कर सकें। चाहे आप जीवन के विभिन्न पहलुओं में दिलचस्पी रखते हों या ताजातरीन खबरों की तलाश में हों, हमारे पास हर तरह का कंटेंट है।
          </p>
        </div>

        {/* Our Vision */}
        <div className="about-text">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">हमारा दृष्टिकोण:</h2>
          <p className="text-gray-700 leading-relaxed">
            हमारी वेबसाइट का उद्देश्य आपको जानकारी प्रदान करने के साथ-साथ एक संवाद स्थापित करना है, जो विभिन्न विषयों पर आपके विचारों और सवालों को सामने लाए। हम यह सुनिश्चित करते हैं कि हमारे पाठक हमेशा सबसे सटीक और अद्यतित जानकारी प्राप्त करें।
          </p>
        </div>

        {/* Our Features */}
        <div className="about-text">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">हमारी खासियतें:</h2>
          <p className="text-gray-700 leading-relaxed">
            हम खबरों को गहराई से समझते हैं और पूरी पारदर्शिता के साथ आपको सही जानकारी देते हैं।
            राजनीति से लेकर बॉलीवुड, खेल से लेकर राशिफल, टेक्नोलॉजी से लेकर अपराध तक—हर विषय पर विस्तृत कवरेज के साथ
            ग्राउंड रिपोर्ट और एक्सप्लेनर के माध्यम से जमीनी हकीकत को आपके सामने लाने के लिए हमारी टीम फील्ड में जाकर हर छोटी-बड़ी कहानी को कवर करती है।
            मनोरंजन से भरपूर कंटेंट – फिल्म समीक्षाओं से लेकर ओटीटी प्लेटफार्म, टेलीविजन, बॉलीवुड, हॉलीवुड, भोजपुरी और साउथ सिनेमा तक की ताजा ख़बरों से लेकर
            आर्थिक और व्यावसायिक दुनिया पर पैनी नजर रखने की कोशिश करते हैं और अर्थव्यवस्था, एग्रीकल्चर, बिजनेस, मार्केट ट्रेंड्स से जुड़े हर अपडेट के साथ
            विशेषज्ञों के विचार और संपादकीय से वीकली एनालिसिस, एक्सप्लेनर, इंटरव्यू, वीडियो-पॉडकास्ट और ऑडियो-पॉडकास्ट के माध्यम से विशेषज्ञों की राय भी लेते हैं।

            आपके जीवन से जुड़ी बातें
            चाहे वह आपकी सेहत हो, रिश्ते हों, फैशन और ट्रैवल हो या फिर गैजेट्स और ऑटोमोबाइल की दुनिया—हमारी एक्सपर्ट टिप्स और गाइड आपके हर फैसले को आसान बनाती हैं। साथ ही,होम टिप्स से जुड़ी विशेष जानकारियां भी आपको यहां मिलेंगी।
          </p>
        </div>

        {/* Our Categories */}
        <div className="about-text">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">हमारी श्रेणियाँ:</h2>
          <p className="text-gray-700 leading-relaxed">
            <b>1. राजनीति:</b> दुनिया भर की राजनीति पर ताजातरीन समाचार, विश्लेषण, और विचार।<br />
            <b>2. बिजनेस:</b> व्यापार जगत की उभरती प्रवृत्तियाँ, निवेश के अवसर, और वैश्विक आर्थिक परिप्रेक्ष्य।<br />
            <b>3. देश और दुनिया:</b> राष्ट्रीय और अंतर्राष्ट्रीय घटनाएं, महत्वपूर्ण समाचार, और विशेषज्ञ राय।<br />
            <b>4. खेल:</b> क्रिकेट, फुटबॉल, और अन्य खेलों की खबरें, लाइव अपडेट्स और मैच विश्लेषण।<br />
            <b>5. एंटरटेनमेंट:</b> फिल्मों, टेलीविज़न शो, और मशहूर हस्तियों की खबरें के साथ हम आपको बॉलीवुड, हॉलीवुड और अन्य फिल्म उद्योगों की ताजातरीन फिल्मों की विस्तारपूर्वक समीक्षा प्रदान करते हैं, जिससे आप यह जान सकें कि कौन सी फिल्म देखने लायक है।<br />

            <b>6. लाइफस्टाइल:</b> फैशन, फिटनेस, और जीवनशैली से जुड़ी जानकारी।<br />
            <b>7. विज्ञान और तकनीक:</b> नवीनतम आविष्कार, गैजेट्स, और तकनीकी विकास पर ध्यान केंद्रित करना।<br />
            <b>8. ऑटोमोबाइल:</b> नई कारों और बाइक्स के बारे में जानकारी, टेस्ट ड्राइव रिपोर्ट और तकनीकी विश्लेषण।<br />
            <b>9. पर्यावरण:</b> जलवायु परिवर्तन, पर्यावरणीय नीतियां, और प्राकृतिक संसाधनों के संरक्षण पर जानकारी।<br />
            <b>10.</b> राज्य समाचार: हम देश के हर राज्य से जुड़ी ताजातरीन और महत्वपूर्ण खबरों को एक स्थान पर प्रस्तुत करते हैं, ताकि आप देश के हर कोने से अपडेट रहें। यह स्थानीय घटनाओं, सरकार की योजनाओं और राज्य-विशेष विकास पर ध्यान केंद्रित करता है।<br />
            <b>11. गैजेट:</b> नई तकनीक, गैजेट्स, और उनकी समीक्षा।<br />
            <b>12. ग्राउंड रिपोर्ट:</b> वास्तविक घटनाओं पर आधारित विशेष रिपोर्टें।<br />
            <b>13. साप्ताहिक एनालिसिस:</b> हर सप्ताह हम प्रमुख घटनाओं, रिपोर्टों और घटनाओं का गहरा विश्लेषण करते हैं, जिससे आप जान सकें कि वे घटनाएँ आपके जीवन पर कैसे असर डाल सकती हैं। यह विश्लेषण राजनीति, बिजनेस, खेल और अन्य महत्वपूर्ण क्षेत्रों को कवर करता है।
          </p>
        </div>

        {/* Our Special Formats */}
        <div className="about-text">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">हमारे विशेष फॉर्मेट:</h2>
          <p className="text-gray-700 leading-relaxed">
            <b>संपादकीय:</b> हमारे संपादकों द्वारा तैयार किए गए विचारपूर्ण लेख और विश्लेषण।<br />
            <b>साक्षात्कार:</b> प्रसिद्ध व्यक्तित्वों और विशेषज्ञों के साथ विशेष बातचीत।<br />
            <b>वीडियो पॉडकास्ट:</b> विभिन्न विषयों पर वीडियो पॉडकास्ट और विशेषज्ञों की राय।<br />
            <b>ऑडियो पॉडकास्ट:</b> जानकारीपूर्ण और दिलचस्प ऑडियो पॉडकास्ट।<br />
            <b>पॉडकास्ट शो:</b> नियमित पॉडकास्ट शोज जो विभिन्न सामाजिक, राजनीतिक, और सांस्कृतिक मुद्दों को कवर करते हैं।<br />
            <b>डॉक्यूमेंट्री:</b> ऐतिहासिक घटनाओं, सामाजिक मुद्दों और अन्य महत्वपूर्ण विषयों पर डॉक्यूमेंट्री।<br />
            <b>कला और संस्कृति:</b> भारतीय कला, संस्कृति और परंपराओं की गहरी समझ।<br />
            <b>ऐतिहासिक स्थल और स्मारक:</b> भारत और दुनिया के ऐतिहासिक स्थल और स्मारकों पर विशेष रिपोर्ट।
          </p>
        </div>

        {/* Our Services */}
        <div className="about-text">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">हमारी सेवाएं:</h2>
          <p className="text-gray-700 leading-relaxed">
            <b>न्यूजलेटर:</b> हमारे साथ जुड़ें और ताजातरीन अपडेट्स और महत्वपूर्ण खबरें सीधे अपने ईमेल में प्राप्त करें।
          </p>
        </div>

        {/* Our Suggestions */}
        <div className="about-text">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">हमारे सुझाव:</h2>
          <p className="text-gray-700 leading-relaxed">
            हमारी वेबसाइट हमेशा आपके सुझावों और टिप्पणियों का स्वागत करती है। अगर आपको किसी विशेष विषय पर जानकारी चाहिए या कोई विशेष विचार है जिसे आप हमारे साथ साझा करना चाहते हैं, तो कृपया हमें बताएं। हम आपके इनपुट का सम्मान करते हैं और हमेशा इसे अपने कंटेंट को बेहतर बनाने के लिए उपयोग करेंगे।
          </p>
        </div>

        {/* Contact Us */}
        <div className="about-text">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">हमसे संपर्क करें:</h2>
          <p className="text-gray-700 leading-relaxed">
            हमारे बारे में और जानने के लिए या किसी विषय पर सवाल पूछने के लिए, कृपया हमें संपर्क करें। हम आपके साथ संवाद करने के लिए तत्पर हैं।
          </p>
        </div>
      </section>

      {/* Brand Logo Carousel - Optimized */}
      <section className="my-12 py-6 bg-gray-50 rounded-lg overflow-hidden">
        <div className="relative h-36 w-full">
          <div className="absolute flex items-center h-full animate-marquee whitespace-nowrap">
            {[...brands, ...brands].map((brand, index) => (
              <div 
                key={`${brand.id}-${index}`}
                className="inline-flex mx-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-tl-2xl"
              >
                <div className="flex items-center justify-center h-34 w-40 rounded-2xl">
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="h-full w-full object-contain p-2"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};