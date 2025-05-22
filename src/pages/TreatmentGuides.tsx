
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const TreatmentGuides: React.FC = () => {
  const guides = [
    { 
      title: "Hypertension (High Blood Pressure) Treatment",
      description: "Comprehensive guide to managing high blood pressure through lifestyle changes and medications.",
      category: "Cardiovascular"
    },
    { 
      title: "Type 2 Diabetes Management",
      description: "Learn about insulin therapy, oral medications, diet, and exercise for managing Type 2 Diabetes.",
      category: "Metabolic"
    },
    { 
      title: "Asthma Treatment Options",
      description: "Overview of rescue and long-term control medications for asthma management.",
      category: "Respiratory"
    },
    { 
      title: "Depression Treatment Approaches",
      description: "Information about therapy options, medications, and self-care strategies for depression.",
      category: "Mental Health"
    },
    { 
      title: "Rheumatoid Arthritis Therapies",
      description: "Guide to DMARDs, biologics, and other treatments for managing rheumatoid arthritis.",
      category: "Rheumatology"
    },
    { 
      title: "GERD Treatment Strategies",
      description: "Medications, lifestyle changes, and procedures to manage gastroesophageal reflux disease.",
      category: "Gastroenterology"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Treatment Guides</h1>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-8 flex gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0" />
              <div>
                <p className="text-gray-700 font-medium">Important Notice</p>
                <p className="text-gray-600 text-sm">
                  These treatment guides are for informational purposes only and should not replace professional medical advice. 
                  Always consult with a healthcare provider before starting or changing any treatment.
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Popular Treatment Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guides.map((guide, index) => (
                  <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="text-xs font-medium text-senay-blue-600 mb-1">
                        {guide.category}
                      </div>
                      <h3 className="font-medium text-lg mb-2">{guide.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                      <Button variant="outline" className="w-full">Read Guide</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Treatment Guide Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Cardiovascular", "Respiratory", "Mental Health", "Pain Management", 
                  "Dermatology", "Neurology", "Infectious Disease", "Gastroenterology", 
                  "Endocrinology", "Rheumatology", "Oncology", "Women's Health"].map((category) => (
                  <Button key={category} variant="outline" className="justify-start">
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="prose max-w-none">
              <h2>About Our Treatment Guides</h2>
              <p>
                Our treatment guides provide comprehensive information about managing various health conditions. 
                Each guide is developed using current medical research and guidelines from respected health institutions.
              </p>
              <p>
                These resources aim to help you:
              </p>
              <ul>
                <li>Understand treatment options for specific conditions</li>
                <li>Learn about medication types and how they work</li>
                <li>Discover lifestyle modifications that may help manage your condition</li>
                <li>Prepare questions to discuss with your healthcare provider</li>
              </ul>
              <p>
                Remember that medical treatments should be personalized to your specific health status, 
                medical history, and other individual factors. Always work with healthcare professionals 
                to develop the most appropriate treatment plan for your needs.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TreatmentGuides;
