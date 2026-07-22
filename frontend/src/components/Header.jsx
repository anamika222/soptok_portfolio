import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🎯 ১. useNavigate ইম্পোর্ট করা হয়েছে

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // 🎯 ২. নেভিগেশন ইনিশিয়ালাইজ করা হয়েছে

  const handleScroll = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* ১. লোগো সেকশন */}
        <div className="flex items-center cursor-pointer" onClick={() => { navigate('/'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
          <img src="/logo.jpg" alt="Soptok Chatterjee Logo" className="h-12 w-auto object-contain mr-2" />
        </div>

        {/* ২. ডেস্কটপ মেনু */}
        <div className="hidden md:flex items-center space-x-8 font-semibold text-gray-700">
          <button onClick={() => { navigate('/'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-blue-600 transition cursor-pointer">Home</button>
          
          {/* 🎯 ৩. ডেস্কটপ About Me বাটন ফিক্স (ক্লিক করলে সরাসরি /about পেজে যাবে) */}
          <button onClick={() => { setIsOpen(false); navigate('/about'); }} className="hover:text-blue-600 transition cursor-pointer">About Me</button>
          
          <button onClick={() => handleScroll('services')} className="hover:text-blue-600 transition cursor-pointer">Services</button>
          <button onClick={() => handleScroll('courses')} className="hover:text-blue-600 transition cursor-pointer">Courses</button>
          <button onClick={() => handleScroll('blogs')} className="hover:text-blue-600 transition cursor-pointer">Blogs</button>
          <button onClick={() => handleScroll('testimonials')} className="hover:text-blue-600 transition cursor-pointer">Testimonials</button>
        </div>

        {/* ৩. ফ্রি কনসালটেশন বাটন */}
        <div className="hidden md:block">
          <button 
            onClick={() => handleScroll('consultation')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-lg shadow transition cursor-pointer"
          >
            Free Consultation
          </button>
        </div>

        {/* ৪. মোবাইল মেনু বাটন */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none text-2xl font-bold cursor-pointer">
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ৫. মোবাইল ড্রপডাউন মেনু */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 font-semibold text-gray-700 flex flex-col shadow-inner">
          <button onClick={() => { navigate('/'); window.scrollTo({top: 0, behavior: 'smooth'}); setIsOpen(false); }} className="text-left py-1 hover:text-blue-600">Home</button>
          
          {/* 🎯 ৪. মোবাইল About Me বাটন ফিক্স */}
          <button onClick={() => { setIsOpen(false); navigate('/about'); }} className="text-left py-1 hover:text-blue-600">About Me</button>
          
          <button onClick={() => handleScroll('services')} className="text-left py-1 hover:text-blue-600">Services</button>
          <button onClick={() => handleScroll('courses')} className="text-left py-1 hover:text-blue-600">Courses</button>
          <button onClick={() => handleScroll('blogs')} className="text-left py-1 hover:text-blue-600">Blogs</button>
          <button onClick={() => handleScroll('testimonials')} className="text-left py-1 hover:text-blue-600">Testimonials</button>
          <button 
            onClick={() => handleScroll('consultation')}
            className="bg-orange-500 text-white text-center font-bold py-2.5 rounded-lg mt-2 shadow cursor-pointer"
          >
            Free Consultation
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;