import React, { useState, useEffect } from 'react';
import {Bars3Icon, XMarkIcon, MagnifyingGlassIcon, EnvelopeIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { MdHome, MdPermContactCalendar } from "react-icons/md";
import { FaInfoCircle, FaPodcast } from "react-icons/fa";
import { GiNewspaper, GiClapperboard } from "react-icons/gi";
import { GrDocumentSound } from "react-icons/gr";
import { PiBookOpenUser } from "react-icons/pi";
import { FaLandmarkDome, FaBusinessTime, FaEarthAsia, FaDna } from "react-icons/fa6";
import { BsTrophyFill} from "react-icons/bs";
import { BiSolidCarMechanic } from "react-icons/bi";
import { RiSeedlingFill,RiRobot3Fill, RiAdminFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { TiNews } from "react-icons/ti";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isNewsHovered, setIsNewsHovered] = useState(false); // For desktop hover
  const [isNewsClicked, setIsNewsClicked] = useState(false); // For mobile click

  const menuItems = [
    { name: "लेख  | इंटरव्यू ", link: "/sampadkiye", icon: <FaInfoCircle className="mr-2" /> },
    { name: "पॉडकास्ट", link: "/podcast", icon: <FaPodcast className="mr-2" /> },
    { name: "डॉक्यूमेंट्री", link: "/documentary", icon: <GrDocumentSound className='mr-2'/> }
  ];

  const menuItems1 = [
    { icon: <TiNews />, text: "न्यूज़", path: "/news" },
    { icon: <PiBookOpenUser />, text: "राज्य", path: "/state" },
    { icon: <FaLandmarkDome />, text: "राजनीति", path: "/politics" },
    { icon: <FaEarthAsia />, text: "देश | दुनिया", path: "/world" },
    { icon: <BsTrophyFill />, text: "खेल", path: "/sports" },
    { icon: <GiClapperboard />, text: "एंटरटेनमेंट", path: "/entertainment" },
    { icon: <FaDna />, text: "लाइफस्टाइल", path: "/lifestyle" },
    { icon: <RiRobot3Fill />, text: "विज्ञान | तकनीक ", path: "/science" },
    { icon: <BiSolidCarMechanic />, text: "ऑटोमोबाइल", path: "/automobile" },
    { icon: <RiSeedlingFill />, text: "पर्यावरण", path: "/environment" },
    { icon: <FaBusinessTime />, text: "बिज़नेस", path: "/business" }, 
  ];

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeAllMenus = () => {
    setIsOpen(false);
    setIsNewsClicked(false);
    setIsNewsHovered(false);
  };

  return (
    <nav className={`bg-white sticky top-0 z-50 shadow-md transition-transform duration-200 ${isScrolling ? '-translate-y-2' : 'translate-y-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-24 items-center">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" onClick={closeAllMenus}>
                <img
                  className="h-10 md:h-16 w-auto"
                  src="https://res.cloudinary.com/dh3os5xi2/image/upload/v1742932493/Web_Logo_Black_r0dxzn.png"
                  alt="Logo"
                />
              </Link>
            </div>
          </div>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link to="/" className="flex items-center px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-lg font-medium text-gray-100 hover:bg-orange-500 bg-blue-500 rounded-2xl" onClick={closeAllMenus}>
              <MdHome className="mr-1 md:mr-2" />होम 
            </Link>
            
            <div 
              className="group relative"
              onMouseEnter={() => setIsNewsHovered(true)}
              onMouseLeave={() => setIsNewsHovered(false)}
            >
              <button className="flex items-center px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-lg font-medium text-gray-700 hover:text-blue-500">
                <GiNewspaper className="mr-1 md:mr-2" /> न्यूज़ | मीडिया
              </button>
              
              <div 
                className={`absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200 transition-all duration-300 ${isNewsHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                {menuItems1.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-transform hover:translate-x-1"
                    onClick={closeAllMenus}
                  >
                    <span className="mr-2 text-indigo-500">{item.icon}</span>
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2 lg:space-x-6">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="flex items-center px-2 py-1.5 md:px-3 md:py-2 text-sm md:text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-200"
                  onClick={closeAllMenus}
                >
                  {item.icon}
                  <span className="hidden lg:inline">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - Icons and Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/search" className="p-1.5 md:p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600" onClick={closeAllMenus}>
              <MagnifyingGlassIcon className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
            
            <div className="hidden md:flex items-center space-x-2 md:space-x-4">
              <Link to="/contact/ContactForm" className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600" onClick={closeAllMenus}>
                <MdPermContactCalendar className="h-5 w-5" />
              </Link>

              <Link to="/login" className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600" onClick={closeAllMenus}>
                <RiAdminFill className="h-5 w-5" />
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none md:hidden"
            >
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-500"
            onClick={closeAllMenus}
          >
            <MdHome className="mr-2" /> होम
          </Link>
          
          <div className="pt-1">
            <button 
              className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
              onClick={() => setIsNewsClicked(!isNewsClicked)}
            >
              <span className="flex items-center">
                <GiNewspaper className="mr-2" /> न्यूज़ | मीडिया
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${isNewsClicked ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`pl-4 mt-1 space-y-1 ${isNewsClicked ? 'block' : 'hidden'}`}>
              {menuItems1.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                  onClick={closeAllMenus}
                >
                  <span className="mr-2 text-indigo-500">{item.icon}</span>
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
          
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
              onClick={closeAllMenus}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          
          <div className="flex space-x-4 px-3 py-2 border-t border-gray-200 mt-2">
            <Link to="/contact" className="flex items-center justify-center p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600" onClick={closeAllMenus}>
              <MdPermContactCalendar className="h-5 w-5" />
            </Link>
            <Link to="/login" className="flex items-center justify-center p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600" onClick={closeAllMenus}>
              <RiAdminFill className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};