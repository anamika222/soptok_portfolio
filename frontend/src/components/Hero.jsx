import React, { useState, useEffect } from 'react';
// ইমেজটি সরাসরি ইমপোর্ট করা হলো যাতে Vite পাথটি নিখুঁতভাবে পায়
import qrImage from '../assets/soptokchatterjee.png'; 

const Hero = () => {
  // টাইপরাইটার ইফেক্ট লজিক
  const words = [
    "Digital Growth Marketer.",
    "SEO & Media Buying Strategist.",
    "Founder & CEO, Drive to Traffic."
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // ডায়নামিক কাউন্টার স্টেট
  const [yearsCount, setYearsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [brandsCount, setBrandsCount] = useState(0);

  // টাইপরাইটার ইফেক্ট
  useEffect(() => {
    const handleType = () => {
      const fullWord = words[currentWordIndex];
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText === fullWord) {
          setTypingSpeed(2000);
          setIsDeleting(true);
        } else {
          setTypingSpeed(80);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(500);
        } else {
          setTypingSpeed(40);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  // প্রফেশনাল কাউন্ট-আপ অ্যানিমেশন
  useEffect(() => {
    const duration = 2500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setYearsCount(Math.floor(easeProgress * 8));
      setStudentsCount(Math.floor(easeProgress * 1000));
      setBrandsCount(Math.floor(easeProgress * 200));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ইন-লাইন কাস্টম মোশন ইনজেকশন */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes counterSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.85); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-counter {
          animation: counterSlideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <section 
        id="home" 
        className="relative min-h-[75vh] flex items-center bg-[#0f2a54] text-white px-6 md:px-16 py-12 overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle at 15% 25%, #14356a 0%, #0f2a54 85%)',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* প্লাস-গ্রিড ব্যাকগ্রাউন্ড */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 0h2v40h-2zM0 19h40v2H0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}></div>

        {/* অ্যাম্বিয়েন্ট সফট গলো লাইট */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#10b981]/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* বাম পাশ: কন্টেন্ট সেকশন */}
          <div className="space-y-5 max-w-xl text-left animate-fade-in-up">
            
            {/* মডার্ন ব্যাজ */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Validated Growth Expert</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
              Grow Your Skills <br />
              and Business with <br />
              <span className="bg-gradient-to-r from-[#10b981] to-emerald-400 bg-clip-text text-transparent drop-shadow-sm">
                Soptok Chatterjee
              </span>
            </h1>

            {/* টাইপরাইটার */}
            <div className="space-y-1 border-l-2 border-[#10b981] pl-3">
              <p className="text-[30px] font-bold tracking-wider text-blue-300 uppercase">I AM A</p>
              <p className="text-base md:text-xl font-bold text-[#10b981] min-h-[28px]">
                {currentText}<span className="animate-pulse ml-0.5">|</span>
              </p>
              <p className="text-xs md:text-lg text-gray-200 font-medium">
                Results-Driven Digital Marketing Expert & Business Growth Specialist
              </p>
            </div>

            <p className="text-gray-200 text-xs md:text-lg leading-relaxed font-light">
              With <span className="text-[#10b981] font-semibold">8+ years of experience</span> in SEO, Paid Advertising, and Lead Generation, I've helped hundreds of businesses scale online. Trained <span className="text-[#10b981] font-semibold">1000+ students</span> who are now thriving in the digital economy.
            </p>

            {/* স্ট্যাটস কাউন্টার সেকশন */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 overflow-hidden">
              <div className="hover:translate-y-[-2px] transition-transform duration-300 animate-counter">
                <p className="text-3xl md:text-4xl font-black text-[#10b981] tracking-tight drop-shadow-[0_2px_10px_rgba(16,185,129,0.15)]">
                  {yearsCount}+
                </p>
                <p className="text-[10px] md:text-[11px] tracking-wider text-gray-200 uppercase font-bold mt-1">Years Exp.</p>
              </div>
              
              <div className="hover:translate-y-[-2px] transition-transform duration-300 animate-counter [animation-delay:150ms]">
                <p className="text-3xl md:text-4xl font-black text-[#10b981] tracking-tight drop-shadow-[0_2px_10px_rgba(16,185,129,0.15)]">
                  {studentsCount >= 1000 ? `${(studentsCount / 1000).toFixed(0)}K+` : `${studentsCount}+`}
                </p>
                <p className="text-[10px] md:text-[11px] tracking-wider text-gray-400 uppercase font-bold mt-1">Students</p>
              </div>
              
              <div className="hover:translate-y-[-2px] transition-transform duration-300 animate-counter [animation-delay:300ms]">
                <p className="text-3xl md:text-4xl font-black text-[#10b981] tracking-tight drop-shadow-[0_2px_10px_rgba(16,185,129,0.15)]">
                  {brandsCount}+
                </p>
                <p className="text-[10px] md:text-[11px] tracking-wider text-gray-400 uppercase font-bold mt-1">Brands</p>
              </div>
            </div>

            {/* বাটনসমূহ */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-[#10b981] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300 animate-pulse"></div>
                <button 
                  onClick={() => handleScroll('consultation')}
                  className="relative bg-[#10b981] hover:bg-[#0f9f6e] text-white font-bold text-xs md:text-sm px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  Start Free Consultation <span>→</span>
                </button>
              </div>
              
              <button 
                onClick={() => handleScroll('courses')}
                className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 text-white font-semibold text-xs md:text-sm px-6 py-3 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-md"
              >
                Explore Courses
              </button>
            </div>
          </div>

          {/* ডান পাশ: প্রোফাইল ইমেজ এবং তার নিচে কাস্টম গোল্ডেন উইজেট */}
          <div className="relative flex flex-col justify-center items-center lg:items-end gap-5 animate-fade-in-up [animation-delay:200ms] z-20">
            
            {/* প্রোফাইল ইমেজ কন্টেইনার কার্ড */}
            <div className="relative p-1.5 rounded-3xl bg-gradient-to-br from-[#10b981]/40 via-transparent to-blue-500/20 shadow-[0_0_40px_rgba(16,185,129,0.2)] group">
              <div className="absolute inset-0 bg-[#10b981]/20 rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse"></div>
              
              {/* মেইন ইমেজ বক্স (overflow-hidden) */}
              <div className="w-[340px] sm:w-[380px] md:w-[420px] aspect-[4/5] rounded-2xl bg-[#091b37] relative shadow-2xl overflow-hidden border border-white/10">
                <img 
                  src="/profile.jpg" 
                  alt="Saptak Chatterjee" 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700 filter contrast-[102%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a54]/90 via-transparent to-transparent"></div>
                
                {/* 🔄 ভেরিফাইড গ্লাস ব্যাজ (ফিরিয়ে আনা হলো) */}
                <div className="absolute bottom-5 left-5 right-5 bg-[#0f2a54]/80 border border-white/10 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md transition-all duration-300 group-hover:border-[#10b981]/30">
                  <div className="bg-[#10b981]/10 border border-[#10b981]/30 p-2 rounded-lg text-lg shadow-[0_0_10px_rgba(16,185,129,0.2)]">🏆</div>
                  <div>
                    <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest leading-none">Certified Expert</p>
                    <p className="text-xs font-black tracking-tight text-white mt-1">Google & Meta Partner</p>
                  </div>
                </div>
              </div>

              {/* 🛠️ ফিক্সড ও ক্লিকেবল উইজেট */}
              <a 
                href="https://your-link-here.com" // 👈 এখানে আপনার কাঙ্খিত লিংকটি বসিয়ে দিন
                target="_blank"
                rel="noopener noreferrer"
                id="qrBtn" 
                className="absolute -bottom-5 -left-6 sm:-left-8 animate-bounce duration-[3000ms] z-50 pointer-events-auto block"
              >
                <div className="group relative cursor-pointer">
                    <div className="bg-black/85 backdrop-blur-xl border border-[#d4af37]/50 p-3 rounded-2xl flex items-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.4)] group-hover:border-[#d4af37] transition-all duration-500">
                        
                        {/* কিউআর কোড ইমেজ কন্টেইনার */}
                        <div className="w-12 h-12 bg-white p-1 rounded-lg overflow-hidden flex-shrink-0 select-none">
                            <img 
                              src={qrImage} 
                              alt="QR" 
                              className="w-full h-full object-contain pointer-events-none"
                            />
                        </div>
                        
                        {/* টেক্সট সেকশন */}
                        <div className="pr-2 text-left select-none">
                            <p className="text-[9px] text-[#d4af37] font-bold uppercase tracking-widest mb-1">Connect Fast</p>
                            <p className="text-[8px] text-gray-300 font-medium leading-tight">Scan for <br />Contact Info</p>
                        </div>
                    </div>

                    {/* গোল্ডেন নোটিফিকেশন পালস ডট */}
                    <div className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d4af37]"></span>
                    </div>
                </div>
              </a>

            </div>

          </div>

        </div>
      </section>

      {/* ব্র্যান্ড লোগো স্ট্রিপ */}
      <div className="bg-[#0b1f3f] border-t border-white/[0.06] py-6 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-[11px] font-bold text-gray-300 tracking-widest uppercase text-center md:text-left">
            Trusted by Elite Brands Globally <span className="hidden md:inline mx-3 text-gray-500">|</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[10px] md:text-xs font-black text-white/90 tracking-widest uppercase">
            <span className="bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded hover:bg-white/[0.08] transition cursor-default">GOOGLE ADS</span>
            <span className="bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded hover:bg-white/[0.08] transition cursor-default">META BUSINESS</span>
            <span className="bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded hover:bg-white/[0.08] transition cursor-default">SHOPIFY PLUS</span>
            <span className="bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded hover:bg-white/[0.08] transition cursor-default">SEM RUSH</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;