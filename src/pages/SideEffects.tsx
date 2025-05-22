
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Search } from 'lucide-react';

const SideEffects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const commonSideEffects = [
    'Nausea', 'Headache', 'Fatigue', 'Dizziness', 'Rash',
    'Dry mouth', 'Insomnia', 'Diarrhea', 'Vomiting', 'Constipation'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Side Effects Checker</h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Search for Side Effects</h2>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter a drug name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10"
                  />
                  <Button 
                    variant="ghost" 
                    className="absolute right-0 top-0 h-full px-3" 
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5 text-gray-500" />
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Common side effects to explore:</h3>
                <div className="flex flex-wrap gap-2">
                  {commonSideEffects.map((effect) => (
                    <Button 
                      key={effect} 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSearchQuery(effect)}
                    >
                      {effect}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Understanding Side Effects</h2>
              <div className="prose max-w-none">
                <p>
                  Side effects are unwanted symptoms caused by medical treatment. All medications can cause side effects, 
                  and many factors influence an individual's risk for experiencing side effects.
                </p>

                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-md p-4 my-4">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800 mb-1">When to seek immediate medical attention:</h4>
                    <ul className="text-gray-700 text-sm list-disc pl-5 mt-0">
                      <li>Difficulty breathing or swallowing</li>
                      <li>Swelling of the face, lips, tongue, or throat</li>
                      <li>Severe dizziness or fainting</li>
                      <li>Severe rash or hives</li>
                      <li>Rapid heartbeat</li>
                    </ul>
                  </div>
                </div>

                <h3>Common vs. Serious Side Effects</h3>
                <p>
                  Most side effects are mild and temporary, often resolving as your body adjusts to a new medication. 
                  Common side effects may include headaches, nausea, or drowsiness. However, some side effects may be serious 
                  and require immediate medical attention.
                </p>

                <h3>Reporting Side Effects</h3>
                <p>
                  If you experience side effects from a medication, it's important to inform your healthcare provider. 
                  This information helps them adjust your treatment as needed. In many countries, you can also report 
                  side effects to regulatory agencies to help improve drug safety information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SideEffects;
