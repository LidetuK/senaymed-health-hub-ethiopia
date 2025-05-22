
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Conditions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const commonConditions = [
    { name: 'Diabetes', group: 'Metabolic' },
    { name: 'Hypertension', group: 'Cardiovascular' },
    { name: 'Asthma', group: 'Respiratory' },
    { name: 'Depression', group: 'Mental Health' },
    { name: 'Arthritis', group: 'Musculoskeletal' },
    { name: 'Migraine', group: 'Neurological' },
    { name: 'GERD', group: 'Digestive' },
    { name: 'Eczema', group: 'Skin' }
  ];

  const conditionsByLetter: Record<string, string[]> = {
    'A': ['Asthma', 'Anemia', 'Anxiety', 'Arthritis', 'ADHD'],
    'B': ['Bronchitis', 'Back Pain', 'Bipolar Disorder', 'Blood Pressure (High)'],
    'C': ['COPD', 'Cancer', 'Cholesterol (High)', 'Colitis', 'COVID-19'],
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Conditions & Diseases</h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <div className="relative mb-6">
                <Input
                  type="text"
                  placeholder="Search conditions and diseases..."
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

              <div className="mb-6">
                <h3 className="font-medium mb-3">Common conditions:</h3>
                <div className="flex flex-wrap gap-2">
                  {commonConditions.map((condition) => (
                    <Button 
                      key={condition.name} 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSearchQuery(condition.name)}
                      className="flex gap-2"
                    >
                      <span>{condition.name}</span>
                      <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-500">{condition.group}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Tabs defaultValue="a-z" className="bg-white shadow-md rounded-lg overflow-hidden">
              <TabsList className="w-full grid grid-cols-3 h-auto p-0">
                <TabsTrigger value="a-z" className="py-3 rounded-none data-[state=active]:bg-blue-50">Browse A-Z</TabsTrigger>
                <TabsTrigger value="symptoms" className="py-3 rounded-none data-[state=active]:bg-blue-50">By Symptoms</TabsTrigger>
                <TabsTrigger value="body" className="py-3 rounded-none data-[state=active]:bg-blue-50">By Body Part</TabsTrigger>
              </TabsList>
              
              <TabsContent value="a-z" className="p-6">
                <div className="grid grid-cols-8 gap-2 mb-6">
                  {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                    <Button 
                      key={letter} 
                      variant="outline" 
                      size="sm" 
                      className={`h-10 w-10 flex items-center justify-center ${
                        Object.keys(conditionsByLetter).includes(letter) 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-gray-50'
                      }`}
                    >
                      {letter}
                    </Button>
                  ))}
                </div>

                <div className="space-y-6">
                  {Object.entries(conditionsByLetter).map(([letter, conditions]) => (
                    <div key={letter}>
                      <h3 className="text-xl font-semibold mb-3">{letter}</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                        {conditions.map((condition) => (
                          <li key={condition}>
                            <a 
                              href="#" 
                              className="text-senay-blue-600 hover:text-senay-blue-800 hover:underline"
                            >
                              {condition}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="symptoms" className="p-6">
                <p className="text-gray-600 mb-4">Select a symptom to find related conditions:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {['Fever', 'Cough', 'Fatigue', 'Shortness of breath', 'Headache', 'Nausea'].map((symptom) => (
                    <Button key={symptom} variant="outline" className="justify-start">
                      {symptom}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="body" className="p-6">
                <p className="text-gray-600 mb-4">Select a body part to find related conditions:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Head & Neck', 'Chest & Back', 'Abdomen', 'Arms & Hands', 'Legs & Feet', 'Skin'].map((bodyPart) => (
                    <Button key={bodyPart} variant="outline" className="justify-start">
                      {bodyPart}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Conditions;
