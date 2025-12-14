import React from 'react';
import Hero from '../components/Hero';
import SolutionsAndAgents from '../components/Benefits';
import TestimonialsAndContact from '../components/FAQ';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <SolutionsAndAgents />
      <TestimonialsAndContact />
    </>
  );
};

export default HomePage;
