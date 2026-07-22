import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag, Share2, Bookmark, Sparkles, MessageSquare, Send, CornerDownRight, User } from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // 💬 কমেন্ট ও রিপ্লাই স্টেটস
  const [comments, setComments] = useState([]);
  const [mainComment, setMainComment] = useState({ name: '', email: '', content: '' });
  const [replyData, setReplyData] = useState({ name: '', email: '', content: '' });
  const [activeReplyBox, setActiveReplyBox] = useState(null); // কোন কমেন্টে রিপ্লাই ওপেন তা ট্র্যাক করবে
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    setLoading(true);
    axios.get(`http://127.0.0.1:8000/api/blogs/${slug}/`)
      .then(response => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blog details:", error);
        setLoading(false);
      });

    // 📥 কমেন্ট লিস্ট আলাদাভাবে ফেচ করা (Django View সেটআপ অনুযায়ী)
    axios.get(`http://127.0.0.1:8000/api/blogs/${slug}/comments/`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => console.error("Error fetching comments:", error));
  }, [slug]);

  // ✍️ মেইন কমেন্ট ইনপুট হ্যান্ডলার
  const handleMainCommentChange = (e) => {
    setMainComment({ ...mainComment, [e.target.name]: e.target.value });
  };

  // ✍️ রিপ্লাই ইনপুট হ্যান্ডলার
  const handleReplyChange = (e) => {
    setReplyData({ ...replyData, [e.target.name]: e.target.value });
  };

  // 🚀 কমেন্ট বা রিপ্লাই সাবমিট লজিক
  const handleSubmitComment = (e, parentId = null) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = parentId 
      ? { ...replyData, parent: parentId }
      : mainComment;

    axios.post(`http://127.0.0.1:8000/api/blogs/${slug}/comments/`, payload)
      .then(() => {
        setSubmitting(false);
        setMainComment({ name: '', email: '', content: '' });
        setReplyData({ name: '', email: '', content: '' });
        setActiveReplyBox(null);
        
        // প্রিমিয়াম সাকসেস মেসেজ টোস্ট
        setSuccessMessage('🎉 মন্তব্য পাঠানো হয়েছে! অ্যাডমিন অ্যাপ্রুভ করলে এটি প্রকাশ পাবে।');
        setTimeout(() => setSuccessMessage(''), 5000);
      })
      .catch(error => {
        console.error("Error submitting comment:", error);
        setSubmitting(false);
      });
  };

  // 🎬 অ্যানিমেশন ভ্যারিয়েন্টস
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const typewriterContainer = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.02, delayChildren: 0.6 } }
  };

  const typewriterLetter = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.1, ease: "linear" } }
  };

  const contentContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.8 } }
  };

  // 🔁 রিকার্সিভ রিপ্লাই কম্পোনেন্ট (কমেন্টের নিচে সুন্দর করে শাখা তৈরি করবে)
  const RenderReplies = ({ replies, parentName }) => {
    if (!replies || replies.length === 0) return null;

    return (
      <div className="mt-4 pl-4 md:pl-8 border-l border-cyan-500/10 space-y-4 relative">
        {replies.map((reply) => (
          <motion.div 
            key={reply.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 relative group"
          >
            <div className="absolute -left-[17px] top-6 text-cyan-500/20"><CornerDownRight size={14} /></div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center text-[9px] text-fuchsia-400 font-black uppercase">
                  {reply.name[0]}
                </div>
                <h5 className="text-xs font-bold text-white">{reply.name}</h5>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-500">To: {parentName}</span>
              </div>
              <span className="text-[9px] text-slate-500 font-medium">
                {new Date(reply.created_at).toLocaleDateString('bn-BD')}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 font-light pl-7 whitespace-pre-wrap">{reply.content}</p>

            {/* রিপ্লাইয়ের ভেতরে আবার রিপ্লাই দেওয়ার বাটন */}
            <div className="pl-7 mt-2">
              <button 
                onClick={() => setActiveReplyBox(activeReplyBox === reply.id ? null : reply.id)}
                className="text-[10px] font-bold text-cyan-400/60 hover:text-cyan-400 transition-colors"
              >
                Reply
              </button>
            </div>

            {/* ইনলাইন নেস্টেড রিপ্লাই বক্স */}
            <AnimatePresence>
              {activeReplyBox === reply.id && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-3 pl-7">
                  {renderReplyForm(reply.id)}
                </motion.div>
              )}
            </AnimatePresence>

            {/* যদি আরও গভীর লেভেলে কোনো রিপ্লাই থাকে */}
            <RenderReplies replies={reply.replies} parentName={reply.name} />
          </motion.div>
        ))}
      </div>
    );
  };

  // 📝 ডাইনামিক রিপ্লাই ফর্ম জেনারেটর
  const renderReplyForm = (parentId) => (
    <form onSubmit={(e) => handleSubmitComment(e, parentId)} className="space-y-3 p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input 
          type="text" name="name" placeholder="আপনার নাম" required value={replyData.name} onChange={handleReplyChange}
          className="bg-slate-900/60 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-400/30 transition-colors"
        />
        <input 
          type="email" name="email" placeholder="আপনার ইমেইল" required value={replyData.email} onChange={handleReplyChange}
          className="bg-slate-900/60 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-400/30 transition-colors"
        />
      </div>
      <div className="relative">
        <textarea 
          name="content" rows="2" placeholder="রিপ্লাই লিখুন..." required value={replyData.content} onChange={handleReplyChange}
          className="w-full bg-slate-900/60 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-400/30 transition-colors resize-none pr-10"
        />
        <button type="submit" disabled={submitting} className="absolute right-2 bottom-3 p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 disabled:opacity-40 transition-all">
          <Send size={12} />
        </button>
      </div>
    </form>
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#0b0f1a]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-b-2 border-fuchsia-500 animate-spin" style={{ animationDirection: 'reverse' }}></div>
      </div>
    </div>
  );

  if (!blog) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b0f1a] text-white p-4">
      <h2 className="text-xl md:text-2xl font-black mb-4 text-center">আর্টিকেলটি খুঁজে পাওয়া যায়নি! 🔍</h2>
      <Link to="/" className="text-cyan-400 flex items-center gap-2 hover:text-cyan-300 font-bold text-sm bg-cyan-500/5 px-4 py-2 rounded-full border border-cyan-400/20">
        <ArrowLeft size={16} /> Back To Home
      </Link>
    </div>
  );

  return (
    <div key={location.key} className="min-h-screen bg-[#0b0f1a] text-slate-200 pb-24 font-sans selection:bg-cyan-500/20 overflow-x-hidden">
      
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-fuchsia-500 origin-[0%] z-50" style={{ scaleX }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-cyan-500/5 via-fuchsia-500/0 to-transparent blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-12 relative z-10">
        
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cyan-400 transition-colors mb-10 group bg-slate-900/40 border border-white/5 px-4 py-2 rounded-full backdrop-blur-md">
          <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" /> Back To Home
        </Link>

        {/* 🏷️ ১. মেটা ট্যাগগুলো */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-4 text-[10px] md:text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">
          <motion.span variants={itemVariants} className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full"><Tag size={12} /> {blog.category}</motion.span>
          <motion.span variants={itemVariants} className="flex items-center gap-1.5"><Calendar size={12} /> {blog.created_at_formatted}</motion.span>
          <motion.span variants={itemVariants} className="flex items-center gap-1.5"><Clock size={12} /> {blog.read_time} Mins Read</motion.span>
        </motion.div>

        {/* 📝 ২. মেইন টাইটেল */}
        <motion.h1 variants={titleVariants} initial="hidden" animate="visible" className="text-3xl md:text-5xl font-black text-white mb-8 leading-[1.2] tracking-tight bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
          {blog.title}
        </motion.h1>

        {/* 🖼️ ৩. ব্যানার ইমেজ */}
        {blog.image && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="w-full h-[240px] sm:h-[360px] md:h-[480px] rounded-[2.5rem] overflow-hidden bg-slate-950 border border-white/10 mb-12 shadow-2xl shadow-cyan-950/20 group relative">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
          </motion.div>
        )}

        {/* 📄 ৪. মেইন গ্রিড লেআউট */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* ⬅️ বাঁদিকের কন্টেন্ট এরিয়া */}
          <div className="lg:col-span-8 text-slate-300 text-base md:text-lg leading-relaxed space-y-6 font-light">
            
            {blog.excerpt && (
              <motion.div variants={typewriterContainer} initial="hidden" animate="visible" className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-transparent border-l-4 border-cyan-400 text-slate-300 font-normal italic text-sm md:text-base mb-6 shadow-inner select-none">
                {Array.from(blog.excerpt).map((letter, index) => (
                  <motion.span key={index} variants={typewriterLetter} className="inline-block">{letter === " " ? "\u00A0" : letter}</motion.span>
                ))}
              </motion.div>
            )}

            <motion.div variants={contentContainerVariants} initial="hidden" animate="visible" className="blog-rich-text text-slate-300 space-y-6">
              {blog.content && blog.content.split(/\n+/).map((paragraph, idx) => {
                if (!paragraph.trim()) return null;
                const isEven = idx % 2 === 0;
                return (
                  <motion.p key={idx} initial={{ opacity: 0, x: isEven ? -80 : 80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, type: "spring", stiffness: 50, damping: 14 }} className="text-slate-300 font-light text-base md:text-lg leading-relaxed mb-4">
                    {paragraph}
                  </motion.p>
                );
              })}
            </motion.div>

            {/* 💬 ৫. প্রিমিয়াম কমেন্ট ও রিপ্লাই সেকশন */}
            <hr className="border-white/5 my-12" />
            
            <div className="space-y-8 mt-12">
              <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-2 tracking-tight">
                <MessageSquare className="text-cyan-400" size={22} /> আলোচনা ও মতামত ({comments.length})
              </h3>

              {/* 📬 গ্লোবাল মেসেজ টোস্ট */}
              <AnimatePresence>
                {successMessage && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-semibold">
                    {successMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 📥 মূল কমেন্ট ফর্ম (Premium Glassmorphism) */}
              <form onSubmit={(e) => handleSubmitComment(e, null)} className="space-y-4 p-6 rounded-3xl bg-slate-900/20 border border-white/5 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-transparent blur-xl pointer-events-none" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" name="name" placeholder="আপনার নাম" required value={mainComment.name} onChange={handleMainCommentChange}
                    className="bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400/40 transition-all focus:shadow-[0_0_15px_rgba(34,211,238,0.05)]"
                  />
                  <input 
                    type="email" name="email" placeholder="আপনার ইমেইল" required value={mainComment.email} onChange={handleMainCommentChange}
                    className="bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400/40 transition-all focus:shadow-[0_0_15px_rgba(34,211,238,0.05)]"
                  />
                </div>
                <textarea 
                  name="content" rows="4" placeholder="আপনার চিন্তাভাবনা শেয়ার করুন..." required value={mainComment.content} onChange={handleMainCommentChange}
                  className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400/40 transition-all focus:shadow-[0_0_15px_rgba(34,211,238,0.05)] resize-none"
                />
                
                <button 
                  type="submit" disabled={submitting}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 bg-[length:200%_auto] hover:bg-right text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-950/30 disabled:opacity-40"
                >
                  {submitting ? 'পোস্ট হচ্ছে...' : 'মন্তব্য প্রকাশ করুন'} <Send size={13} />
                </button>
              </form>

              {/* 📜 মূল কমেন্ট লিস্ট */}
              <div className="space-y-6 mt-8">
                {comments.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">এখনো কোনো মন্তব্য করা হয়নি। প্রথম যৌক্তিক মন্তব্যটি আপনার হোক!</p>
                ) : (
                  comments.map((comment) => (
                    <motion.div 
                      key={comment.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-3xl bg-slate-900/30 border border-white/5 space-y-3 shadow-sm hover:border-white/10 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-400/20 flex items-center justify-center text-xs text-cyan-400 uppercase font-black">
                            {comment.name[0]}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{comment.name}</h4>
                            <p className="text-[9px] text-slate-500 font-medium">Verified Visitor</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-semibold">
                          {new Date(comment.created_at).toLocaleDateString('bn-BD')}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-300 font-light pl-10 whitespace-pre-wrap leading-relaxed">{comment.content}</p>
                      
                      {/* রিপ্লাই ট্রিগার বাটন */}
                      <div className="pl-10 pt-1">
                        <button 
                          onClick={() => setActiveReplyBox(activeReplyBox === comment.id ? null : comment.id)}
                          className="text-xs font-bold text-cyan-400/80 hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                        >
                          Reply
                        </button>
                      </div>

                      {/* ইনলাইন রিপ্লাই বক্স */}
                      <AnimatePresence>
                        {activeReplyBox === comment.id && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3 pl-10 overflow-hidden">
                            {renderReplyForm(comment.id)}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* 🔄 নেস্টেড রিপ্লাই রেন্ডারার */}
                      <RenderReplies replies={comment.replies} parentName={comment.name} />
                    </motion.div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* ➡️ ডানদিকের স্টিকি প্যানেল */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }} className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500 flex items-center justify-center font-bold text-white shadow-md">S</div>
                <div>
                  <h4 className="text-xs font-black text-white flex items-center gap-1">Saptak <Sparkles size={12} className="text-cyan-400" /></h4>
                  <p className="text-[10px] text-slate-500 font-medium">Author & Instructor</p>
                </div>
              </div>
              <hr className="border-white/5 my-4" />
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <button className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors py-1 px-2 rounded-lg hover:bg-white/5"><Share2 size={14} /> Share</button>
                <button className="flex items-center gap-1.5 hover:text-fuchsia-400 transition-colors py-1 px-2 rounded-lg hover:bg-white/5"><Bookmark size={14} /> Save</button>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default BlogDetail;