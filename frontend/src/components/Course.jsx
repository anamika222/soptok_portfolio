import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// ১. ফ্রেমার মোশন ও আইকন ইম্পোর্ট
import { motion } from 'framer-motion';
import { Star, Clock, ArrowRight, BookOpen } from 'lucide-react';

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // পুরনো ক্যাশ এড়ানোর ট্রিকসহ রিয়েল ইউআরএল সিঙ্ক
        axios.get(`http://127.0.0.1:8000/api/courses/?t=${new Date().getTime()}`) 
            .then(res => {
                setCourses(Array.isArray(res.data) ? res.data : res.data.results || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Course load error:", err);
                setLoading(false);
            });
    }, []);

    // ১. ক্যাসকেড বা সিরিয়াল এন্ট্রান্স ভেরিয়েন্ট
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 } // একটির পর আরেকটি কার্ড আসবে
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { type: 'spring', stiffness: 80, damping: 12 } 
        },
        // ২. স্মার্ট হোভার এবং নিওন গ্লো ইফেক্ট (Indigo/Sayan Mixed Glow)
        hover: {
            y: -10,
            scale: 1.02,
            borderColor: "rgba(99, 102, 241, 0.6)", // ইনডিগো গ্লো বর্ডার
            boxShadow: "0px 0px 25px rgba(99, 102, 241, 0.35)", // নিওন ব্যাকলাইট শ্যাডো
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[500px] bg-[#0b0f1a] py-20 text-slate-300">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
        </div>
    );

    return (
        <section className="py-24 bg-[#0b0f1a] overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                
                {/* হেডিং সেকশন */}
                <div className="text-center mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
                    >
                        আমাদের <span className="text-indigo-400">কোর্সসমূহ</span>
                    </motion.h2>
                    <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full mb-6"></div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed"
                    >
                        আপনার স্কিল ডেভেলপমেন্টের জন্য প্রফেশনাল ও ইন্ডাস্ট্রি ফোকাসড কোর্সসমূহ।
                    </motion.p>
                </div>

                {courses.length === 0 ? (
                    <div className="text-center text-slate-400 text-sm italic py-12 bg-slate-900/30 rounded-3xl border border-slate-800">
                        কোনো курс পাওয়া যায়নি। (দয়া করে জ্যাঙ্গো অ্যাডমিন প্যানেলে অন্তত ১টি কোর্স যোগ করুন)
                    </div>
                ) : (
                    /* ৩. গ্রিড কন্টেইনার (২টি করে কলামে চমৎকারভাবে ফিট হবে) */
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                    >
                        {courses.map(course => (
                            <motion.div
                                key={course.id}
                                variants={cardVariants}
                                whileHover="hover"
                                className="group relative flex flex-col md:flex-row bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 gap-8 transition-all duration-300"
                            >
                                {/* বাম পাশের ইমেজ এরিয়া */}
                                <div className="md:w-2/5 h-56 md:h-auto overflow-hidden rounded-[2rem] relative bg-slate-900">
                                    {course.image ? (
                                        // ৩. ইমেজ প্যানিং (Zoom on Hover)
                                        <motion.img 
                                            whileHover={{ scale: 1.15 }}
                                            transition={{ duration: 0.6 }}
                                            src={course.image} 
                                            alt={course.name} 
                                            className="w-full h-full object-cover" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">No Image</div>
                                    )}
                                    <span className="absolute top-4 left-4 bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md">
                                        {course.version || "Offline"}
                                    </span>
                                </div>

                                {/* ডান পাশের টেক্সট ও প্রাইস এরিয়া */}
                                <div className="md:w-3/5 flex flex-col justify-between py-1">
                                    <div>
                                        <h3 className="text-2xl font-black text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-1">
                                            {course.name}
                                        </h3>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light line-clamp-2">
                                            {course.course_overview}
                                        </p>

                                        {/* মেটা ইনফো (ডিউরেশন ও ফাইভ স্টার রেটিং) */}
                                        <div className="space-y-4 mb-6">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={15} fill="#fbbf24" className="text-yellow-400" />
                                                ))}
                                                <span className="text-white text-xs font-bold ml-2">5.0 | Active</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                                                <Clock size={16} className="text-indigo-400" />
                                                <span>⏱️ {course.duration}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* প্রাইস এবং অ্যাকশন বাটন */}
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/60">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Course Fee</span>
                                            <span className="text-2xl font-black text-emerald-400">৳{parseFloat(course.price).toLocaleString()}</span>
                                        </div>
                                        <Link to={`/courses/${course.id}`} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
                                            View Details <ArrowRight size={15} />
                                        </Link>
                                    </div>
                                </div>

                                {/* বর্ডার নিখুঁত করতে ওভারলে গ্লো */}
                                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent group-hover:border-indigo-500/20 pointer-events-none transition-all duration-500"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Course;