import axios from 'axios';

// আপনার Django ব্যাকএন্ডের বেস URL (লোকালহোস্ট)
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// সবগুলো API এন্ডপয়েন্ট ফাংশন
export const fetchServices = () => api.get('/services/');
export const fetchCourses = () => api.get('/courses/');
export const fetchBlogs = () => api.get('/blogs/');
export const fetchTestimonials = () => api.get('/testimonials/');
export const submitConsultation = (formData) => api.post('/consultation/submit/', formData);

export default API_BASE_URL; // ইমেজ দেখানোর জন্য বেস ইউআরএল কাজে লাগবে