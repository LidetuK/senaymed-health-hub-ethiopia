
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const DrugInteractionChecker: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Drug Interaction Checker</h1>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-8">
              <div className="flex gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0" />
                <p className="text-gray-700">
                  Check for interactions between medications, supplements, herbs and other drugs. 
                  Multiple drug interactions can be dangerous and may affect how your medications work.
                </p>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Add Your Medications</h2>
              <p className="text-gray-600 mb-4">Enter the names of all prescription and non-prescription drugs, herbals, and supplements you are taking</p>
              
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Enter a drug name..."
                  className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-senay-blue-500"
                />
                <Button>Add</Button>
              </div>
              
              <div className="bg-gray-50 rounded-md p-4 mb-4">
                <p className="text-center text-gray-500">No medications added yet</p>
              </div>
              
              <Button className="w-full bg-senay-blue-600 hover:bg-senay-blue-700">Check Interactions</Button>
            </div>
            
            <div className="prose max-w-none">
              <h2>About Drug Interactions</h2>
              <p>
                Drug interactions can change how your medications work or increase your risk for serious side effects. 
                This tool checks for interactions between prescription drugs, over-the-counter medicines, herbals, and supplements.
              </p>
              
              <h3>Types of Drug Interactions</h3>
              <ul>
                <li><strong>Drug-drug interactions</strong> occur when two or more drugs react with each other.</li>
                <li><strong>Drug-food interactions</strong> result from drugs reacting with foods or beverages.</li>
                <li><strong>Drug-condition interactions</strong> may occur when an existing medical condition makes certain drugs potentially harmful.</li>
              </ul>
              
              <p>
                Not all drug interactions are harmful. Some medications may be better absorbed when taken with food, 
                or they may have decreased side effects when taken with other medications.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 my-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This tool should not be used as a substitute for professional medical advice, diagnosis, or treatment. 
                  Always seek the advice of your physician or other qualified health provider with any questions you may have.
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

export default DrugInteractionChecker;
