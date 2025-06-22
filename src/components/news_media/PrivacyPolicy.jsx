import React from 'react';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Introduction Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Introduction</h2>
          <p className="mb-4">
            At Raviopedia, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
          <p>
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </div>

        {/* Information Collection Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Information We Collect</h2>
          <p className="mb-4">
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          
          <div className="ml-6">
            <h3 className="text-xl font-medium mb-2">Personal Data</h3>
            <p className="mb-4">
              Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.
            </p>
            
            <h3 className="text-xl font-medium mb-2">Derivative Data</h3>
            <p className="mb-4">
              Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.
            </p>
            
            <h3 className="text-xl font-medium mb-2">Cookies and Tracking Technologies</h3>
            <p>
              We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience.
            </p>
          </div>
        </div>

        {/* Use of Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Use of Your Information</h2>
          <p className="mb-4">
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          
          <ul className="list-disc ml-6 space-y-2 mb-4">
            <li>Create and manage your account</li>
            <li>Deliver targeted advertising, newsletters, and other information regarding promotions</li>
            <li>Email you regarding your account or order</li>
            <li>Enable user-to-user communications</li>
            <li>Increase the efficiency and operation of the Site</li>
            <li>Monitor and analyze usage and trends to improve your experience</li>
            <li>Notify you of updates to the Site</li>
            <li>Perform other business activities as needed</li>
          </ul>
          
          <p>
            We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request.
          </p>
        </div>

        {/* Data Security Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Security of Your Information</h2>
          <p className="mb-4">
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </p>
          
          <div className="ml-6">
            <h3 className="text-xl font-medium mb-2">Our Security Measures Include:</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>SSL encryption for data transmission</li>
              <li>Regular security audits of our systems</li>
              <li>Restricted access to personal information</li>
              <li>Employee training on data protection</li>
              <li>Secure servers with firewalls</li>
            </ul>
          </div>
        </div>

        {/* Policy Updates Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Policy Updates</h2>
          <p className="mb-4">
            This Privacy Policy may be updated from time to time to reflect changes to our information practices. If we make any material changes, we will notify you by email (sent to the email address specified in your account) or by means of a notice on this Site prior to the change becoming effective.
          </p>
          <p>
            We encourage you to periodically review this page for the latest information on our privacy practices.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Contact Us</h2>
          <p className="mb-4">
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          
          <div className="ml-6 space-y-2">
            <p><span className="font-medium">Email:</span> privacy@raviopedia.com</p>
            <p><span className="font-medium">Phone:</span> +91-8804922607</p>
            <p><span className="font-medium">Address:</span> Gaya, Bihar 823001, India</p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          This document was last updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </div>
  );
};
