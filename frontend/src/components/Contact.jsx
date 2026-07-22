import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contact Form Submitted:", formData);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#475569] font-sans antialiased text-slate-200 py-12 px-4 flex items-center justify-center selection:bg-indigo-500/30">

            <div className="max-w-2xl w-full bg-[#334155]/90 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-slate-500/40 shadow-2xl relative overflow-hidden">
                {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>

                {/* 🧭 টপ মিনিমাল হেডার */}
                <div className="flex items-center justify-between border-b border-slate-600/40 pb-5 mb-6">
                    <Link to={-1} className="text-xs font-bold text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1.5 group">
                        <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back
                    </Link>
                    <span className="text-[10px] font-black bg-purple-500/20 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full uppercase tracking-wider">
                        Let's Talk
                    </span>
                </div>

                {/* 🎉 মেসেজ পাঠানো সফল হলে */}
                {submitted ? (
                    <div className="text-center py-12 space-y-4 animate-fade-in">
                        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center text-2xl mx-auto shadow-inner">
                            ✉️
                        </div>
                        <h2 className="text-2xl font-black text-white">Message Sent!</h2>
                        <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                            Hi <span className="text-purple-300 font-bold">{formData.name}</span>, your message has been sent successfully. I'll review your custom requirements and get back to you shortly!
                        </p>
                        <div className="pt-4">
                            <Link to="/" className="inline-block bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all">
                                Go Back Home
                            </Link>
                        </div>
                    </div>
                ) : (
                    // 📋 মেইন কন্টাক্ট ফর্ম
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Let's Build Something Great</h2>
                            <p className="text-xs md:text-sm text-slate-300 mt-1">Have a custom project or just want to say hi? Drop your thoughts below.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* নাম এবং ইমেল */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-300 pl-1">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full bg-[#1E293B]/50 border border-slate-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:bg-[#1E293B] transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-300 pl-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full bg-[#1E293B]/50 border border-slate-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:bg-[#1E293B] transition-all"
                                    />
                                </div>
                            </div>

                            {/* সাবজেক্ট */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-300 pl-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Custom Project Proposal, Consultation, etc."
                                    className="w-full bg-[#1E293B]/50 border border-slate-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:bg-[#1E293B] transition-all"
                                />
                            </div>

                            {/* বিস্তারিত মেসেজ */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-300 pl-1">Message / Project Details</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Describe your custom specifications, milestones, or timeline..."
                                    className="w-full bg-[#1E293B]/50 border border-slate-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:bg-[#1E293B] transition-all resize-none"
                                ></textarea>
                            </div>

                            {/* সাবমিট বাটন */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-sm font-black py-4 rounded-xl shadow-lg shadow-purple-950/40 transition-all transform hover:-translate-y-0.5"
                                >
                                    Send Message Now ✉️
                                </button>
                            </div>

                        </form>

                        {/* 🌐 অল্টারনেティブ সোশ্যাল মিডিয়া নেটওয়ার্ক জোন */}
                        <div className="border-t border-slate-600/40 pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
                            <span className="font-semibold">Or reach directly via:</span>
                            <div className="flex gap-4 font-bold text-slate-300">
                                <a href="mailto:your-email@example.com" className="hover:text-purple-400 transition-colors">📧 Email</a>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">🔗 LinkedIn</a>
                                {/* 🔽 গিটহাবের পরিবর্তে এখানে হোয়াটসঅ্যাপ যোগ করা হয়েছে */}
                                {/* 🔽 অফিশিয়াল হোয়াটসঅ্যাপ SVG লোগো সহ আপডেট করা লিঙ্ক */}
                                <a
                                    href="https://wa.me/8801XXXXXXXXX"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-[#25D366] transition-colors flex items-center gap-1.5 group"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-4 h-4 text-slate-400 group-hover:text-[#25D366] transition-colors"
                                    >
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 12.008 0c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 12.004-11.952 12.004-.145 0-.29-.001-.435-.005l-.005.001-6.134 1.611c-.114.03-.23.045-.345.045-.444 0-.84-.28-.975-.715zm6.363-4.063c.153.091.341.117.512.072l3.65-.959c.477.301.996.459 1.536.459 5.374 0 9.746-4.329 9.749-9.65.002-2.577-.996-5.001-2.812-6.818-1.815-1.816-4.234-2.816-6.812-2.817-5.378 0-9.751 4.332-9.755 9.653-.001 1.776.48 3.511 1.392 5.016.102.169.121.376.05.56l-.995 3.634 3.737-.981c.08-.022.163-.024.248-.008zm11.166-7.143c-.266-.134-1.577-.779-1.821-.865-.244-.086-.423-.13-.6.135-.178.265-.689.865-.844 1.039-.155.174-.311.196-.577.062-.266-.134-1.124-.414-2.141-1.321-.792-.706-1.327-1.578-1.482-1.846-.155-.267-.017-.412.117-.546.121-.121.266-.312.4-.467.133-.156.178-.267.266-.445.089-.178.045-.334-.022-.468-.067-.134-.6-1.446-.822-1.98-.216-.52-.435-.45-.6-.459-.155-.007-.333-.008-.511-.008-.178 0-.467.067-.711.334-.244.267-.933.913-.933 2.227 0 1.314.956 2.584 1.089 2.762.133.178 1.881 2.872 4.557 4.026.637.275 1.134.439 1.522.562.64.204 1.222.175 1.682.107.513-.076 1.577-.645 1.8-.1.222-.245.333-.6.333-.712zm0 0" />
                                    </svg>
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default Contact;