import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Clock, Layers, DollarSign, User, Award, 
  CheckCircle, HelpCircle, Briefcase, Sparkles, ArrowLeft,
  GraduationCap, Laptop, Building, TrendingUp, MousePointer,
  Video, Globe, FileBadge, Users, Search, Share2, Megaphone, Mail, FileEdit, BookmarkCheck, Info, X, CreditCard, ArrowRight
} from 'lucide-react';

// 🛠️ ডায়নামিক Lucide আইকন সিলেক্টর
const getIcon = (iconName) => {
  switch (iconName) {
    case 'graduation-cap': return <GraduationCap size={16} className="text-indigo-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'laptop': return <Laptop size={16} className="text-cyan-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'briefcase': return <Briefcase size={16} className="text-slate-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'building': return <Building size={16} className="text-amber-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'trending-up': return <TrendingUp size={16} className="text-emerald-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'mouse-pointer': return <MousePointer size={16} className="text-indigo-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'video': return <Video size={16} className="text-amber-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'globe': return <Globe size={16} className="text-cyan-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'file-badge': return <FileBadge size={16} className="text-emerald-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'users': return <Users size={16} className="text-indigo-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'search': return <Search size={16} className="text-teal-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'share-2': return <Share2 size={16} className="text-blue-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'megaphone': return <Megaphone size={16} className="text-rose-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'mail': return <Mail size={16} className="text-orange-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'file-edit': return <FileEdit size={16} className="text-violet-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'award': return <Award size={16} className="text-amber-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    case 'bookmark-check': return <BookmarkCheck size={16} className="text-emerald-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;
    default: return <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5 group-hover:rotate-12 transition-transform duration-300" />;
  }
};

// 🎬 ১. মেইন কন্টেন্ট লেফট-সাইড অ্যানিমেশন
const leftSyllabusContainerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 15,
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// 🎬 ২. প্রতিটি মডিউল কার্ডের অ্যানিমেশন
const moduleCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

// 🎬 ৩. রাইট সাইডবার অ্যানিমেশন
const rightSidebarVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 15, delay: 0.2 }
  }
};

