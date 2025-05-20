
import React from 'react';
import { FileText, Languages, Search, Wifi } from 'lucide-react';

const WhySenayMed: React.FC = () => {
  const problems = [
    {
      icon: <Search className="text-senay-blue-500 h-8 w-8" />,
      title: "Limited access to accurate health info",
      description: "Most Ethiopians can't easily access reliable medical information, especially in rural areas."
    },
    {
      icon: <Languages className="text-senay-blue-500 h-8 w-8" />,
      title: "Lack of local language support",
      description: "Health information is rarely available in local Ethiopian languages, creating barriers to understanding."
    },
    {
      icon: <FileText className="text-senay-blue-500 h-8 w-8" />,
      title: "No integration of traditional medicine",
      description: "Existing solutions ignore Ethiopia's rich tradition of natural and herbal remedies."
    },
    {
      icon: <Wifi className="text-senay-blue-500 h-8 w-8" />,
      title: "Offline access challenges",
      description: "Many regions have limited connectivity, making it difficult to access online health resources."
    }
  ];

  return (
    <section id="why" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why <span className="gradient-text">SenayMed</span>?
          </h2>
          <p className="text-gray-600 text-lg">
            We're addressing critical gaps in Ethiopia's healthcare information ecosystem to make quality health knowledge accessible to all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:border-senay-blue-200 shadow-sm hover:shadow-md transition-all card-shadow"
            >
              <div className="bg-senay-blue-50 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-6">
                {problem.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
              <p className="text-gray-600">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySenayMed;
