
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const SymptomChecker: React.FC = () => {
  const [symptom, setSymptom] = useState('');
  const [activeTab, setActiveTab] = useState('info');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for symptom:', symptom);
    // Here you would implement actual symptom checking functionality
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-senay-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Symptom Checker</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Identify possible conditions and treatments by checking your symptoms
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 md:p-8 bg-white">
                <Tabs defaultValue="info" className="mb-6" onValueChange={(value) => setActiveTab(value)}>
                  <TabsList className="grid grid-cols-5 mb-8">
                    <TabsTrigger value="info" className={activeTab === 'info' ? 'border-b-2 border-senay-blue-500' : ''}>INFO</TabsTrigger>
                    <TabsTrigger value="symptoms" className={activeTab === 'symptoms' ? 'border-b-2 border-senay-blue-500' : ''}>SYMPTOMS</TabsTrigger>
                    <TabsTrigger value="conditions" className={activeTab === 'conditions' ? 'border-b-2 border-senay-blue-500' : ''}>CONDITIONS</TabsTrigger>
                    <TabsTrigger value="details" className={activeTab === 'details' ? 'border-b-2 border-senay-blue-500' : ''}>DETAILS</TabsTrigger>
                    <TabsTrigger value="treatment" className={activeTab === 'treatment' ? 'border-b-2 border-senay-blue-500' : ''}>TREATMENT</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="mt-0">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">What are your symptoms?</h3>
                    <form onSubmit={handleSubmit}>
                      <Input 
                        type="text" 
                        placeholder="Type your main symptom here" 
                        className="mb-4" 
                        value={symptom}
                        onChange={(e) => setSymptom(e.target.value)}
                      />
                    </form>

                    <div className="mt-8 bg-gray-50 p-6 rounded-md text-center">
                      <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M9 9L11 11L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 3L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-500">No symptoms added</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="symptoms" className="mt-0">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-2">ALL LEG SYMPTOMS</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Pain in legs</li>
                        <li>Swelling in legs</li>
                        <li>Numbness or tingling</li>
                        <li>Weakness or difficulty walking</li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="conditions" className="mt-0">
                    <p className="text-gray-600">Select symptoms first to see possible conditions.</p>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-0">
                    <p className="text-gray-600">Additional details will appear after symptoms are selected.</p>
                  </TabsContent>
                  
                  <TabsContent value="treatment" className="mt-0">
                    <p className="text-gray-600">Treatment options will be shown based on identified conditions.</p>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between mt-auto pt-4">
                  <Button variant="outline" disabled={activeTab === 'info'}>Previous</Button>
                  <Button disabled={!symptom}>Continue</Button>
                </div>
              </div>
              
              <div className="bg-gray-50 flex items-center justify-center p-4 relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Human body diagram for symptom selection" 
                  className="h-[400px] object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x500?text=Human+Body+Diagram';
                  }}
                />
                
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                  <Button variant="outline" size="icon" className="bg-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 15V9M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="bg-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="bg-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 15H16M8 15L11 12M8 15L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </div>
                
                <div className="absolute right-4 bottom-4">
                  <Button variant="outline" className="bg-white">SKIN</Button>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="text-center mt-6">
            <Button variant="outline" className="bg-white">Learn more about SenayMed Symptom Checker</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;
