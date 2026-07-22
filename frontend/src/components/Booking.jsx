import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedService = searchParams.get('service') || "General Consultation";

  // 📝 ইনপুট ফিল্ডের স্টেট
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // 👈 লোডিং স্টেট যুক্ত করা হলো

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // রিকোয়েস্ট শুরু হওয়ার সাথে সাথে লোডিং ট্রু হবে
    
    const bookingData = { 
      ...formData, 
      service: selectedService 
    };

    try {
      // 🚀 আপনার Django ব্যাকএন্ডের বুকিং এপিআই ইউআরএল (এখানে আপনার সঠিক পোর্ট ও রাউট দেওয়া হয়েছে)
      const response = await fetch('http://127.0.0.1:8000/api/booking/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      // জ্যাঙ্গো ব্যাকএন্ড থেকে আসা success রেসপন্স চেক করা হচ্ছে
      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
       const errorDetails = typeof result.error === 'object' ? JSON.stringify(result.error) : (result.error || result.message || "Unknown error");
  alert(`Booking failed: ${errorDetails}`);}
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Could not connect to the server.");
    } finally {
      setLoading(false); // কাজ শেষে লোডিং ফলস হবে
    }
  };

  return (
    <div className="min-h-screen bg-[#475569] font-sans antialiased text-slate-200 py-12 px-4 flex items-center justify-center selection:bg-indigo-500/30">
      <div className="max-w-2xl w-full bg-[#334155]/90 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-slate-500/40 shadow-2xl relative overflow-hidden">
        
        <div className="flex items-center justify-between border-b border-slate-600/40 pb-5 mb-6">
          <Link to={-1} className="text-xs font-bold text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1.5 group">
            <span>←</span> Back
          </Link>
          <span className="text-[10px] font-black bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full uppercase tracking-wider">
            Secure Slot
          </span>
        </div>

        {submitted ? (
          <div className="text-center py-12 space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center text-2xl mx-auto shadow-inner">✓</div>
            <h2 className="text-2xl font-black text-white">Booking Requested!</h2>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="text-indigo-300 font-bold">{formData.name}</span>. I will review your requirements for <span className="text-white font-semibold">"{selectedService}"</span> and reach out to you on WhatsApp or Email shortly.
            </p>
            <div className="pt-4">
              <Link to="/" className="inline-block bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all">Go Back Home</Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Book Your Appointment</h2>
              <p className="text-xs md:text-sm text-slate-300 mt-1">Fill out the details below to lock this service into my pipeline.</p>
            </div>

            <div className="bg-[#1E293B]/60 border border-indigo-500/35 rounded-2xl p-4 flex items-center gap-3.5 shadow-inner">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-sm">⚡</div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Selected Service Package</p>
                <h4 className="text-sm font-black text-white mt-0.5">{selectedService}</h4>
              </div>
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
                    className="w-full bg-[#1E293B]/50 border border-slate-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:bg-[#1E293B] transition-all"
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
                    className="w-full bg-[#1E293B]/50 border border-slate-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:bg-[#1E293B] transition-all"
                  />
                </div>
              </div>

              {/* হোয়াটসঅ্যাপ নাম্বার */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 pl-1">WhatsApp Number</label>
                <input 
                  type="tel" 
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+880 1XXX XXXXXX" 
                  className="w-full bg-[#1E293B]/50 border border-slate-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:bg-[#1E293B] transition-all"
                />
              </div>

              {/* সার্ভিস ডেসক্রিপশন */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 pl-1">Service Description / Project Brief</label>
                <textarea 
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your requirements, current project status, or goals in detail..." 
                  className="w-full bg-[#1E293B]/50 border border-slate-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:bg-[#1E293B] transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-3">
                <button 
                  type="submit" 
                  disabled={loading} // লোডিং অবস্থায় বাটন ডিজেবল থাকবে
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-black py-4 rounded-xl shadow-lg shadow-indigo-950/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing... 🚀" : "Confirm Booking Request 🚀"}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;