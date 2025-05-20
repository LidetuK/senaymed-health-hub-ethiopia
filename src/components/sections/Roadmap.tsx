
import React from 'react';

const Roadmap: React.FC = () => {
  const milestones = [
    {
      week: "Week 1",
      title: "UI Design",
      description: "Creating user interfaces for web and mobile platforms",
      status: "completed"
    },
    {
      week: "Week 2",
      title: "Database Architecture",
      description: "Setting up multilingual medical database structure",
      status: "completed"
    },
    {
      week: "Week 3",
      title: "Content Creation",
      description: "Developing medical content in three languages",
      status: "in-progress"
    },
    {
      week: "Week 4",
      title: "AI Integration",
      description: "Implementing health information chatbot",
      status: "upcoming"
    },
    {
      week: "Week 5",
      title: "Offline Functionality",
      description: "Building robust offline access features",
      status: "upcoming"
    },
    {
      week: "Week 6",
      title: "Launch",
      description: "Official release for web and mobile",
      status: "upcoming"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Development <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Follow our journey as we build SenayMed from concept to launch.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Horizontal line for timeline */}
            <div className="hidden md:block absolute left-0 right-0 top-24 h-1 bg-gray-200"></div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  {/* Timeline point */}
                  <div className="hidden md:flex justify-center">
                    <div 
                      className={`
                        w-8 h-8 rounded-full z-10 flex items-center justify-center border-4 border-white
                        ${milestone.status === 'completed' ? 'bg-senay-blue-500' : 
                          milestone.status === 'in-progress' ? 'bg-senay-teal-500' : 'bg-gray-300'}
                      `}
                    >
                      {milestone.status === 'completed' && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {milestone.status === 'in-progress' && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <div 
                    className={`
                      md:mt-10 p-4 rounded-lg border shadow-sm hover:shadow-md transition-all
                      ${milestone.status === 'completed' ? 'bg-senay-blue-50 border-senay-blue-100' : 
                        milestone.status === 'in-progress' ? 'bg-senay-teal-50 border-senay-teal-100' : 'bg-gray-50 border-gray-100'}
                    `}
                  >
                    {/* Mobile status indicator */}
                    <div className="md:hidden flex items-center mb-2">
                      <div 
                        className={`
                          w-4 h-4 rounded-full mr-2
                          ${milestone.status === 'completed' ? 'bg-senay-blue-500' : 
                            milestone.status === 'in-progress' ? 'bg-senay-teal-500' : 'bg-gray-300'}
                        `}
                      >
                        {milestone.status === 'in-progress' && (
                          <div className="w-4 h-4 rounded-full bg-senay-teal-500 animate-ping opacity-75"></div>
                        )}
                      </div>
                      <span 
                        className={`text-xs uppercase font-semibold
                          ${milestone.status === 'completed' ? 'text-senay-blue-500' : 
                            milestone.status === 'in-progress' ? 'text-senay-teal-500' : 'text-gray-400'}
                        `}
                      >
                        {milestone.status}
                      </span>
                    </div>

                    <p className="font-semibold text-gray-500 text-sm">{milestone.week}</p>
                    <h3 className="font-bold mb-1">{milestone.title}</h3>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
