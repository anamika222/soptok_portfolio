import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // 🛠️ টাইপো ফিক্সড
import { Star, ShieldCheck, Zap, ArrowLeft, ArrowRight } from 'lucide-react';

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/services/')
      .then(response => {
        setServices(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (services.length <= visibleCards) return;
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= services.length - visibleCards ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => resetTimeout();
  }, [currentIndex, services, visibleCards]);

  const nextSlide = () => {
    if (services.length <= visibleCards) return;
    setCurrentIndex((prevIndex) =>
      prevIndex >= services.length - visibleCards ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (services.length <= visibleCards) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - visibleCards : prevIndex - 1
    );
  };

  // 🎯 সুপার ড্রামাটিক স্ক্রোল কন্টেইনার ভেরিয়েন্ট
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.35, // ⏱️ প্রতি কার্ডের মাঝের গ্যাপ বাড়িয়ে ০.৩৫ সেকেন্ড করা হলো (যাতে আলাদাভাবে বোঝা যায়)
        delayChildren: 0.15
      }
    }
  };

  // 🎯 কার্ডের নিচ থেকে ওপরে ওঠার হাই-ইমপ্যাক্ট ভেরিয়েন্ট
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 200,      // 🚀 শুরুতেই ২০০ পিক্সেল নিচে থাকবে, ফলে প্রথমে স্ক্রিনে বিন্দুমাত্র দেখা যাবে না
      scale: 0.8,  // ছোট থেকে বড় হওয়ার পপ-আপ ইফেক্ট
      rotateX: 15  // হালকা থ্রিডি ফ্লেয়ার এনে দেবে
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: { 
        type: 'spring', 
        stiffness: 40, // মুভমেন্ট একটু ভারী ও অলস করা হলো যাতে প্রিমিয়াম লাগে
        damping: 12    // ওপরে এসে একটি চমৎকার স্মুথ বাউন্স খাবে
      } 
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px] bg-[#0b0f1a]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-cyan-400"></div>
    </div>
  );

  return (
    <motion.section 
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} // ইউজার ১০০ পিক্সেল স্ক্রোল করে ভেতরে ঢুকলেই ম্যাজিক শুরু হবে
      className="py-20 bg-[#0b0f1a] overflow-hidden relative [perspective:1000px]" // থ্রিডি রোটেশনের জন্য পার্সপেক্টিভ অ্যাড করা হয়েছে
    >
      <div className="container mx-auto px-6 relative max-w-7xl">
        
        {/* হেডার এবং বাটন */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black text-white md:text-5xl tracking-tight">
              Our Solutions & <span className="text-cyan-400">Services</span>
            </h2>
            <p className="text-slate-400 mt-4 text-base font-light">Explore our professional solutions tailored for your business growth.</p>
          </div>
          
          {services.length > visibleCards && (
            <div className="flex items-center gap-4 shrink-0">
              <button onClick={prevSlide} className="w-12 h-12 bg-slate-900/60 text-slate-300 rounded-full border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all">
                <ArrowLeft size={18} strokeWidth={2.5} />
              </button>
              <button onClick={nextSlide} className="w-12 h-12 bg-slate-900/60 text-slate-300 rounded-full border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all">
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        {/* স্লাইডার উইন্ডো কন্টেইনার */}
        <div className="w-full overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {services.map((service) => (
              <div 
                key={service.id} 
                className="w-full shrink-0 px-4"
                style={{ width: `${100 / visibleCards}%` }}
              >
                {/* 🎯 আল্ট্রা-প্রিমিয়াম মোশন কার্ড */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                    borderColor: "rgba(34, 211, 238, 0.5)", 
                    boxShadow: "0px 0px 30px rgba(34, 211, 238, 0.3)",
                    transition: { duration: 0.2 }
                  }}
                  className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 shadow-xl flex flex-col justify-between h-full relative group transition-colors duration-300 cursor-pointer"
                >
                  <div>
                    {/* ইমেজ এরিয়া */}
                    <div className="relative w-full h-48 rounded-[1.8rem] overflow-hidden bg-slate-950 mb-6">
                      {service.image ? (
                        <motion.img 
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.4 }}
                          src={service.image} 
                          alt={service.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">No Image</div>
                      )}
                      <span className="absolute top-4 left-4 bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
                        Service
                      </span>
                    </div>

                    {/* রেটিং ও স্ট্যাটাস */}
                    <div className="flex items-center gap-2 text-xs mb-4">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="#fbbf24" className="text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-bold text-white ml-1">5.0</span>
                      <span className="text-slate-700">|</span>
                      <span className="text-emerald-400 font-medium">Active</span>
                    </div>

                    {/* টাইটেল */}
                    <h3 className="text-xl font-black text-white leading-tight mb-5 min-h-[56px] line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {service.name}
                    </h3>

                    {/* কি-ফিচার */}
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-5 mb-6">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-cyan-400" />
                        <span className="font-light">24/7 Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap size={16} className="text-indigo-400" />
                        <span className="font-light">Premium Access</span>
                      </div>
                    </div>
                  </div>

                  {/* বাটন এরিয়া */}
                  <div className="flex items-center justify-between mt-auto">
                    <Link to={`/service/${service.id}`} className="text-xs font-bold text-slate-300 tracking-wider uppercase flex items-center gap-1 hover:text-cyan-400 transition-colors">
                      Details <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                    <Link to={`/service/${service.id}`} className="bg-indigo-600 text-white font-bold text-xs px-5 py-3.5 rounded-xl shadow-lg hover:bg-indigo-500 transition-colors uppercase tracking-wider active:scale-95 duration-150">
                      View Service
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default Service;