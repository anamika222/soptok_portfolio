import React, { useState } from 'react';
import { submitConsultation } from '../api';

const Consultation = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', business_or_topic: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: 'info', msg: 'জমা হচ্ছে...' });
    submitConsultation(formData)
      .then(() => {
        setStatus({ type: 'success', msg: 'অনুরোধটি সফল হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।' });
        setFormData({ name: '', email: '', phone: '', business_or_topic: '', message: '' });
      })
      .catch(() => setStatus({ type: 'error', msg: 'কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।' }));
  };

  return (
    <section id="consultation" className="py-16 bg-gray-900 text-white">
      <div className="max-w-lg mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Book a Free Consultation</h2>
        <p className="text-center text-gray-400 mb-8 text-sm">Saptak-এর সাথে সরাসরি আপনার ক্যারিয়ার বা বিজনেস গ্রোথ নিয়ে আলোচনা করুন।</p>
        
        {status.msg && (
          <div className={`p-3 mb-4 rounded text-center text-sm ${status.type === 'success' ? 'bg-green-600' : status.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
          <input type="text" placeholder="Your Name" required className="w-full p-3 rounded-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="email" placeholder="Email Address" required className="w-full p-3 rounded-lg" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <input type="text" placeholder="Phone Number" required className="w-full p-3 rounded-lg" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          <input type="text" placeholder="Topic (e.g., SEO Service / Full Stack Course)" className="w-full p-3 rounded-lg" value={formData.business_or_topic} onChange={e => setFormData({...formData, business_or_topic: e.target.value})} />
          <textarea placeholder="Tell us about your needs..." rows="4" required className="w-full p-3 rounded-lg" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition shadow-md">Submit Request</button>
        </form>
      </div>
    </section>
  );
};

export default Consultation;