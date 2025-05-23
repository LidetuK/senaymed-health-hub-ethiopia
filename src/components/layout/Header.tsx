import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import AuthDialog from '@/components/auth/AuthDialog';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [initialAuthTab, setInitialAuthTab] = useState<"login" | "register">("register");
  
  const location = useLocation();
  
  // Hide header on dashboard page
  if (location.pathname === '/dashboard') {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleGetStarted = () => {
    setInitialAuthTab("register");
    setAuthDialogOpen(true);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src="/senaymedlogo.png" alt="SenayMed Logo" className="h-16 mr-2" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#why" className="text-foreground/80 hover:text-senay-blue-600 transition-colors">
            Why SenayMed
          </a>
          <a href="#features" className="text-foreground/80 hover:text-senay-blue-600 transition-colors">
            Features
          </a>
          <a href="#how" className="text-foreground/80 hover:text-senay-blue-600 transition-colors">
            How It Works
          </a>
          <a href="/#drug-search" className="text-foreground/80 hover:text-senay-blue-600 transition-colors">
            Drug Search
          </a>
          <Button variant="ghost" size="sm" className="text-foreground/80">
            <Languages size={18} className="mr-2" />
            <span>EN</span>
          </Button>
          <Button 
            variant="default" 
            className="bg-senay-blue-500 hover:bg-senay-blue-600"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 p-4">
          <nav className="flex flex-col space-y-4 p-4">
            <a 
              href="#why" 
              className="text-foreground/80 hover:text-senay-blue-600 transition-colors py-2 px-4 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Why SenayMed
            </a>
            <a 
              href="#features" 
              className="text-foreground/80 hover:text-senay-blue-600 transition-colors py-2 px-4 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how" 
              className="text-foreground/80 hover:text-senay-blue-600 transition-colors py-2 px-4 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="/#drug-search" 
              className="text-foreground/80 hover:text-senay-blue-600 transition-colors py-2 px-4 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Drug Search
            </a>
            <div className="border-t border-gray-100 my-2 pt-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-foreground/80">
                <Languages size={18} className="mr-2" />
                <span>EN</span>
              </Button>
            </div>
            <Button 
              variant="default" 
              className="w-full bg-senay-blue-500 hover:bg-senay-blue-600 mt-4"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleGetStarted();
              }}
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
      
      <AuthDialog 
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        initialTab={initialAuthTab}
      />
    </header>
  );
};

export default Header;
