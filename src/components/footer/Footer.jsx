import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn, FaTelegram } from 'react-icons/fa';

export const Footer = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    <footer className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="footer-widget">
            <Link to="/">
              <img 
                src="https://res.cloudinary.com/dh3os5xi2/image/upload/v1742932493/Web_Logo_Black_r0dxzn.png" 
                className="logo h-12 mb-4 dark:invert" 
                alt="Raviopedia Logo"
              />
            </Link>
            <p className="desc text-sm mb-4">
              आज की तेज़ भागदौड़ भरी दुनिया में हर खबर, हर जानकारी मायने रखती है। हम आपको देश-विदेश, राजनीति, मनोरंजन, खेल, टेक्नोलॉजी, शिक्षा, बिजनेस और लाइफस्टाइल से जुड़ी हर जरूरी खबर सही, साफ और दिलचस्प अंदाज में पेश करते हैं। हमारा मकसद सिर्फ खबरें देना नहीं, बल्कि उनकी गहराई में जाकर आपको हर पहलू से जागरूक करना भी है। 
              {showMore && (
                <span id="more" className="block mt-2">
                  चुनाव, अर्थव्यवस्था, खेती-किसानी और बिजनेस से लेकर अपराध की चौंकाने वाली खबरों तक, हम हर क्षेत्र पर पैनी नजर रखते हैं। वहीं, खेल की दुनिया की लाइव खबरें, बॉलीवुड-हॉलीवुड और ओटीटी प्लेटफार्म से जुड़ी ताजा जानकारी, फिल्म समीक्षाएं और टेलीविजन जगत की हलचल भी आपको यहां मिलेगी।

                  हमारी खास रिपोर्टिंग में जमीनी सच्चाई दिखाने वाली ग्राउंड रिपोर्ट, आसान भाषा में समझाने वाले एक्सप्लेनर, खास लोगों के इंटरव्यू और विचारों को सामने रखने वाले संपादकीय शामिल हैं। डॉक्यूमेंट्री और पॉडकास्ट शो के जरिए हम आपको उन मुद्दों से जोड़ते हैं जो आपके जीवन पर असर डालते हैं। धर्म, राशिफल, सेहत, रिश्ते, घूमने-फिरने, खाना-पीना, फैशन और घर से जुड़े खास टिप्स भी आपको यहां मिलेंगे, जो आपकी रोजमर्रा की जिंदगी को आसान बनाएंगे।

                  हम पर्यावरण, कला-संस्कृति, ऐतिहासिक जगहों और स्मारकों की कहानियां भी आपके सामने लाते हैं, ताकि आप देश-दुनिया की धरोहरों और परंपराओं को करीब से जान सकें। मौसम के बदलते हालात से लेकर राज्यों और शहरों की जमीनी हकीकत तक, हम हर जरूरी खबर आप तक पहुंचाते हैं।

                  हमारी कोशिश है कि आपको सबसे तेज, भरोसेमंद और दिलचस्प खबरें दें। इसलिए, हम आपके लिए वीकली रिपोर्ट, न्यूजलेटर, वीडियो-पॉडकास्ट और ऑडियो-पॉडकास्ट लेकर आते हैं, ताकि आप हर खबर से जुड़े रहें।

                  हर खबर, हर जानकारी—आपके लिए, आपके साथ।
                </span>
              )}
              <button 
                onClick={toggleReadMore}
                className="text-blue-600 dark:text-blue-400 hover:underline mt-2 focus:outline-none"
              >
                {showMore ? 'Read less' : 'Read more'}
              </button>
            </p>
            <ul className="socials flex space-x-4">
              <li>
                <Link to="https://www.facebook.com/raviopedia" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-125">
                  <FaFacebookF className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <Link to="https://x.com/raviopedia" className="text-gray-700 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-400 transition-all hover:scale-125">
                  <FaTwitter className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <Link to="https://www.instagram.com/raviopedia
                  " className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all hover:scale-125">
                  <FaInstagram className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <Link to="https://youtube.com/@raviopedia
                      " className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all hover:scale-125">
                  <FaYoutube className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <Link to="https://www.linkedin.com/company/raviopedia" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-500 transition-all hover:scale-125">
                  <FaLinkedinIn className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <Link to="https://t.me/raviopedia
                  " className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:scale-125">
                  <FaTelegram className="w-5 h-5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Category Links with Hindi headings but English links */}
          <div className="footer-widget">
            <h6 className="text-lg font-semibold mb-4">Category</h6>
            <ul className="links space-y-2">
              <li><Link to="/news" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">News</Link></li>
              <li><Link to="/state" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">State</Link></li>
              <li><Link to="/politics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Politics</Link></li>
              <li><Link to="/world" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Country | World</Link></li>
              <li><Link to="/sports" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sports</Link></li>
              <li><Link to="/entertainment" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Entertainment</Link></li>
              <li><Link to="/lifestyle" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Lifestyle</Link></li>
              <li><Link to="/science" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Science | Technology</Link></li>
              <li><Link to="/automobile" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Automobile</Link></li>
              <li><Link to="/environment" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Environment</Link></li>
            </ul>
          </div>

          {/* Tag Links */}
          <div className="footer-widget">
            <h6 className="text-lg font-semibold mb-4">Tag</h6>
            <ul className="links space-y-2">
              <li><Link to="https://www.eci.gov.in" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Election</Link></li>
              <li><Link to="https://bikanervala.com/?srsltid=AfmBOopNIqpv4Y1NYX2kyqqMH-EwRhNsa4Ytm2NgcFmDuiYWbZkwSz9Z" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Food</Link></li>
              <li><Link to="https://www.verywellfit.com/internet-fitness-and-health-information-1231194" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Health</Link></li>
              <li><Link to="https://delhi.gov.in/page/about-us" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">State</Link></li>
              <li><Link to="https://www.mca.gov.in/content/mca/global/en/home.html" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Corporate</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-widget">
            <h6 className="text-lg font-semibold mb-4">Quick Link</h6>
            <ul className="links space-y-2">
              <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact/ContactForm" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms & Condition</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</Link></li>
              <li><Link to="/notfound" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">404 Pages</Link></li>
              <li><Link to="/team" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">My Team</Link></li>
              <li><Link to="/feedback" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Feedback</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright-wrapper border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">
            &copy; 2025 <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">Raviopedia.</Link>
            <span> All Right Reserved</span>
          </p>
        </div>
      </div>
    </footer>
  );
};