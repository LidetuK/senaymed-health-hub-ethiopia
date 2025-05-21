
import React from 'react';
import { Button } from '@/components/ui/button';
import HeroPillOrbit from '@/components/animations/HeroPillOrbit';

const Hero: React.FC = () => {
  return (
    <section className="min-h-[85vh] bg-gradient-to-br from-senay-blue-50 to-white flex items-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-bg opacity-30"></div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="block">Empowering Health</span>
              <span className="block gradient-text">Access in Ethiopia</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
              Search for drugs, explore traditional medicine, find hospitals, 
              and get AI-powered health info — all in your language, online or offline.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-gradient-to-r from-senay-blue-500 to-senay-teal-500 text-white">
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Try the Demo
              </Button>
            </div>
          </div>
          
          <div className="h-[400px] lg:h-[500px] relative">
            <HeroPillOrbit />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
