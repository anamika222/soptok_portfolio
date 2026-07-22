import React from 'react';
import Hero from './Hero';
import Service from './Service';
import Course from './Course';
import Certificate from './Certificate';
import Blog from './BlogPage';
import Consultation from './Consultation';
import Header from './Header';

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <Hero />
      <Service />
      <Course />
      <Certificate />
      <Blog />
      <Consultation />
    </div>
  );
};

export default Home;