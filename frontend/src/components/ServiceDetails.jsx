import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ServiceDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔘 ট্যাব স্টেট
    const [activeTab, setActiveTab] = useState('included_services');

    // 🔽 ড্রপডাউন স্টেট (ডিফল্ট ১মটা ওপেন থাকবে)
    const [openAccordionIndex, setOpenAccordionIndex] = useState(0);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/services/${id}/`)
            .then(response => {
                setService(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching details:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-[#475569]">
            <div className="relative w-12 h-12">
                <div className="absolute w-full h-full rounded-full border-4 border-slate-600"></div>
                <div className="absolute w-full h-full rounded-full border-4 border-indigo-400 border-t-transparent animate-spin"></div>
            </div>
        </div>
    );

    if (!service) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#475569] px-4 text-center">
            <h2 className="text-2xl font-bold text-slate-100 mb-3">Service Not Found!</h2>
            <Link to="/" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition-all text-sm">
                Back to Home
            </Link>
        </div>
    );

    // 📝 ডেটা এক্সট্রাকশন
    const includedServicesData = service.included_services?.included_services || [];
    const whatWeDoData = service.what_we_do || [];
    const workingProcessData = service.working_process?.working_process || [];
    const whoIsThisForList = service.who_is_service_for?.who_is_this_for || [];
    const whyChooseUsList = service.why_choose_us?.why_choose_us || [];

    const tabMenu = [
        { id: 'included_services', label: '📦 Included Services' },
        { id: 'what_we_do', label: '🎯 Core Capabilities' },
        { id: 'working_process', label: '⚙️ Working Process' },
        { id: 'who_is_for', label: '👥 Who is this for' },
        { id: 'why_choose_me', label: '✨ Why choose us' }
    ];

    const toggleAccordion = (index) => {
        setOpenAccordionIndex(openAccordionIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#475569] font-sans antialiased text-slate-100 pb-20 selection:bg-indigo-500/30">

            {/* 🧭 টপ মিনিমালিস্ট নেভিগেশন বার */}
            <nav className="sticky top-0 z-50 bg-[#475569]/90 backdrop-blur-md border-b border-slate-500/40 py-4 shadow-sm">
                <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
                    <Link to="/" className="text-sm font-semibold text-slate-200 hover:text-indigo-300 transition-colors flex items-center gap-2 group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:inline-block text-[11px] font-bold bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 px-3 py-1 rounded-full uppercase tracking-widest">
                            {service.service_type || "Premium Strategy"}
                        </span>
                        <Link to={`/booking?service=${encodeURIComponent(service.name)}`}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </nav>

            {/* 🚀 প্রিমিয়াম হিরো সেকশন */}
            <header className="relative py-14 border-b border-slate-500/30 bg-[#64748B]/20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                        <div className="md:col-span-7 space-y-4">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                                {service.name}
                            </h1>
                            <div className="h-1 w-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                            <p className="text-base md:text-lg text-slate-200 leading-relaxed font-normal pt-2 whitespace-pre-line">
                                {service.service_overview || service.description}
                            </p>
                        </div>
                        <div className="md:col-span-5 max-w-md w-full mx-auto">
                            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-500/50 p-2 bg-[#64748B]/40 backdrop-blur-xs">
                                {service.image ? (
                                    <img src={service.image} alt={service.name} className="w-full h-auto max-h-[300px] object-cover rounded-2xl" />
                                ) : (
                                    <div className="w-full aspect-[4/3] flex items-center justify-center bg-slate-700 text-slate-400 text-sm rounded-2xl">No Image Provided</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 🗂️ মেইন কন্টেন্ট লেআউট */}
            <section className="py-12">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                        {/* 📑 বাম পাশের মেনু (এখানে অ্যানিমেশন যুক্ত করা হয়েছে) */}
                        <div className="lg:col-span-4 space-y-6 sticky top-24">
                            <div className="bg-[#334155]/90 backdrop-blur-md p-4 rounded-3xl border border-slate-500/40 shadow-xl space-y-1.5">
                                <p className="text-[11px] font-extrabold text-slate-300 uppercase tracking-widest px-3 mb-4">Service Navigation</p>
                                {tabMenu.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full text-left px-4 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-between group transform transition-all duration-300 ease-out active:scale-95 ${
                                            activeTab === tab.id
                                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 translate-x-2 scale-[1.02]'
                                                : 'text-slate-200 hover:bg-[#475569]/60 hover:text-white hover:translate-x-1'
                                        }`}
                                    >
                                        {/* টেক্সট স্লাইড এবং হালকা ফেড এফেক্ট */}
                                        <span className="transition-transform duration-300 group-hover:translate-x-1 flex items-center gap-2">
                                            {tab.label}
                                        </span>
                                        
                                        {/* অ্যারো (Arrow) সাইনটি ডান পাশ থেকে স্লাইড ও ফেড-ইন হয়ে আসবে */}
                                        <span className={`text-sm transition-all duration-300 transform ${
                                            activeTab === tab.id
                                                ? 'opacity-100 translate-x-0 scale-110'
                                                : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                                        }`}>
                                            →
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 📋 ডান পাশের মেইন কন্টেন্ট ডিসপ্লে বক্স */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="bg-[#334155]/80 backdrop-blur-md p-8 rounded-3xl border border-slate-500/40 shadow-xl min-h-[400px]">

                                {/* ১. Included Services */}
                                {activeTab === 'included_services' && (
                                    <div className="animate-fade-in space-y-6 transition-all duration-300">
                                        <h3 className="text-xl font-extrabold text-white tracking-tight">What's Included In This Package</h3>
                                        {includedServicesData.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {includedServicesData.map((item) => (
                                                    <div key={item.id} className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#475569]/40 border border-slate-600 hover:border-emerald-400/40 hover:bg-emerald-500/5 transition-all group">
                                                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all">✓</span>
                                                        <p className="text-slate-100 font-bold text-sm">{item.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-slate-300 text-sm italic">No features listed yet.</p>
                                        )}
                                    </div>
                                )}

                                {/* ২. What I Do */}
                                {activeTab === 'what_we_do' && (
                                    <div className="space-y-6 animate-fade-in transition-all duration-300">
                                        <h3 className="text-xl font-extrabold text-white tracking-tight">Core Capabilities & Expertise</h3>
                                        {whatWeDoData.length > 0 ? (
                                            <div className="space-y-3">
                                                {whatWeDoData.map((cat, index) => {
                                                    const isOpen = openAccordionIndex === index;
                                                    return (
                                                        <div key={index} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-indigo-400/40 bg-[#1E293B]/60' : 'border-slate-600 bg-[#1E293B]/20'}`}>
                                                            <button
                                                                onClick={() => toggleAccordion(index)}
                                                                className={`w-full flex items-center justify-between p-4.5 bg-[#1E293B]/40 border-b border-slate-700/40 font-black text-sm md:text-[15px] text-slate-200 text-left transition-colors ${isOpen ? 'bg-indigo-950/40 text-indigo-200' : 'hover:bg-[#475569]/30'}`}
                                                            >
                                                                <span className="flex items-center gap-3">
                                                                    <span className={`text-[10px] transition-colors ${isOpen ? 'text-indigo-400' : 'text-slate-500'}`}>◆</span>
                                                                    {cat.main_category}
                                                                </span>
                                                                <span className={`w-6 h-6 rounded-full bg-[#334155] border border-slate-600 text-slate-400 flex items-center justify-center font-mono text-[10px] transition-all duration-300 ${isOpen ? 'rotate-180 bg-indigo-500 text-white border-indigo-500' : ''}`}>
                                                                    <span>▼</span>
                                                                </span>
                                                            </button>

                                                            {isOpen && (
                                                                <div className="p-5 bg-[#1E293B]/10 space-y-4 animate-fade-in">
                                                                    {cat.sub_categories?.map((sub, idx) => (
                                                                        <div key={idx} className="bg-[#475569]/40 p-4.5 rounded-xl border border-slate-600 shadow-2xs">
                                                                            <h5 className="font-extrabold text-sm text-white mb-3 flex items-center gap-2">
                                                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                                                                                {sub.title}
                                                                            </h5>
                                                                            {sub.features && sub.features.length > 0 ? (
                                                                                <div className="flex flex-wrap gap-2 pl-3">
                                                                                    {sub.features.map((feat, k) => (
                                                                                        <span key={k} className="text-xs bg-[#1E293B]/60 text-slate-200 font-semibold px-3 py-1.5 rounded-xl border border-slate-600 transition-all hover:border-indigo-400/50 hover:text-indigo-300 shadow-3xs cursor-default">
                                                                                            {feat}
                                                                                        </span>
                                                                                    ))}
                                                                                </div>
                                                                            ) : (
                                                                                <p className="text-xs text-slate-500 italic pl-3">Standard execution pipeline</p>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <p className="text-slate-300 text-sm italic">No specifications added yet.</p>
                                        )}
                                    </div>
                                )}

                                {/* ৩. Working Process */}
                                {activeTab === 'working_process' && (
                                    <div className="animate-fade-in space-y-6 transition-all duration-300">
                                        <h3 className="text-xl font-extrabold text-white tracking-tight">Strategic Execution Framework</h3>
                                        {workingProcessData.length > 0 ? (
                                            <div className="relative border-l border-slate-500 ml-4 space-y-6">
                                                {workingProcessData.map((proc, index) => (
                                                    <div key={index} className="relative pl-8 group">
                                                        <span className="absolute -left-[13px] top-1 bg-[#334155] border border-slate-500 text-slate-200 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-xs group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 transition-all duration-300">
                                                            {proc.step || index + 1}
                                                        </span>
                                                        <div className="bg-[#475569]/40 p-5 rounded-2xl border border-slate-600">
                                                            <h4 className="font-black text-white text-sm mb-1">{proc.title}</h4>
                                                            <p className="text-slate-300 text-sm leading-relaxed">{proc.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-slate-300 text-sm italic">No steps mapped yet.</p>
                                        )}
                                    </div>
                                )}

                                {/* ৪. Who is the service for */}
                                {activeTab === 'who_is_for' && (
                                    <div className="animate-fade-in space-y-6 transition-all duration-300">
                                        <h3 className="text-xl font-extrabold text-white tracking-tight">Ideal Match For This Solution</h3>
                                        {whoIsThisForList.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                                {whoIsThisForList.map((target) => (
                                                    <div key={target.id} className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#475569]/40 border border-slate-600 hover:bg-indigo-500/5 transition-colors">
                                                        <span className="w-9 h-9 rounded-xl bg-[#334155] border border-slate-500 text-indigo-300 flex items-center justify-center font-bold text-base shrink-0">🎯</span>
                                                        <p className="text-slate-100 font-extrabold text-sm">{target.title}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-slate-300 text-sm italic">Target audience not defined yet.</p>
                                        )}
                                    </div>
                                )}

                                {/* ৫. Why choose us */}
                                {activeTab === 'why_choose_me' && (
                                    <div className="animate-fade-in space-y-6 transition-all duration-300">
                                        <h3 className="text-xl font-extrabold text-white tracking-tight">Why Partner With Us?</h3>
                                        {whyChooseUsList.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {whyChooseUsList.map((reason) => (
                                                    <div key={reason.id} className="p-5 rounded-2xl border border-dashed border-amber-400/40 bg-amber-500/5 flex flex-col justify-between hover:bg-amber-500/10 transition-colors">
                                                        <h4 className="font-black text-amber-300 text-sm mb-1.5 flex items-center gap-1.5">
                                                            <span className="text-amber-500">★</span> {reason.title}
                                                        </h4>
                                                        <p className="text-slate-300 text-xs leading-relaxed">{reason.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-slate-300 text-sm italic">Reasons not listed yet.</p>
                                        )}
                                    </div>
                                )}

                            </div>

                            {/* ✨ মডার্ন এবং প্রিমিয়াম স্প্লিট অ্যাকশন লেআউট (Booking & Contact Panel) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">

                                {/* 💬 কন্টেন্ট পার্ট - কন্টাক্ট বক্স */}
                                <div className="group relative bg-[#1E293B]/40 backdrop-blur-md border border-slate-600/50 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden shadow-xl hover:border-slate-500/80 transition-all duration-300">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-500/5 rounded-full blur-xl group-hover:bg-slate-500/10 transition-all"></div>
                                    <div className="space-y-3">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-700/60 border border-slate-600 text-slate-300 flex items-center justify-center font-bold shadow-inner text-base">
                                            💬
                                        </div>
                                        <div>
                                            <h4 className="text-base font-black text-white group-hover:text-indigo-300 transition-colors">Custom Requirements?</h4>
                                            <p className="text-xs text-slate-300 leading-relaxed mt-1">Let’s talk if you need something different from this package. I'm always open to custom projects.</p>
                                        </div>
                                    </div>
                                    <div className="pt-6">
                                        <Link
                                            to="/contact"
                                            className="inline-flex items-center justify-center gap-2 w-full bg-slate-700/60 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-extrabold py-3.5 px-5 rounded-2xl transition-all shadow-md group-hover:translate-x-0.5 transform"
                                        >
                                            <span>Contact Me Now</span>
                                            <span className="transition-transform group-hover:translate-x-1">→</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* 🚀 কন্টেন্ট পার্ট - প্রিমিয়াম বুকিং বক্স */}
                                <div className="group relative bg-gradient-to-br from-[#1E293B]/90 to-indigo-950/40 border border-indigo-500/30 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden shadow-xl hover:border-indigo-400/50 transition-all duration-300">
                                    <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>

                                    <div className="space-y-3">
                                        <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold shadow-inner text-base">
                                            ⚡
                                        </div>
                                        <div>
                                            <h4 className="text-base font-black text-white">Instant Service Booking</h4>
                                            <p className="text-xs text-slate-300 leading-relaxed mt-1">Want to skip the back-and-forth messages? Book this service package right now to lock in your spot in my schedule.</p>
                                        </div>
                                    </div>
                                    <div className="pt-6">
                                        <Link
                                            to={`/booking?service=${encodeURIComponent(service.name)}`}
                                            className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-black py-3.5 px-5 rounded-2xl transition-all shadow-lg shadow-indigo-950/50 transform group-hover:-translate-y-0.5"
                                        >
                                            <span>Book Now</span>
                                            <span>🚀</span>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </section >

        </div >
    );
};

export default ServiceDetails;