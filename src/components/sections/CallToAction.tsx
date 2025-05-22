
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Healthcare Access?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join us in building a healthier Ethiopia with accessible, multilingual health information.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-white text-senay-blue-600 hover:bg-gray-100 px-8 py-6"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
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
