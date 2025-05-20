
import React from 'react';
import { Search, Book, Hospital, FileText, Calendar, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color, delay }) => {
  return (
    <div 
      className={cn(
        "rounded-xl p-6 hover:scale-105 transition-all duration-300 card-shadow",
        color
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Search className="h-7 w-7 text-senay-blue-500" />,
      title: "Drug Lookup",
      description: "Search medications in Amharic, English, or Oromo. Get detailed information about dosage, side effects, and availability.",
      color: "bg-senay-blue-50",
      delay: 100
    },
    {
      icon: <FileText className="h-7 w-7 text-senay-teal-600" />,
      title: "AI-Powered Disease Info",
      description: "Get reliable information about symptoms, conditions, and treatments through our AI assistant.",
      color: "bg-senay-teal-50",
      delay: 200
    },
    {
      icon: <Book className="h-7 w-7 text-green-600" />,
      title: "Traditional Medicine Library",
      description: "Access Ethiopia's rich heritage of traditional remedies and herbal treatments documented by experts.",
      color: "bg-green-50",
      delay: 300
    },
    {
      icon: <Hospital className="h-7 w-7 text-blue-600" />,
      title: "Hospital & Clinic Directory",
      description: "Find healthcare facilities near you with information on services, hours, and contact details.",
      color: "bg-blue-50",
      delay: 400
    },
    {
      icon: <Wifi className="h-7 w-7 text-purple-600" />,
      title: "Offline Access",
      description: "Use the app without internet connection - perfect for rural areas with limited connectivity.",
      color: "bg-purple-50",
      delay: 500
    },
    {
      icon: <Calendar className="h-7 w-7 text-orange-600" />,
      title: "Prescription Reminders",
      description: "Never miss a dose with customizable medication reminders and schedules.",
      color: "bg-orange-50",
      delay: 600
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 pattern-bg">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What You <span className="gradient-text">Can Do</span>
          </h2>
          <p className="text-gray-600 text-lg">
            SenayMed puts comprehensive health information at your fingertips, in your language and context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
