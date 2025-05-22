
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const DrugSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const trendingSearches = [
    'Amoxicillin', 'Paracetamol', 'Coartem', 'Metformin', 'Hydrochlorothiazide', 'Omeprazole'
  ];

  const navItems = [
    { name: 'Drug Interaction Checker', icon: 'interaction', path: '/drug-interaction-checker' },
    { name: 'Symptom Checker', icon: 'symptom', path: '/symptom-checker' },
    { name: 'Side Effects', icon: 'side-effects', path: '/side-effects' },
    { name: 'Conditions & Diseases', icon: 'conditions', path: '/conditions' },
    { name: 'Treatment Guides', icon: 'treatment', path: '/treatment-guides' },
    { name: 'Compare Drugs', icon: 'compare', path: '/compare-drugs' },
    { name: 'My Med List', icon: 'med-list', path: '/my-med-list' },
    { name: 'Discount Card', icon: 'discount', path: '/discount-card' },
    { name: 'FDA Alerts', icon: 'fda', path: '/fda-alerts' },
    { name: 'Price Guide', icon: 'price', path: '/price-guide' },
    { name: 'Phonetic Search', icon: 'phonetic', path: '/phonetic-search' },
    { name: 'Health Professionals', icon: 'professionals', path: '/health-professionals' },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="py-16 bg-white w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Find Drugs & Conditions
        </h2>
        
        <form onSubmit={handleSearch} className="relative mb-4 max-w-4xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a drug name, condition, pill imprint, etc."
            className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-senay-blue-500 focus:border-transparent"
          />
          <Button 
            type="submit" 
            variant="ghost" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-gray-500" />
          </Button>
        </form>
        
        <div className="text-center text-sm mb-10 max-w-4xl mx-auto">
          <span className="text-gray-600 mr-2">Trending searches:</span>
          {trendingSearches.map((term, index) => (
            <React.Fragment key={term}>
              <button 
                className="text-senay-blue-600 hover:text-senay-blue-800 hover:underline font-medium"
                onClick={() => setSearchQuery(term)}
              >
                {term}
              </button>
              {index < trendingSearches.length - 1 && <span className="text-gray-400 mx-1">•</span>}
            </React.Fragment>
          ))}
        </div>
        
        {/* Navigation Carousel */}
        <div className="mb-10 relative">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {navItems.map((item) => (
                <CarouselItem key={item.name} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/4">
                  <Link to={item.path}>
                    <div className="flex flex-col items-center bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow border border-gray-100 hover:border-senay-blue-200 h-full">
                      <div className="mb-3">
                        {getNavIcon(item.icon)}
                      </div>
                      <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="flex space-x-2 mb-4 border-b">
              <Button variant="ghost" className="rounded-none border-b-2 border-senay-blue-600 text-senay-blue-600 -mb-px">
                Browse Drugs
              </Button>
              <Button variant="ghost" className="rounded-none">
                Conditions
              </Button>
            </div>
            
            <div className="grid grid-cols-8 gap-2 mb-4">
              {/* Alphabet navigation */}
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(letter => (
                <Button key={letter} variant="outline" size="sm" className="h-10 w-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100">
                  {letter}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-8 gap-2 mb-4">
              {['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'].map(letter => (
                <Button key={letter} variant="outline" size="sm" className="h-10 w-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100">
                  {letter}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-8 gap-2 mb-4">
              {['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'].map(letter => (
                <Button key={letter} variant="outline" size="sm" className="h-10 w-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100">
                  {letter}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-8 gap-2">
              {['Y', 'Z', '0-9'].map(letter => (
                <Button key={letter} variant="outline" size="sm" className={`${letter === '0-9' ? 'col-span-2' : ''} h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100`}>
                  {letter}
                </Button>
              ))}
              <Button variant="outline" size="sm" className="col-span-5 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100">
                Advanced Search
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800 text-white p-3 mb-4 rounded-t-md">
              Browse by Site Section
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Link to="/drugs" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Drugs A-Z</Link>
                <Link to="/side-effects" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Side Effects Checker</Link>
                <Link to="/dosage" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Dosage Guidelines</Link>
                <Link to="/my-med-list" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Manage your Meds</Link>
                <Link to="/mobile-apps" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Mobile Apps</Link>
              </div>
              <div className="space-y-3">
                <Link to="/health-professionals" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Health Professionals</Link>
                <Link to="/news" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Medical News</Link>
                <Link to="/fda-alerts" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">FDA Alerts</Link>
                <Link to="/new-drugs" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">New Drugs</Link>
                <Link to="/more" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to render icons based on the type
const getNavIcon = (iconType: string) => {
  switch (iconType) {
    case 'interaction':
      return (
        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
          <div className="relative h-6 w-6 text-blue-600">
            <div className="absolute inset-0 border-2 border-current rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">!</div>
          </div>
        </div>
      );
    case 'symptom':
      return (
        <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
            <path d="M4.5 12.5C6.5 10.5 8 9.9 11.5 10.5C17.5 11.5 19.5 9 21 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4.5 18.5C6.5 16.5 8 15.9 11.5 16.5C17.5 17.5 19.5 15 21 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="3" cy="12.5" r="1.5" fill="currentColor" />
            <circle cx="3" cy="18.5" r="1.5" fill="currentColor" />
          </svg>
        </div>
      );
    case 'side-effects':
      return (
        <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
            <path d="M8 16C8.5 14.5 9.79086 13 12 13C14.2091 13 15.5 14.5 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="9" cy="9" r="1.5" fill="currentColor" />
            <circle cx="15" cy="9" r="1.5" fill="currentColor" />
          </svg>
        </div>
      );
    case 'conditions':
      return (
        <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-full">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-teal-600">
            <path d="M3 9L12 5L21 9L12 13L3 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12V18L12 22L3 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case 'treatment':
      return (
        <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
            <path d="M8 21H16V8H8V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M5 3H19V8H5V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case 'compare':
      return (
        <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full">
          <img src="/lovable-uploads/b82bd6c0-3a71-40cd-a8c3-71da1dd55c99.png" alt="Red and white pill" className="h-7 w-auto" />
        </div>
      );
    default:
      return (
        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
            <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 9L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );
  }
};

export default DrugSearch;
