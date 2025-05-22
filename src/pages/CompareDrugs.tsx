
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const CompareDrugs: React.FC = () => {
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Compare Drugs</h1>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Select Medications to Compare</h2>
              <p className="text-gray-600 mb-6">
                Compare two medications side by side to understand their similarities and differences.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="drug1" className="block text-sm font-medium text-gray-700 mb-1">
                    First Medication
                  </label>
                  <Input
                    id="drug1"
                    value={drug1}
                    onChange={(e) => setDrug1(e.target.value)}
                    placeholder="Enter a drug name"
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="drug2" className="block text-sm font-medium text-gray-700 mb-1">
                    Second Medication
                  </label>
                  <Input
                    id="drug2"
                    value={drug2}
                    onChange={(e) => setDrug2(e.target.value)}
                    placeholder="Enter a drug name"
                    className="w-full"
                  />
                </div>
              </div>
              
              <Button className="w-full bg-senay-blue-600 hover:bg-senay-blue-700">Compare</Button>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Popular Drug Comparisons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Lisinopril vs. Losartan", category: "Blood Pressure" },
                  { title: "Metformin vs. Insulin", category: "Diabetes" },
                  { title: "Lipitor vs. Crestor", category: "Cholesterol" },
                  { title: "Advil vs. Tylenol", category: "Pain Relief" },
                ].map((comparison, index) => (
                  <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="text-xs font-medium text-senay-blue-600 mb-1">
                        {comparison.category}
                      </div>
                      <h3 className="font-medium mb-1">{comparison.title}</h3>
                      <Button variant="link" className="p-0 h-auto text-sm">View Comparison</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="prose max-w-none">
              <h2>Why Compare Medications?</h2>
              <p>
                Comparing medications can help you and your healthcare provider make informed decisions about your treatment. 
                Our drug comparison tool allows you to see:
              </p>
              <ul>
                <li><strong>Effectiveness:</strong> How well each medication treats specific conditions</li>
                <li><strong>Side Effects:</strong> Common and serious side effects of each medication</li>
                <li><strong>Drug Interactions:</strong> How each medication interacts with other drugs</li>
                <li><strong>Cost:</strong> Price differences between medications</li>
                <li><strong>Dosing:</strong> How often each medication needs to be taken</li>
              </ul>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 my-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This tool provides general comparisons based on available medical information. 
                  Your doctor may recommend a specific medication based on your individual health needs, medical history, 
                  and other factors. Always consult with a healthcare professional before making decisions about your medications.
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

export default CompareDrugs;
