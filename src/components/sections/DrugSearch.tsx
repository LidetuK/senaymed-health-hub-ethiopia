
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";

const DrugSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const trendingSearches = [
    'Amoxicillin', 'Paracetamol', 'Coartem', 'Metformin', 'Hydrochlorothiazide', 'Omeprazole'
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Find Drugs & Conditions
          </h2>
          
          <form onSubmit={handleSearch} className="relative mb-4">
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
          
          <div className="text-center text-sm mb-10">
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <SearchCategory 
              icon={<div className="w-12 h-12 flex items-center justify-center bg-senay-blue-100 rounded-full">
                <Search className="h-6 w-6 text-senay-blue-600" />
              </div>}
              title="Drugs & Medications"
            />
            <SearchCategory 
              icon={<div className="w-12 h-12 flex items-center justify-center bg-senay-teal-100 rounded-full">
                <div className="relative h-6 w-6">
                  <div className="absolute inset-0 border-2 border-senay-teal-600 rounded-full"></div>
                  <div className="absolute inset-2 flex items-center justify-center">
                    <Search className="h-3 w-3 text-senay-teal-600" />
                  </div>
                </div>
              </div>}
              title="Pill Identifier"
            />
            <SearchCategory 
              icon={<div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-full">
                <div className="relative h-6 w-6 text-amber-600">
                  <div className="absolute inset-0 border-2 border-current rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">!</div>
                </div>
              </div>}
              title="Drug Interaction Checker"
            />
            <SearchCategory 
              icon={<div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full">
                <div className="relative h-6 w-6">
                  <svg viewBox="0 0 24 24" fill="none" className="text-red-600" stroke="currentColor" strokeWidth="2">
                    <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" />
                    <path d="M12 6V12L16 14" />
                  </svg>
                </div>
              </div>}
              title="Symptom Checker"
            />
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
                <Button variant="ghost" className="rounded-none">
                  Symptoms
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
                  <a href="#" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Drugs A-Z</a>
                  <a href="#" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Side Effects Checker</a>
                  <a href="#" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Dosage Guidelines</a>
                  <a href="#" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Manage your Meds</a>
                  <a href="#" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Mobile Apps</a>
                </div>
                <div className="space-y-3">
                  <a href="#" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Health Professionals</a>
                  <a href="#" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">Medical News</a>
                  <a href="#" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">FDA Alerts</a>
                  <a href="#" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">New Drugs</a>
                  <a href="#" className="block text-senay-blue-600 hover:text-senay-blue-800 hover:underline">More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SearchCategoryProps {
  icon: React.ReactNode;
  title: string;
}

const SearchCategory: React.FC<SearchCategoryProps> = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow border border-gray-100 hover:border-senay-blue-200">
      <div className="mb-3">{icon}</div>
      <h3 className="font-medium text-gray-800">{title}</h3>
    </div>
  );
};

export default DrugSearch;
