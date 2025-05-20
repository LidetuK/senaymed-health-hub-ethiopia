
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import WhySenayMed from '@/components/sections/WhySenayMed';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import Roadmap from '@/components/sections/Roadmap';
import CallToAction from '@/components/sections/CallToAction';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WhySenayMed />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Roadmap />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
