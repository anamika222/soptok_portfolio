import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // আপনার ব্যাকএন্ড ব্লগ এপিআই এন্ডপয়েন্ট
    axios.get('http://127.0.0.1:8000/api/blogs/')
      .then(response => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#0b0f1a]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-400"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-100 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* হেডার সেকশন */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 uppercase tracking-widest mb-4">
            <Sparkles size={12}/> Our Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">সর্বশেষ ব্লগ ও আর্টিকেল</h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-light">
            টেকনোলজি, ফ্রিল্যান্সিং এবং ক্যারিয়ার গাইডলাইন নিয়ে আমাদের নিয়মিত লিখা।
          </p>
        </div>

        {/* ব্লগ গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* ইমেজ পার্ট */}
              <div className="relative h-48 bg-slate-950 overflow-hidden">
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700 bg-slate-950"><BookOpen size={40}/></div>
                )}
                <span className="absolute top-4 left-4 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md">
                  {blog.category}
                </span>
              </div>

              {/* টেক্সট কন্টেন্ট */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* মেটা ডাটা */}
                  <div className="flex items-center gap-4 text-slate-500 text-xs font-medium mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(blog.created_at).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {blog.read_time} Mins Read</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2 leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed line-clamp-3 mb-4">
                    {blog.excerpt || blog.content}
                  </p>
                </div>

                <Link to={`/blog/${blog.slug || blog.id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/link mt-2">
                  <span>বিস্তারিত পড়ুন</span>
                  <ArrowRight size={14} className="transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogPage;