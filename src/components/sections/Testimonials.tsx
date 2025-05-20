
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  location: string;
  avatarSeed: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, role, location, avatarSeed }) => {
  return (
    <Card className="hover-scale card-shadow">
      <CardContent className="p-6">
        <div className="flex items-start mb-4">
          <div className="relative mr-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-senay-blue-100">
              {/* Using dicebear avatars as placeholders */}
              <img 
                src={`https://api.dicebear.com/7.x/personas/svg?seed=${avatarSeed}`} 
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-senay-blue-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-sm text-gray-500">{role}</div>
            <div className="text-xs text-senay-blue-500">{location}</div>
          </div>
        </div>
        <blockquote className="text-gray-700 italic relative">
          <span className="text-4xl absolute -top-2 -left-1 text-senay-blue-200">"</span>
          <p className="pl-5">{quote}</p>
        </blockquote>
      </CardContent>
    </Card>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "The offline feature is a game-changer for our clinic in rural Amhara. We can access critical medication information even with spotty internet.",
      name: "Dr. Girmay Tadesse",
      role: "Physician",
      location: "Amhara Region",
      avatarSeed: "girmay"
    },
    {
      quote: "I love that I can search for medications in Amharic. It's so much easier to understand treatments for my grandmother now.",
      name: "Meron Abebe",
      role: "Caregiver",
      location: "Addis Ababa",
      avatarSeed: "meron"
    },
    {
      quote: "The traditional medicine section helped me understand how to properly use herbs that my family has used for generations.",
      name: "Dawit Haile",
      role: "Community Health Worker",
      location: "SNNPR",
      avatarSeed: "dawit"
    },
    {
      quote: "Finding the right clinic for my pregnancy check-ups was so easy with SenayMed's hospital directory feature.",
      name: "Tigist Bekele",
      role: "Expectant Mother",
      location: "Oromia Region",
      avatarSeed: "tigist"
    }
  ];

  return (
    <section id="impact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">Impact</span> Stories
          </h2>
          <p className="text-gray-600 text-lg">
            SenayMed is changing how Ethiopians access healthcare information across diverse communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              location={testimonial.location}
              avatarSeed={testimonial.avatarSeed}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
