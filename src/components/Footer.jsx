import React from "react";
import { Mail, MapPin, Phone, Calendar, User, Facebook, Twitter, Instagram, Heart, ChevronRight } from 'lucide-react';

const Footer = () => {
  const blog = [
    {
      date: "Jan 1, 2024",
      type: "Admin",
      title: "The Future of Online Education",
    },
    {
      date: "Feb 15, 2024",
      type: "Guest Author",
      title: "Top 10 Learning Trends in 2024",
    },
    {
      date: "March 10, 2024",
      type: "Editor",
      title: "How to Stay Motivated in Online Courses",
    },
  ];

  const exploreLinks = ["About Us", "Services", "Courses", "Blog", "Contact Us"];
  const quickLinks = ["Contact Us", "Pricing", "Terms & Conditions", "Privacy", "Feedback"];

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-8">
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h1>
            <p className="text-blue-100">Stay updated with the latest educational insights and opportunities</p>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg flex items-center space-x-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full p-3 bg-white/10 border-none outline-none text-white placeholder-blue-100 rounded-lg focus:ring-2 focus:ring-white/25 transition-all"
              />
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 px-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">ACADEMIA</h1>
              <span className="text-blue-600 font-semibold">ONLINE EDUCATION & LEARNING</span>
            </div>
            <p className="text-gray-600">
              Empowering minds through innovative online education and comprehensive learning solutions.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-gray-800">Explore</h3>
            <ul className="space-y-4">
              {exploreLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors duration-300">
                    <ChevronRight className="w-4 h-4" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-gray-800">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors duration-300">
                    <ChevronRight className="w-4 h-4" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-gray-800">Recent Posts</h3>
            <div className="space-y-6">
              {blog.map((post, index) => (
                <a
                  key={index}
                  href="#"
                  className="group flex items-start space-x-4 hover:bg-white p-2 rounded-lg transition-all duration-300"
                >
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.type}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-gray-800">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-600">123 Education Street, Learning City, ED 12345</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <a href="tel:+23923929210" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  +2 392 3929 210
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <a href="mailto:info@email.com" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  info@email.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="bg-gray-100 text-gray-600 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="flex items-center gap-2">
            Copyright ©2025 All rights reserved
          </p>
          <p className="flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by Harsh Pandey
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;