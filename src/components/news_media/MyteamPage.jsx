import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export const MyteamPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Rk Ranjan",
      role: "Founder",
      image: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1751914562/RK_Ranjan_rlbitx.png",
    },
    {
      id: 2,
      name: "Rahul Bharti",
      role: "Director",
      image: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137341/Rahul_Bhartie_jccxvp.png",
    },
    {
      id: 3,
      name: "Sachin Kumar",
      role: "Multimedia Producer",
      image: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137555/Profile_Sachin_Kumar_2000_kif0fb.png",
    },
    {
      id: 4,
      name: "Avneesh Chaudhari",
      role: "Podcast Editor",
      image: "src/Assets/Image/01.jpg",
    },
    {
      id: 5,
      name: "Sunny Sharma",
      role: "Content Writer",
      image: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1744137422/ProfileSunnySharma_o3bdoq.png",
    },
    // {
    //   id: 6,
    //   name: "Neha Nandini",
    //   role: "Content Writer",
    //   image: "src/Assets/Image/01.jpg",
    // },
    // {
    //   id: 7,
    //   name: "Prity kumari",
    //   role: "Accountant",
    //   image: "src/Assets/Image/01.jpg",
    // },
    {
      id: 8,
      name: "Satyadeo kumar",
      role: "Sub Editor",
      image: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1751914812/Profile_Satyadeo_ktm7is.png",
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Meet Our Awesome Team
          </h2>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              {/* Member Image */}
              <div className="w-full h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {/* Member Info */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {member.role}
                </p>
                
                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                    <FaLinkedinIn className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-400 dark:hover:text-blue-400 transition-colors">
                    <FaTwitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

