import React from "react";
import {Link} from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="text-xl font-bold text-gray-800">Bloggify</div>
        <nav className="space-x-6">
          <a href="#home" className="text-gray-600 hover:text-blue-500"><b>Home</b></a>
          <a href="#categories" className="text-gray-600 hover:text-blue-500"><b>Categories</b></a>
          <a href="#blogs" className="text-gray-600 hover:text-blue-500"><b>Blogs</b></a>
          <a href="#about" className="text-gray-600 hover:text-blue-500"><b>About</b></a>
          <a href="#contact" className="text-gray-600 hover:text-blue-500"><b>Contact Us</b></a>
        </nav>
        <div className="space-x-4">
          <Link to="signin"> 
            <button className="text-gray-600 hover:text-blue-500">Log In</button>
          </Link>
          <Link to="signup">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">Sign Up</button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-extrabold text-gray-800">
        <span className="text-red-500">Discover. Learn. Share.</span> Welcome to Your Next Favorite Blog
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Bloggify is a friend for expressing your creativity where one can explore a world of ideas, stories, and insights crafted to inform and inspire.
        </p>
        <Link to="/signup">
            <button className="mt-6 px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-full hover:bg-red-600">
                Get Started
            </button>
        </Link>
        
      </section>

      {/* Features Section */}
      <section className="bg-white py-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Fuel Your Curiosity – One Blog at a Time
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-8">
          <div className="text-center">
            <img src="/icons/shared-inbox.svg" alt="Shared Inbox" className="mx-auto h-16 mb-4" />
            <h3 className="text-lg font-bold">Shared Inbox</h3>
            <p className="text-gray-600">Streamline team communication and collaboration.</p>
          </div>
          <div className="text-center">
            <img src="/icons/automation.svg" alt="Automation" className="mx-auto h-16 mb-4" />
            <h3 className="text-lg font-bold">Team Collaboration</h3>
            <p className="text-gray-600">Automate workflows and improve productivity.</p>
          </div>
          <div className="text-center">
            <img src="/icons/customer-data.svg" alt="Customer Data" className="mx-auto h-16 mb-4" />
            <h3 className="text-lg font-bold">Customer Data</h3>
            <p className="text-gray-600">Leverage insights to make informed decisions.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">What our Users say</h2>
        <div className="max-w-4xl mx-auto px-8">
          <blockquote className="text-gray-700 italic border-l-4 border-red-500 pl-4 mb-6">
            “Bloggify is really intuitive to use and very insightful for obtaining all one needs to know about a topic or subject”
          </blockquote>
          <cite className="block text-right text-gray-600">-Syed Faiz Ahmed, III Year Student</cite>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center py-16 bg-white">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            Explore Ideas, Insights, and Stories That Matter
        </h2>
        <Link to="signup">
            <button className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-full hover:bg-red-600">
                Get Started
            </button>
        </Link>
        
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#pricing" className="hover:underline">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><a href="#customer-support" className="hover:underline">Customer Support</a></li>
              <li><a href="#team-collaboration" className="hover:underline">Team Collaboration</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#blogs" className="hover:underline">Blogs</a></li>
              <li><a href="#webinars" className="hover:underline">Webinars</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#careers" className="hover:underline">Careers</a></li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-6 text-sm">&copy; 2025 Bloggify, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
