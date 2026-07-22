import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // 👈 নিশ্চিত করুন হেডারটি এখানে ইম্পোর্ট করা আছে
import Home from './components/Home';
import ServiceDetails from './components/ServiceDetails'; 
import Booking from './components/Booking'; 
import Contact from './components/Contact'; 
import CourseDetails from './components/CourseDetails'; 
import BlogPage from './components/BlogPage'; 
import BlogDetail from './components/BlogDetail'; 
import AboutMe from './components/AboutMe'; 
import ScrollToTop from './components/ScrollToTop'; // 💡 বোনাস ফিক্সড (নিচে এক্সপ্লেনেশন আছে)

function App() {
  return (
    <Router>
      {/* 🚀 গ্লোবাল স্ক্রোল ফিক্স: পেজ চেঞ্জ হলে স্ক্রিন স্বয়ংক্রিয়ভাবে একদম উপরে চলে যাবে */}
      <ScrollToTop />
  

      <Routes>
        {/* মেইন হোমপেজ রুট (হোমপেজ থেকে AboutMe সরিয়ে দেওয়া হয়েছে) */}
        <Route path="/" element={<Home />} />
        
        {/* বাকি সব রাউট আগের মতোই অপরিবর্তিত আছে */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        {/* 🎯 ডেডিকেটেড আলাদা About Me পেজ রাউট */}
        <Route path="/about" element={<AboutMe />} />
      </Routes>
    </Router>
  );
}

export default App;