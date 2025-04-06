import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Link to="/">
                <img 
                  src="https://res.cloudinary.com/dh3os5xi2/image/upload/v1742932493/Web_Logo_Black_r0dxzn.png" 
                  alt="Logo" 
                  className="h-10 w-auto filter brightness-0 invert transition-transform hover:scale-105"
                />
              </Link>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                YourBrand
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
            आज की तेज़ भागदौड़ भरी दुनिया में हर खबर, हर जानकारी मायने रखती है। हम आपको देश-विदेश, राजनीति, मनोरंजन, खेल, टेक्नोलॉजी, शिक्षा, बिजनेस और लाइफस्टाइल से जुड़ी हर जरूरी खबर सही, साफ और दिलचस्प अंदाज में पेश करते हैं। हमारा मकसद सिर्फ खबरें देना नहीं, बल्कि उनकी गहराई में जाकर आपको हर पहलू से जागरूक करना भी है।
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <FaFacebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">
                <FaTwitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-pink-600 transition-colors duration-300">
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                <FaLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 inline-block">त्वरित लिंक</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white flex items-center transition-colors duration-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  होम
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white flex items-center transition-colors duration-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  हमारे बारे में
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white flex items-center transition-colors duration-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  सेवाएं
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white flex items-center transition-colors duration-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  संपर्क करें
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 inline-block">सेवाएं</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/web-design" className="text-gray-300 hover:text-white flex items-center transition-colors duration-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  वेब डिज़ाइन
                </Link>
              </li>
              <li>
                <Link to="/services/app-development" className="text-gray-300 hover:text-white flex items-center transition-colors duration-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  ऐप डेवलपमेंट
                </Link>
              </li>
              <li>
                <Link to="/services/digital-marketing" className="text-gray-300 hover:text-white flex items-center transition-colors duration-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  डिजिटल मार्केटिंग
                </Link>
              </li>
              <li>
                <Link to="/services/seo" className="text-gray-300 hover:text-white flex items-center transition-colors duration-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  SEO
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 inline-block">संपर्क</h3>
            <address className="text-gray-300 not-italic space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-blue-400 flex-shrink-0" />
                <p>123 बिजनेस सेंटर, मुंबई, भारत 400001</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-3 text-blue-400" />
                <p>+91 98765 43210</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-blue-400" />
                <Link to="mailto:info@example.com" className="hover:text-white transition-colors duration-300">
                  info@example.com
                </Link>
              </div>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
            <p>
              © {new Date().getFullYear()} आपकी कंपनी. सर्वाधिकार सुरक्षित
            </p>
            <div className="hidden md:block">|</div>
            <div className="flex space-x-4 md:space-x-2">
              <Link to="/privacy-policy" className="hover:text-white transition-colors duration-300">
                गोपनीयता नीति
              </Link>
              <span className="hidden md:block">|</span>
              <Link to="/terms" className="hover:text-white transition-colors duration-300">
                उपयोग की शर्तें
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};