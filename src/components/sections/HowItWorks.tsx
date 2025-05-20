
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Search, FileText, Clock, BookOpen } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search className="h-6 w-6 text-white" />,
      title: "Search for symptoms or medicine",
      description: "Enter your query in any supported language - Amharic, English, or Oromo.",
      iconBg: "bg-senay-blue-500"
    },
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      title: "Get trusted results in your language",
      description: "Receive medically accurate information carefully translated and culturally relevant.",
      iconBg: "bg-senay-teal-500"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      title: "Learn about modern & traditional options",
      description: "Compare conventional treatments with traditional Ethiopian medicine approaches.",
      iconBg: "bg-purple-500"
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Get reminders & save favorites",
      description: "Set medication reminders and bookmark important information for offline access.",
      iconBg: "bg-orange-500"
    }
  ];

  return (
    <section id="how" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-600 text-lg">
            SenayMed is designed to be intuitive and accessible for everyone, regardless of technical expertise.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
          
          {/* Steps */}
          {steps.map((step, index) => (
            <div key={index} className="relative mb-12 last:mb-0">
              <div className={`md:flex ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                {/* Timeline circle */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center z-10">
                  <div className={`${step.iconBg} w-12 h-12 rounded-full flex items-center justify-center shadow-lg`}>
                    {step.icon}
                  </div>
                  <div className="absolute bg-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center border border-gray-200">
                    {index + 1}
                  </div>
                </div>
                
                {/* Mobile timeline circle */}
                <div className="md:hidden flex items-center mb-4">
                  <div className={`${step.iconBg} w-10 h-10 rounded-full flex items-center justify-center shadow-md`}>
                    {step.icon}
                  </div>
                  <div className="bg-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-gray-200 -ml-2">
                    {index + 1}
                  </div>
                  <Separator className="flex-grow ml-4" />
                </div>
                
                {/* Content */}
                <div className="md:w-5/12 mb-6 md:mb-0">
                  <div className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                {/* Spacer for odd/even layout */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
