import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src="https://res.cloudinary.com/dh3os5xi2/image/upload/v1742932493/Web_Logo_Black_r0dxzn.png" 
              alt="Logo" 
              className="h-12 w-auto filter brightness-0 invert"
            />
            <p className="text-gray-300">
              हमारी कंपनी के बारे में जानकारी और विजन
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">त्वरित लिंक</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">होम</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">हमारे बारे में</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">सेवाएं</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">संपर्क करें</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">सेवाएं</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">वेब डिज़ाइन</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">ऐप डेवलपमेंट</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">डिजिटल मार्केटिंग</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">SEO</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">संपर्क</h3>
            <address className="text-gray-300 not-italic">
              <p className="mb-2">123 बिजनेस सेंटर</p>
              <p className="mb-2">मुंबई, भारत 400001</p>
              <p className="mb-2">फोन: +91 98765 43210</p>
              <p className="mb-2">ईमेल: info@example.com</p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} आपकी कंपनी. सर्वाधिकार सुरक्षित | 
            <a href="#" className="hover:text-white ml-2">गोपनीयता नीति</a> | 
            <a href="#" className="hover:text-white ml-2">उपयोग की शर्तें</a>
          </p>
        </div>
      </div>
    </footer>
  );
};