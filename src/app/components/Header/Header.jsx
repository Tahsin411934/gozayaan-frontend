import React from "react";
import Image from "next/image";
import { FaSquarePhone } from "react-icons/fa6";
const Header = () => {
  return (
    <header className="header-area-three w-[80%] mx-auto">
      <div className="main-header">
        {/* Header Top */}
        <div className="header-top  py-4 border-b border-gray-200">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              {/* Contact Section */}
              <div className="contact-section flex items-center">
               

                <div className="ml-3 flex items-center justify-center gap-2">
                <FaSquarePhone size={50} className="text-[#0F5393]" />
                <div>
                  <p className="text-sm text-gray-900">Call Anytime</p>
                  <h4 className="text-lg font-semibold">
                    <a href="javascript:void(0)" className="text-gray-800">
                      00 (888) +123456
                    </a>
                  </h4>
                  </div>
                </div>
              </div>

              {/* Sign In and Sign Up */}
              <div className="flex items-center space-x-6">
              <div className="h-7 w-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <p>
                  <a href="login.html" className="text-gray-900 hover:underline">
                    Sign In
                  </a>
                </p>
                <a
                  href="register.html"
                  className="btn-secondary-sm bg-[#EE262D] text-white py-2 px-4 rounded-full"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Header Bottom */}
        <div className="-mb-5">
          <div className="container mx-auto">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <div className="logo">
                <a href="index.html">
                  <Image
                    src="/logo.png" // Adjust the path based on your public folder structure
                    alt="logo"
                    width={150}
                    height={50}
                    className="changeLogo"
                  />
                </a>
              </div>

              {/* Navigation */}
              <nav className="hidden lg:flex space-x-6">
                <a href="about.html" className="text-gray-700 hover:text-blue-500">
                  Home
                </a>
                <a
                  href="destination.html"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Places to visit
                </a>
                <a href="tour-list.html" className="text-gray-700 hover:text-blue-500">
                  How it works
                </a>
                <a href="tour-list.html" className="text-gray-700 hover:text-blue-500">
                  Tips
                </a>
                <a href="tour-list.html" className="text-gray-700 hover:text-blue-500">
                  News
                </a>
                <a href="contact.html" className="text-gray-700 hover:text-blue-500">
                  Contact
                </a>
              </nav>

              {/* Mobile Menu */}
              <div className="lg:hidden">
                <div className="mobile_menu">
                  {/* Add mobile menu functionality here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
