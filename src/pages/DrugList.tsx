
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Search, AlertCircle, Loader2 } from "lucide-react";

const DrugList: React.FC = () => {
  const { letter } = useParams<{ letter: string }>();
  const [drugs, setDrugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:3000/drugs?startsWith=${letter}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch drugs");
        return res.json();
      })
      .then(data => setDrugs(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [letter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-senay-blue-100 p-3 rounded-full mr-4">
                <Pill className="h-8 w-8 text-senay-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Drugs Starting with "{letter?.toUpperCase()}"
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our comprehensive database of medications beginning with the letter {letter?.toUpperCase()}
            </p>
          </div>

          {/* Content Section */}
          <div className="max-w-4xl mx-auto">
            {loading && (
              <Card className="text-center py-12">
                <CardContent className="pt-6">
                  <Loader2 className="h-12 w-12 animate-spin text-senay-blue-500 mx-auto mb-4" />
                  <p className="text-lg text-gray-600">Loading medications...</p>
                </CardContent>
              </Card>
            )}

            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center text-red-600">
                    <AlertCircle className="h-6 w-6 mr-2" />
                    <p className="text-lg font-medium">{error}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && !error && (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-senay-blue-500 to-senay-teal-500 text-white">
                  <CardTitle className="flex items-center text-2xl">
                    <Search className="h-6 w-6 mr-3" />
                    Search Results ({drugs.length} found)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {drugs.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No medications found</h3>
                      <p className="text-gray-500">
                        We couldn't find any medications starting with "{letter?.toUpperCase()}".
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {drugs.map((drug, index) => (
                        <div 
                          key={drug} 
                          className="p-4 hover:bg-gray-50 transition-colors duration-200 flex items-center"
                        >
                          <div className="bg-senay-blue-100 p-2 rounded-lg mr-4">
                            <Pill className="h-5 w-5 text-senay-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 hover:text-senay-blue-600 transition-colors">
                              {drug}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Medication #{index + 1}
                            </p>
                          </div>
                          <div className="text-right">
                            <button className="text-senay-blue-600 hover:text-senay-blue-800 font-medium transition-colors">
                              View Details →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Back to Search */}
          <div className="text-center mt-12">
            <a 
              href="/#drug-search" 
              className="inline-flex items-center px-6 py-3 bg-senay-blue-500 text-white rounded-lg hover:bg-senay-blue-600 transition-colors font-medium"
            >
              <Search className="h-5 w-5 mr-2" />
              Back to Drug Search
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DrugList;
