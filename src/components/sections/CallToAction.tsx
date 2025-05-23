import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import AuthDialog from '@/components/auth/AuthDialog';

const CallToAction: React.FC = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<"login" | "register">("login");
  
  const handleGetStarted = () => {
    setInitialTab("register");
    setAuthDialogOpen(true);
  };
  
  const handleLearnMore = () => {
    setInitialTab("login");
    setAuthDialogOpen(true);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-senay-blue-500 to-senay-teal-500 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">SenayMed Mobile App</h2>
            <p className="text-xl opacity-90 mb-8">
              Access drug & treatment information, identify pills, check interactions and set up personal medication records - all from your smartphone.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="/apple-store.png" alt="Download on the App Store" className="h-14 w-auto" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="/google-play.png" alt="Get it on Google Play" className="h-14 w-auto" />
              </a>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-96 h-[700px] rounded-[48px] bg-black p-4 shadow-2xl transform rotate-3">
                {/* Screen */}
                <div className="w-full h-full rounded-[36px] overflow-hidden bg-white flex items-center justify-center">
                  {/* App screenshot */}
                  <img 
                    src="/senaymobile.png" 
                    alt="SenayMed Mobile App" 
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
                {/* Notch */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-senay-teal-300 rounded-full opacity-20"></div>
              <div className="absolute -top-4 -right-8 w-16 h-16 bg-senay-blue-300 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
      
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
        initialTab={initialTab}
      />
    </section>
  );
};

export default CallToAction;