// 🎬 ৪. সাইডবারের ভেতরের গ্রিড আইটেম অ্যানিমেশন
const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 14 }
  }
};

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('benefits');
  const [openModule, setOpenModule] = useState(null);
  const [hoveredDetail, setHoveredDetail] = useState(null);

  // 🛍️ Checkout Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1 = Information Form, 2 = Payment Selection
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/courses/${id}/`)
      .then(response => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching course details:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setHoveredDetail(null);
  }, [activeSubTab]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setCheckoutStep(2); // তথ্য সাবমিট হলে পেমেন্ট গেটওয়ে দেখাবে
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCheckoutStep(1); // মোডাল বন্ধ করলে স্টেট রিসেট হবে
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#0b0f1a]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-400"></div>
    </div>
  );

  if (!course) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b0f1a] text-white">
      <h2 className="text-2xl font-bold">Course Not Found!</h2>
      <Link to="/" className="mt-4 text-cyan-400 flex items-center gap-2">
        <ArrowLeft size={16}/> Back to Home
      </Link>
    </div>
  );

  const syllabus = Array.isArray(course.what_you_will_learn) ? course.what_you_will_learn : [];
  const whoCanJoin = course.who_can_join?.who_can_join || (Array.isArray(course.who_can_join) ? course.who_can_join : []);
  const benefits = course.course_benefits?.course_benefits || (Array.isArray(course.course_benefits) ? course.course_benefits : []);
  const careerOpportunities = course.career_opportunities?.career_opportunities || (Array.isArray(course.career_opportunities) ? course.career_opportunities : []);
  const whyChooseUs = course.why_choose_me?.why_choose_us || course.why_choose_us?.why_choose_us || (Array.isArray(course.why_choose_me) ? course.why_choose_me : (Array.isArray(course.why_choose_us) ? course.why_choose_us : []));

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-100 py-12 px-4 md:px-8 overflow-x-hidden relative">
      <div className="max-w-7xl mx-auto relative">
        
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 text-sm font-semibold transition-colors">
          <ArrowLeft size={16}/> Back to Home
        </Link>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 flex flex-col justify-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 uppercase tracking-widest mb-4 w-max">
              <Sparkles size={12}/> Masterclass Course
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">{course.name}</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
                <Clock className="text-cyan-400" size={20} />
                <div>
                  <p className="text-xs text-slate-400">Duration</p>
                  <p className="text-sm font-bold text-white">{course.duration}</p>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
                <Layers className="text-indigo-400" size={20} />
                <div>
                  <p className="text-xs text-slate-400">Version</p>
                  <p className="text-sm font-bold text-white">{course.version}</p>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl flex items-center gap-3 col-span-2 md:col-span-1">
                <DollarSign className="text-emerald-400" size={20} />
                <div>
                  <p className="text-xs text-slate-400">Course Fee</p>
                  <p className="text-sm font-black text-emerald-400">৳{course.price ? parseFloat(course.price).toLocaleString() : '0'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR WITH ENROLL BUTTON */}
          <div className="w-full">
            <div className="bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-5 shadow-2xl relative overflow-hidden group">
              <div className="relative w-full h-52 rounded-[1.8rem] overflow-hidden bg-slate-950 mb-6">
                {course.image ? (
                  <img src={course.image} alt={course.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">No Preview Available</div>
                )}
              </div>
              
              {/* 🎯 UPDATE: ENROLL BUTTON WITH STEPPER POPUP API */}
              <div className="relative">
                {/* পালসিং আভা */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none" />
                
                <motion.button 
                  whileHover={{ scale: 1.025, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsModalOpen(true)}
                  className="w-full relative py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-black rounded-2xl uppercase tracking-wider text-sm shadow-xl flex items-center justify-center gap-2 overflow-hidden border border-white/10 group/btn transition-all duration-300"
                >
                  {/* হোভার গ্লেয়ার এফেক্ট */}
                  <span className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:animate-shine pointer-events-none" />
                  <Sparkles size={16} className="text-cyan-200" />
                  <span>Enroll In This Course</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* TABS HEADER */}
        <div className="mb-12 border-b border-white/10 flex gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'syllabus', label: 'What You Will Learn & Curriculum' },
            { id: 'instructor', label: 'Instructor Profile' }
          ].map((tab) => (
            <button
              key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-6 font-bold text-sm uppercase tracking-wider border-b-2 transition-all shrink-0 relative ${
                activeTab === tab.id ? 'text-cyan-400 bg-cyan-500/5 border-cyan-400' : 'border-transparent text-slate-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="w-full">
          {activeTab === 'overview' && (
            <div className="bg-slate-900/30 border border-white/5 p-8 rounded-[2rem] max-w-4xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="text-cyan-400" size={22}/> Course Overview
              </h3>
              <p className="text-slate-300 font-light leading-relaxed whitespace-pre-line text-sm">{course.course_overview}</p>
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Syllabus Section */}
              <motion.div initial="hidden" animate="visible" variants={leftSyllabusContainerVariants} className="lg:col-span-2 bg-slate-900/30 border border-white/5 p-6 md:p-8 rounded-[2rem]">
                <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2.5">
                  <BookOpen className="text-cyan-400" size={26}/> Curriculum / Syllabus
                </h3>
                {syllabus.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                    {syllabus.map((module, idx) => {
                      const isOpen = openModule === idx;
                      const subTopics = module.sub_topics || module.topics || [];
                      
                      return (
                        <motion.div key={module.id || idx} variants={moduleCardVariants} className={`bg-slate-900/40 border transition-all duration-300 rounded-2xl overflow-hidden h-max ${isOpen ? 'border-cyan-500/50 bg-slate-900/70 shadow-xl md:col-span-2' : 'border-white/5 hover:border-white/10 hover:bg-slate-900/50'}`}>
                          <button onClick={() => setOpenModule(isOpen ? null : idx)} className="w-full flex items-center justify-between p-6 text-left font-bold transition-colors group">
                            <div className="flex flex-col gap-1.5 pr-2">
                              <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">Module {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                              <h4 className="text-base md:text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-snug">{module.topic || module.category}</h4>
                            </div>
                            <div className="shrink-0 bg-slate-950 p-2.5 rounded-xl border border-white/5 text-slate-400 group-hover:text-cyan-400 transition-colors">
                              <motion.svg animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                              </motion.svg>
                            </div>
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
                                <div className="px-6 pb-6 pt-3 border-t border-white/5 bg-slate-950/30">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {subTopics.map((sub, i) => (
                                      <div key={i} title={sub} className="flex items-center gap-3 bg-slate-950/60 border border-white/5 px-4 py-3.5 rounded-xl hover:bg-slate-950/90 hover:border-cyan-500/20 transition-all min-h-[52px] cursor-help">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/60 shrink-0" />
                                        <span className="text-sm text-slate-200 font-medium leading-relaxed break-words">{sub}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : <p className="text-base text-slate-400">No curriculum modules found.</p>}
              </motion.div>

              {/* SIDE SUB-TABS */}
              <motion.div initial="hidden" animate="visible" variants={rightSidebarVariants} className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2 bg-slate-900/40 border border-white/5 p-4 rounded-2xl">
                  {[
                    { id: 'benefits', label: 'Course Benefits', icon: <Sparkles size={16} className="text-amber-400" /> },
                    { id: 'audience', label: 'Who Can Join?', icon: <HelpCircle size={16} className="text-indigo-400" /> },
                    { id: 'career', label: 'Career Opportunities', icon: <Briefcase size={16} className="text-cyan-400" /> },
                    { id: 'whyMe', label: 'Why Choose Us?', icon: <Sparkles size={16} className="text-emerald-400" /> }
                  ].map((subTab) => (
                    <button key={subTab.id} onClick={() => setActiveSubTab(subTab.id)} className={`flex items-center gap-3 py-3 px-4 rounded-xl font-extrabold text-sm uppercase border transition-all w-full text-left relative overflow-hidden ${activeSubTab === subTab.id ? 'bg-gradient-to-r from-indigo-600/30 to-cyan-500/30 border-cyan-400 text-white shadow-sm' : 'bg-slate-950/40 border-white/5 text-slate-400 hover:text-slate-200'}`}>
                      {subTab.icon} {subTab.label}
                      {activeSubTab === subTab.id && <motion.div layoutId="activeSubTabGlow" className="absolute inset-0 bg-cyan-400/5 mix-blend-screen pointer-events-none" />}
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900/30 border border-white/5 p-6 rounded-[2rem] min-h-[180px] flex flex-col justify-between gap-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {activeSubTab === 'benefits' && (
                      <motion.div key="benefits" initial="hidden" animate="visible" exit="hidden" variants={listContainerVariants} className="space-y-3">
                        <h4 className="font-bold text-white text-sm flex items-center gap-2 pb-2 border-b border-white/5"><Sparkles className="text-amber-400" size={16}/> Course Benefits</h4>
                        {benefits.length > 0 ? (
                          <motion.ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {benefits.map((benefit, i) => (
                              <motion.li key={benefit.id || i} variants={listItemVariants} whileHover={{ scale: 1.03, borderColor: 'rgba(34,211,238,0.4)', backgroundColor: 'rgba(15,23,42,0.8)' }} onMouseEnter={() => setHoveredDetail({ title: "Benefit Detail", desc: benefit.title })} className="group flex items-center gap-2.5 text-xs text-slate-200 font-semibold bg-slate-950/50 p-3 rounded-xl border border-white/5 cursor-pointer transition-all duration-200">
                                {getIcon(benefit.icon_name)}
                                <span className="truncate group-hover:text-cyan-400 transition-colors">{benefit.title}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        ) : <p className="text-xs text-slate-500">No benefits listed</p>}
                      </motion.div>
                    )}

                    {activeSubTab === 'audience' && (
                      <motion.div key="audience" initial="hidden" animate="visible" exit="hidden" variants={listContainerVariants} className="space-y-3">
                        <h4 className="font-bold text-white text-sm flex items-center gap-2 pb-2 border-b border-white/5"><HelpCircle className="text-indigo-400" size={16}/> Who Can Join?</h4>
                        {whoCanJoin.length > 0 ? (
                          <motion.ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {whoCanJoin.map((audience, i) => (
                              <motion.li key={audience.id || i} variants={listItemVariants} whileHover={{ scale: 1.03, borderColor: 'rgba(99,102,241,0.4)', backgroundColor: 'rgba(15,23,42,0.8)' }} onMouseEnter={() => setHoveredDetail({ title: "Audience Target", desc: audience.title })} className="group flex items-center gap-2.5 text-xs text-slate-200 font-semibold bg-slate-950/50 p-3 rounded-xl border border-white/5 cursor-pointer transition-all duration-200">
                                {getIcon(audience.icon_name)}
                                <span className="truncate group-hover:text-indigo-400 transition-colors">{audience.title}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        ) : <p className="text-xs text-slate-500">No criteria listed</p>}
                      </motion.div>
                    )}

                    {activeSubTab === 'career' && (
                      <motion.div key="career" initial="hidden" animate="visible" exit="hidden" variants={listContainerVariants} className="space-y-3">
                        <h4 className="font-bold text-white text-sm flex items-center gap-2 pb-2 border-b border-white/5"><Briefcase className="text-cyan-400" size={16}/> Career Opportunities</h4>
                        {careerOpportunities.length > 0 ? (
                          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {careerOpportunities.map((job, i) => (
                              <motion.div key={job.id || i} variants={listItemVariants} whileHover={{ scale: 1.03, borderColor: 'rgba(34,211,238,0.4)', backgroundColor: 'rgba(15,23,42,0.8)' }} onMouseEnter={() => setHoveredDetail({ title: "Career Scope", desc: job.title })} className="group flex items-center gap-2.5 bg-slate-950/50 border border-white/5 px-3 py-3 rounded-xl text-xs text-slate-200 font-bold cursor-pointer transition-all duration-200">
                                {getIcon(job.icon_name)}
                                <span className="truncate group-hover:text-cyan-400 transition-colors">{job.title}</span>
                              </motion.div>
                            ))}
                          </motion.div>
                        ) : <p className="text-xs text-slate-500">No opportunities listed</p>}
                      </motion.div>
                    )}

                    {activeSubTab === 'whyMe' && (
                      <motion.div key="whyMe" initial="hidden" animate="visible" exit="hidden" variants={listContainerVariants} className="space-y-3">
                        <h4 className="font-bold text-white text-sm flex items-center gap-2 pb-2 border-b border-white/5"><Sparkles className="text-emerald-400" size={16}/> Why Choose Us?</h4>
                        {whyChooseUs.length > 0 ? (
                          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {whyChooseUs.map((reason, i) => (
                              <motion.div key={reason.id || i} variants={listItemVariants} whileHover={{ scale: 1.03, borderColor: 'rgba(16,185,129,0.4)', backgroundColor: 'rgba(15,23,42,0.8)' }} onMouseEnter={() => setHoveredDetail({ title: reason.title, desc: reason.description })} className="group border-l-2 border-indigo-500 bg-slate-950/40 p-2.5 rounded-r-xl border-y border-r border-white/5 cursor-pointer transition-all duration-200">
                                <h5 className="text-xs font-bold text-white flex items-center gap-1.5 truncate group-hover:text-emerald-400 transition-colors">{getIcon(reason.icon || reason.icon_name)} {reason.title}</h5>
                              </motion.div>
                            ))}
                          </motion.div>
                        ) : <p className="text-xs text-slate-500">No reasons listed</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ডিটেইলস প্যানেল */}
                  <div className="mt-2 pt-4 border-t border-white/5 min-h-[85px] relative">
                    <AnimatePresence mode="wait">
                      {hoveredDetail ? (
                        <motion.div key={hoveredDetail.desc} initial={{ opacity: 0, y: 10, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="bg-gradient-to-r from-slate-950 to-slate-900/90 border border-cyan-500/20 p-3.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                          <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1 flex items-center gap-1.5"><Info size={12} className="animate-pulse"/> {hoveredDetail.title}</div>
                          <p className="text-xs text-slate-200 leading-relaxed font-medium">{hoveredDetail.desc}</p>
                        </motion.div>
                      ) : (
                        <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center text-center bg-slate-950/10 border border-dashed border-white/5 rounded-xl text-[11px] text-slate-500 font-semibold tracking-wide">
                          ✨ যেকোনো অপশনের ওপর মাউস নিন, জাদুকরী ডিটেইলস এখানে দেখা যাবে।
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'instructor' && (
            <div className="bg-slate-900/30 border border-white/5 p-8 rounded-[2rem] flex flex-col md:flex-row gap-6 items-start max-w-4xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center text-white shrink-0"><User size={32} /></div>
              <div>
                <h3 className="text-xl font-bold text-white">{course.instructor_name}</h3>
                <p className="text-sm text-cyan-400 font-medium mb-2">{course.designation}</p>
                <span className="inline-flex items-center gap-1 text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md font-semibold mb-4 border border-amber-400/20"><Award size={12}/> {course.certification}</span>
                <p className="text-sm text-slate-300 font-light leading-relaxed whitespace-pre-line">{course.instructor_bio}</p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* 🎯 STEPPER MODAL SYSTEM (INFO -> PAYMENT METHOD) */}
        {/* ========================================================= */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* ম্লান ব্যাকগ্রাউন্ড ওভারলে */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              />

              {/* মেইন ডায়ালগ উইন্ডো */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-[#0d1324] border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative z-10 p-6 md:p-8 text-left"
              >
                {/* ক্লোজ বাটন */}
                <button onClick={closeModal} className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 bg-slate-900 border border-white/5 rounded-xl transition-colors">
                  <X size={18} />
                </button>

                {/* প্রোগ্রেসবার / স্টেপার ইন্ডিকেটর */}
                <div className="flex items-center gap-3 mb-8">
                  <div className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${checkoutStep === 1 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                    {checkoutStep > 1 ? '✓ Done' : '01. Your Info'}
                  </div>
                  <div className="h-[2px] w-8 bg-white/10" />
                  <div className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${checkoutStep === 2 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-slate-900 text-slate-500 border border-white/5'}`}>
                    02. Payment
                  </div>
                </div>

                {/* কন্টেন্ট ট্রানজিশন অ্যানিমেশন */}
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: ইউজার ইনফরমেশন ফর্ম */}
                  {checkoutStep === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}>
                      <h3 className="text-xl font-black text-white mb-2">এনরোলমেন্ট ইনফরমেশন</h3>
                      <p className="text-xs text-slate-400 mb-6">কোর্সে জয়েন করার জন্য নিচের সঠিক তথ্যগুলো প্রদান করুন।</p>
                      
                      <form onSubmit={handleInfoSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-400 mb-2 tracking-wide">আপনার সম্পূর্ণ নাম</label>
                          <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" className="w-full bg-slate-950 border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white font-medium outline-none transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-400 mb-2 tracking-wide">ইমেইল অ্যাড্রেস</label>
                          <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@gmail.com" className="w-full bg-slate-950 border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white font-medium outline-none transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-400 mb-2 tracking-wide">মোবাইল নম্বর</label>
                          <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="017XXXXXXXX" className="w-full bg-slate-950 border border-white/5 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white font-medium outline-none transition-colors" />
                        </div>

                        <button type="submit" className="w-full !mt-6 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all">
                          <span>পেমেন্ট ধাপে এগিয়ে যান</span>
                          <ArrowRight size={14}/>
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* STEP 2: পেমেন্ট মেথড গেটওয়ে */}
                  {checkoutStep === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                      <h3 className="text-xl font-black text-white mb-1">পেমেন্ট মেথড সিলেক্ট করুন</h3>
                      <div className="mb-4 text-xs font-bold text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                        <span>মোট প্রদেয় টাকা:</span>
                        <span className="text-sm font-black text-emerald-400">৳{course.price ? parseFloat(course.price).toLocaleString() : '0'}</span>
                      </div>

                      {/* গেটওয়ে লিস্ট গ্রিড */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {[
                          { id: 'bkash', name: 'bKash', desc: 'Instant Pay', color: 'hover:border-pink-500/40 bg-pink-500/5' },
                          { id: 'nagad', name: 'Nagad', desc: 'Instant Pay', color: 'hover:border-orange-500/40 bg-orange-500/5' },
                          { id: 'rocket', name: 'Rocket', desc: 'Mobile Banking', color: 'hover:border-purple-500/40 bg-purple-500/5' },
                          { id: 'cards', name: 'Visa/MasterCard', desc: 'Credit/Debit Card', color: 'hover:border-cyan-500/40 bg-cyan-500/5' }
                        ].map((method) => (
                          <motion.div 
                            key={method.id}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className={`border border-white/5 rounded-2xl p-4 cursor-pointer text-center transition-all flex flex-col items-center justify-center gap-1 group ${method.color}`}
                          >
                            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center text-white font-black text-xs group-hover:border-white/20">
                              {method.id === 'cards' ? <CreditCard size={18} className="text-cyan-400"/> : method.name[0]}
                            </div>
                            <h4 className="text-sm font-black text-white mt-2">{method.name}</h4>
                            <p className="text-[10px] text-slate-500 font-medium">{method.desc}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* ব্যাক বাটন */}
                      <button onClick={() => setCheckoutStep(1)} className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors mx-auto">
                        <ArrowLeft size={14}/> পূর্ববর্তী তথ্যে ফিরে যান
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>

      {/* 🛠️ বাটন অ্যানিমেশনের সিএসএস */}
      <style>{`
        @keyframes shine {
          100% { left: 125%; }
        }
        .group\\/btn:hover .group-hover\\/btn\\:animate-shine {
          animation: shine 0.85s ease-in-out;
          position: absolute;
          left: -50%;
        }
      `}</style>
    </div>
  );
};

export default CourseDetails;