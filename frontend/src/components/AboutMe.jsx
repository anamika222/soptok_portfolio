import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useInView } from 'framer-motion';
import { ArrowLeft } from 'lucide-react'; // 💡 ব্যাক বাটনের জন্য লুকুসাইড আইকন (অথবা সাধারণ টেক্সট ব্যবহার করতে পারেন)
import myProfilePic from '../assets/profile.jpeg'; // 📸 পাথটি নিশ্চিত করুন

// 🔢 ডায়নামিক কাউন্টার কম্পোনেন্ট
const AnimatedCounter = ({ value, duration = 2 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = parseInt(value, 10);
            if (isNaN(end)) return;

            const totalMiliseconds = duration * 1000;
            const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 10);

            const timer = setInterval(() => {
                start += Math.ceil(end / (totalMiliseconds / incrementTime));
                if (start >= end) {
                    clearInterval(timer);
                    start = end;
                }
                setCount(start);
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [inView, value, duration]);

    const suffix = value.includes('+') ? '+' : value.includes('-') ? value.substring(value.indexOf('-')) : '';

    return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
};

const AboutMe = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 🖱️ মাউস ট্র্যাকিং (3D Parallax এফেক্ট ছবির জন্য)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;
        x.set(mouseX / 30);
        y.set(mouseY / 30);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // 📊 কাস্টম ড্যাশবোর্ড ডেটা
    const expertises = [
        { title: 'Search Engine Optimization (SEO)', level: '100%', color: 'from-emerald-500 to-teal-400' },
        { title: 'Content Marketing', level: '96%', color: 'from-blue-500 to-indigo-400' },
        { title: 'Pay-Per-Click (PPC) Ads', level: '95%', color: 'from-cyan-500 to-blue-400' },
        { title: 'Social Media Advertising', level: '100%', color: 'from-purple-500 to-pink-400' },
        { title: 'Social Media Marketing', level: '100%', color: 'from-teal-500 to-emerald-400' },
        { title: 'Email Marketing', level: '97%', color: 'from-indigo-500 to-purple-400' },
        { title: 'Marketing Analytics & Tracking', level: '98%', color: 'from-emerald-400 to-cyan-400' }
    ];

    // 📉 মাইলস্টোনের ডেসক্রিপশনগুলো একটু ক্রিস্প ও ছোট করা হয়েছে যাতে হাইট কমে আসে
    const journeySteps = [
        { year: '2016', title: 'The Learning Phase', description: 'ডিজিটাল মার্কেটিংয়ের দুনিয়ায় পথচলা শুরু। কঠোর পরিশ্রম ও ডেটা-ড্রিভেন স্ট্র্যাটেজি শেখার মাধ্যমে নিজের ভিত্তি মজবুত করা।' },
        { year: 'Fiverr #1', title: 'Global Marketplace Success', description: 'ফাইভার মার্কেটপ্লেসে অসাধারণ সাফল্যের সাথে শীর্ষস্থানে পৌঁছানো এবং ১০০০+ আন্তর্জাতিক ক্লায়েন্টের সাথে কাজ করার গৌরব।' },
        { year: 'Mentorship', title: '1000+ Future Leaders', description: 'সরকারি প্রজেক্ট ও দেশের শীর্ষস্থানীয় আইটি ইনস্টিটিউটের মেন্টর হিসেবে ১০০০-এরও বেশি শিক্ষার্থীকে সরাসরি সফলভাবে প্রশিক্ষণ প্রদান।' },
        { year: 'Founding', title: 'Drive to Traffic', description: 'ফ্রিল্যান্সার থেকে বিজনেস ওনারে রূপান্তর। গ্লোবাল ও লোকাল বিজনেসের আসল ROI ও রেভিনিউ নিশ্চিত করতে প্রিমিয়াম এজেন্সির যাত্রা।' },
        { year: 'Present', title: 'NSDA Certified Expert', description: 'মার্কেটিং ও ট্রেইনিং ইন্ডাস্ট্রিতে সর্বোচ্চ দক্ষতার স্বীকৃতিস্বরূপ ন্যাশনাল স্কিল ডেভেলপমেন্ট অথরিটি (NSDA) থেকে Level 3-6 সার্টিফাইড।' }
    ];

    const frameworks = [
        { step: '01', title: 'Data & Tracking Audit', desc: 'বিজনেসের বর্তমান ট্র্যাকিং গ্যাপস, পিক্সেল এবং GA4/GTM সেটআপ নিখুঁতভাবে অডিট করা।' },
        { step: '02', title: 'Funnel Engineering', desc: 'শুধু ট্রাফিক নয়, কোল্ড অডিয়েন্সকে লয়াল কাস্টমারে রূপান্তর করতে কাস্টম সেলস ফানেল তৈরি।' },
        { step: '03', title: 'ROI Optimization', desc: 'অপ্রয়োজনীয় বিজ্ঞাপনের খরচ কমিয়ে প্রতিটি সেন্টের সর্বোচ্চ প্রফিট ও আরওআই নিশ্চিত করা।' },
        { step: '04', title: 'Aggressive Scaling', desc: 'উইন-উইন স্ট্র্যাটেজি পাওয়ার পর বাজেট বাড়িয়ে বিজনেসকে গ্লোবাল লেভেলে স্কেল করা।' }
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 18 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    return (
        <section
            id="about"
            className="relative min-h-screen bg-[#060d1a] text-white px-6 md:px-16 py-32 overflow-hidden select-none"
            style={{
                backgroundImage: 'radial-gradient(circle at 50% 20%, #0d203d 0%, #060d1a 80%)',
                fontFamily: "'Inter', sans-serif"
            }}
        >
            {/* 🌌 ব্যাকগ্রাউন্ড নিয়ন গ্লো এফেক্ট */}
            <motion.div
                animate={{ x: [0, 30, -30, 0], y: [0, -40, 40, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none"
            />
            <motion.div
                animate={{ x: [0, -40, 30, 0], y: [0, 30, -30, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[10%] right-[-5%] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none"
            />

            {/* ডট গ্রিড ওভারলে */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`
            }} ></div>

            {/* ⬅️ 1. হোম পেজে যাওয়ার ব্যাক বাটন */}
            <div className="absolute top-8 left-6 md:left-16 z-50">
                <button 
                    onClick={() => window.location.href = '/'} // 👈 যদি React Router ব্যবহার করেন তবে এখানে useNavigate() ব্যবহার করতে পারেন
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 text-gray-400 hover:text-white transition-all duration-300 backdrop-blur-xl group shadow-lg"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium tracking-wide">Back to Home</span>
                </button>
            </div>

            <div className="container mx-auto space-y-32 relative z-10">

                {/* ================= SECTION 1: PROFILE AND HEADER GRID ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* ⬅️ বাম কলাম: প্রোফাইল পিকচার এবং অ্যানালিটিক্স প্যানেল */}
                    <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-24">
                        <motion.div
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{ x, y }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="flex justify-center lg:justify-start"
                        >
                            <div className="relative w-72 h-72 md:w-85 md:h-85 rounded-[3rem] group border border-white/[0.06] p-3 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 via-teal-400 to-blue-500 rounded-[2.7rem] opacity-20 blur-lg group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 pointer-events-none" />

                                <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative z-10 border border-white/10 bg-[#060d1a]">
                                    <img
                                        src={myProfilePic}
                                        alt="Saptak Chatterjee"
                                        className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 border-4 border-[#060d1a] z-20 shadow-[0_0_20px_#10b981]" />
                            </div>
                        </motion.div>

                        {/* 📊 SKILLS BARS */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-6 w-full max-w-md">
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400/90 pl-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981]" /> Expertise & Skills
                            </h4>

                            <div className="space-y-4">
                                {expertises.map((skill, index) => (
                                    <div key={index} className="group space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400 group-hover:text-white transition-colors duration-300 font-medium tracking-wide">
                                                {skill.title}
                                            </span>
                                            <span className="text-[12px] text-emerald-400/80 font-mono tracking-wider tabular-nums">
                                                {skill.level}
                                            </span>
                                        </div>
                                        <div className="w-full h-[4px] bg-white/[0.03] rounded-full overflow-hidden relative border border-white/[0.02]">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: skill.level }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                                                className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-[0_0_8px_currentColor]`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ➡️ ডান কলাম: পরিচিতি */}
                    <div className="lg:col-span-7 space-y-16">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
                            <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-xl">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981] animate-pulse" />
                                <span className="text-[12px] font-bold uppercase tracking-widest text-emerald-400">The Growth Architect</span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.05]">
                                Soptok <br />
                                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">Chatterjee</span>
                            </h2>

                            <div className="space-y-5 text-gray-400 text-base md:text-lg leading-relaxed font-light max-w-2xl">
                                <p>
                                    ২০১৬ সালে ডিজিটাল marketing-এর অসীম সম্ভাবনার দুনিয়ায় আমার পথচলা শুরু। কঠোর পরিশ্রম আর ডেটা-ড্রিভেন স্ট্র্যাটেজি ব্যবহার করে গ্লোবাল প্ল্যাটফর্ম ফাইভার (Fiverr)-এ <span className="text-white font-semibold underline decoration-emerald-400 decoration-2 underline-offset-4">#1 ডিজিটাল মার্কেটার</span> হিসেবে ১০০০+ আন্তর্জাতিক ক্লায়েন্টের সাথে সফলভাবে কাজ করেছি।
                                </p>
                                <p>
                                    বর্তমানে আমি <span className="text-emerald-400 font-semibold">Drive to Traffic</span>-এর ফাউন্ডার ও সিইও হিসেবে বিজনেসের আসল রেভিনিউ নিশ্চিত করতে প্রিমিয়াম মার্কেটিং সার্ভিস ও ট্রেইনিং প্রদান করছি। আমি একজন গর্বিত <span className="text-white font-medium">NSDA Certified (Level 3, 4, 5, 6)</span> এক্সপার্ট।
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ================= 📈 2-COLUMN TIMELINE SECTION (Compact/Chot Kora Hoiche) ================= */}
                <div className="space-y-8 w-full max-w-4xl mx-auto pt-6">
                    <div className="text-center space-y-1">
                        <h4 className="text-xs font-bold uppercase tracking-[0.40em] text-blue-400/80 flex items-center justify-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Journey Milestones
                        </h4>
                        <h3 className="text-xl md:text-3xl font-black tracking-tight text-white">The Path of Growth</h3>
                    </div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer} 
                        className="relative w-full overflow-visible"
                    >
                        <div className="absolute left-4 lg:left-1/2 top-2 bottom-2 w-[1px] -translate-x-1/2 bg-gradient-to-b from-emerald-500 via-blue-500 to-transparent opacity-20" />

                        {journeySteps.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            
                            return (
                                <div 
                                    key={idx} 
                                    className={`relative flex flex-col lg:flex-row items-start lg:items-center w-full mb-8 pl-10 lg:pl-0 ${
                                        isEven ? 'lg:justify-end lg:pr-[10%]' : 'lg:justify-start lg:pl-[10%]'
                                    }`}
                                >
                                    <div className="absolute left-4 lg:left-1/2 top-3 lg:top-1/2 w-3.5 h-3.5 rounded-full bg-[#060d1a] border-2 border-emerald-500 z-10 -translate-x-1/2 lg:-translate-y-1/2 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                                    
                                    <motion.div 
                                        variants={{
                                            hidden: { opacity: 0, x: isEven ? 80 : -80 },
                                            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                        }}
                                        whileHover={{ y: -3, backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(16, 185, 129, 0.25)' }}
                                        className="w-full lg:w-[42%] p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] backdrop-blur-3xl transition-all duration-300 shadow-xl group"
                                    >
                                        <div className="mb-1">
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 tabular-nums">
                                                {step.year}
                                            </span>
                                        </div>

                                        <h3 className="text-xs md:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-400 text-xs font-light mt-1 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* ================= SECTION 2: BENTO GRID + DYNAMIC COUNTERS ================= */}
                <div className="space-y-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center space-y-2">
                        <h3 className="text-2xl md:text-4xl font-black tracking-tight text-white">Let's Talk Numbers</h3>
                        <p className="text-gray-500 text-xs md:text-sm font-light">The measurable impacts generated throughout the career.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                            whileHover={{ y: -8, borderColor: 'rgba(16, 185, 129, 0.25)', boxShadow: '0 20px 40px -15px rgba(16, 185, 129, 0.15)' }}
                            className="bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] p-8 rounded-3xl backdrop-blur-2xl shadow-xl flex flex-col justify-between h-48 transition-all duration-500 md:col-span-2 group"
                        >
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Global Scale</span>
                            <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                                <AnimatedCounter value="1000+" />
                            </h3>
                            <p className="text-gray-400 text-xs md:text-sm font-light">International & corporate clients served across top marketplaces.</p>
                        </motion.div>

                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                            whileHover={{ y: -8, borderColor: 'rgba(59, 130, 246, 0.25)', boxShadow: '0 20px 40px -15px rgba(59, 130, 246, 0.15)' }}
                            className="bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] p-8 rounded-3xl backdrop-blur-2xl shadow-xl flex flex-col justify-between h-48 transition-all duration-500"
                        >
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Industry Longevity</span>
                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                                <AnimatedCounter value="2016" duration={1.5} />
                            </h3>
                            <p className="text-gray-400 text-xs font-light">The year the marketing blueprint started crafting.</p>
                        </motion.div>

                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                            whileHover={{ y: -8, borderColor: 'rgba(20, 184, 166, 0.25)', boxShadow: '0 20px 40px -15px rgba(20, 184, 166, 0.15)' }}
                            className="bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] p-8 rounded-3xl backdrop-blur-2xl shadow-xl flex flex-col justify-between h-48 transition-all duration-500"
                        >
                            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Ecosystem Impact</span>
                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                                <AnimatedCounter value="1000+" />
                            </h3>
                            <p className="text-gray-400 text-xs font-light">Trained & mentored students building modern careers.</p>
                        </motion.div>

                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                            whileHover={{ y: -8, borderColor: 'rgba(16, 185, 129, 0.25)', boxShadow: '0 20px 40px -15px rgba(16, 185, 129, 0.15)' }}
                            className="bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] p-8 rounded-3xl backdrop-blur-2xl shadow-xl flex flex-col justify-between h-48 transition-all duration-500 md:col-span-2 group"
                        >
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">National Benchmarks</span>
                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Level 3-6</h3>
                            <p className="text-gray-400 text-xs font-light">Officially NSDA Certified Trainer and Expert with maximum professional authority.</p>
                        </motion.div>
                    </div>
                </div>

                {/* ================= SECTION 3: STRATEGIC FRAMEWORK ================= */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="space-y-16"
                >
                    <motion.div variants={fadeInUp} className="text-center space-y-2">
                        <h3 className="text-2xl md:text-4xl font-black tracking-tight text-white">The Growth Architecture</h3>
                        <p className="text-gray-500 text-xs md:text-sm font-light">A scientific, rigorous, non-speculative data infrastructure framework.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-white/10 z-0" />

                        {frameworks.map((item, idx) => (
                            <motion.div
                                key={idx} variants={fadeInUp}
                                whileHover={{ y: -12, backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(16, 185, 129, 0.3)', boxShadow: '0 20px 40px -15px rgba(16, 185, 129, 0.12)' }}
                                className="bg-white/[0.01] border border-white/[0.03] p-6 rounded-2xl transition-all duration-300 group relative overflow-hidden shadow-2xl z-10 flex flex-col h-full backdrop-blur-xl"
                            >
                                <span className="absolute -bottom-4 -right-2 text-7xl font-black text-white/[0.01] group-hover:text-emerald-500/5 transition-all duration-300">
                                    {item.step}
                                </span>

                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center font-bold text-xs text-emerald-400 mb-6 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-black group-hover:shadow-[0_0_15px_#10b981]"
                                >
                                    {item.step}
                                </motion.div>

                                <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors duration-200">
                                    {item.title}
                                </h4>
                                <p className="text-gray-400 text-xs mt-2 font-light leading-relaxed flex-grow">
                                    {item.desc}
                                </p>
                                <div className="w-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400 absolute bottom-0 left-0 group-hover:w-full transition-all duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutMe;