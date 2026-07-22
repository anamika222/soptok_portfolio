import React, { useEffect, useState } from 'react';
import { fetchTestimonials } from '../api';

const Certificate = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials()
      .then(res => { setTestimonials(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-10">টেস্টিমোনিয়াল লোড হচ্ছে...</div>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Success Stories & Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${item.testimonial_type === 'certificate' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                    {item.testimonial_type === 'certificate' ? 'Student' : 'Client'}
                  </span>
                  <div className="text-yellow-400 text-sm">{'★'.repeat(item.rating)}</div>
                </div>
                <p className="text-gray-600 italic text-sm mb-4">"{item.comment}"</p>
              </div>
              <div className="mt-4 border-t pt-4 flex items-center gap-3">
                {item.document_image && (
                  <img src={item.document_image} alt="Certificate" className="w-12 h-12 rounded object-cover border" />
                )}
                <div>
                  <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificate;