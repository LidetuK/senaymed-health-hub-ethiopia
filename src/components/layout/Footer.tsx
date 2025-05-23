import React from 'react';
import { Languages, Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <img src="/senaymedlogo.png" alt="SenayMed Logo" className="h-20 mb-4" />
            <p className="text-gray-600 mb-4">
              Improving health information access in Ethiopia through technology and cultural inclusivity.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-senay-blue-500 hover:text-senay-blue-700">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-senay-blue-500 hover:text-senay-blue-700">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-senay-blue-500 hover:text-senay-blue-700">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-senay-blue-600">Web App</a></li>
              <li><a href="#" className="text-gray-600 hover:text-senay-blue-600">Mobile App</a></li>
              <li><a href="#" className="text-gray-600 hover:text-senay-blue-600">API Access</a></li>
              <li><a href="#" className="text-gray-600 hover:text-senay-blue-600">For Clinics</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 mb-4">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-senay-blue-600">Our Story</a></li>
              <li><a href="#" className="text-gray-600 hover:text-senay-blue-600">Team</a></li>
              <li><a href="#" className="text-gray-600 hover:text-senay-blue-600">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-senay-blue-600">Careers</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-senay-blue-600">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-senay-blue-600">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-senay-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-senay-blue-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-16 pt-8 border-t border-gray-200">
          <div className="text-gray-500 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} SenayMed. All rights reserved.
          </div>
          
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-senay-blue-600">
              <Languages size={16} className="mr-2" />
              <span>English</span>
            </Button>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-senay-blue-600">
              <span>አማርኛ</span>
            </Button>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-senay-blue-600">
              <span>Afaan Oromoo</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
