
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animationRef.current) return;
    
    // Animation would be initialized here in a real app
    // For this demo, we're using CSS animations
  }, []);

  return (
    <section className="relative min-h-screen pt-20 flex items-center overflow-hidden pattern-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-senay-blue-100/40 to-senay-teal-100/40 z-0" />
      
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        <div className="flex flex-col justify-center">
          <div 
            className="flex items-center text-sm font-medium text-senay-blue-600 mb-4 px-4 py-1.5 rounded-full bg-senay-blue-100 w-fit"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="bg-senay-blue-500 w-2 h-2 rounded-full mr-2"></span>
            Launching Soon in Ethiopia
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Empowering <span className="gradient-text">Health Access</span> in Ethiopia
          </h1>
          
          <p 
            className="text-gray-700 text-lg md:text-xl max-w-lg mb-8"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Search for drugs, explore traditional medicine, find hospitals, and get AI-powered health info — all in your language, online or offline.
          </p>
          
          <div 
            className="flex flex-wrap gap-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Button className="bg-senay-blue-500 hover:bg-senay-blue-600 text-white px-8 py-6">
              Get Started
            </Button>
            
            <Button variant="outline" className="border-senay-blue-500 text-senay-blue-600 hover:bg-senay-blue-50 px-8 py-6">
              Try the Demo
            </Button>
          </div>
          
          <div 
            className="flex items-center mt-10 text-sm text-gray-500"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <span className="flex items-center">
              <span className="bg-green-500 w-2 h-2 rounded-full mr-2"></span>
              Available in 3 languages
            </span>
            <span className="mx-4">•</span>
            <span className="flex items-center">
              <span className="bg-blue-500 w-2 h-2 rounded-full mr-2"></span>
              Works offline
            </span>
          </div>
        </div>
        
        <div className="relative flex justify-center items-center">
          <div className="absolute -z-10 w-[500px] h-[500px] bg-gradient-to-r from-senay-blue-500/20 to-senay-teal-500/20 rounded-full blur-3xl animate-pulse-gentle" />
          
          <div ref={animationRef} className="w-full max-w-md">
            {/* Medical illustration - animated with CSS */}
            <div className="relative">
              {/* Main phone device frame */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-20 relative animate-float">
                <div className="bg-senay-blue-500 rounded-2xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-white">
                      <div className="text-xs opacity-80">Good morning</div>
                      <div className="font-semibold">Makeda</div>
                    </div>
                    <div className="bg-white w-8 h-8 rounded-full"></div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 mb-2">
                    <div className="flex items-center">
                      <div className="bg-senay-blue-100 p-2 rounded-md">
                        <div className="w-5 h-5 bg-senay-blue-500 rounded-sm"></div>
                      </div>
                      <div className="ml-3">
                        <div className="text-xs text-gray-500">Next Reminder</div>
                        <div className="text-sm font-medium">Amoxicillin - 2 capsules</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm">Find Medication</div>
                    <div className="text-xs text-senay-blue-500">See all</div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-3 mb-2">
                    <div className="w-full h-4 bg-white rounded-md"></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-senay-blue-50 rounded-md p-2 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-senay-blue-100 mb-1"></div>
                      <div className="w-12 h-2 bg-gray-300 rounded"></div>
                    </div>
                    <div className="bg-senay-teal-50 rounded-md p-2 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-senay-teal-100 mb-1"></div>
                      <div className="w-12 h-2 bg-gray-300 rounded"></div>
                    </div>
                    <div className="bg-blue-50 rounded-md p-2 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 mb-1"></div>
                      <div className="w-12 h-2 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm">Nearby Hospitals</div>
                    <div className="text-xs text-senay-blue-500">Map View</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="bg-senay-blue-100 p-1.5 rounded-md">
                        <div className="w-4 h-4 bg-senay-blue-500 rounded-sm"></div>
                      </div>
                      <div className="ml-2">
                        <div className="text-xs font-medium">Tikur Anbessa Hospital</div>
                        <div className="text-xs text-gray-400">2.4 km away</div>
                      </div>
                    </div>
                    
                    <div className="h-10 bg-gray-200 rounded-md w-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -right-10 top-20 bg-white p-3 rounded-2xl shadow-lg animate-float" style={{animationDelay: '1s'}}>
                <div className="w-32">
                  <div className="w-full h-3 bg-senay-teal-200 rounded mb-2"></div>
                  <div className="w-20 h-3 bg-senay-teal-100 rounded"></div>
                </div>
              </div>
              
              <div className="absolute -left-8 bottom-40 bg-white p-3 rounded-2xl shadow-lg animate-float" style={{animationDelay: '0.5s'}}>
                <div className="w-10 h-10 rounded-full bg-senay-blue-100"></div>
              </div>
              
              <div className="absolute -right-6 bottom-20 bg-white p-2 rounded-2xl shadow-lg animate-float" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-senay-teal-100 mr-2"></div>
                  <div>
                    <div className="w-16 h-2 bg-gray-200 rounded mb-1"></div>
                    <div className="w-10 h-2 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
