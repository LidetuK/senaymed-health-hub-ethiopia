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
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  const [drugDetail, setDrugDetail] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);

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

  const handleViewDetail = (drug: string) => {
    setSelectedDrug(drug);
    setDetailLoading(true);
    setDrugDetail(null);
    fetch(`http://localhost:3000/drugs/detail?name=${encodeURIComponent(drug)}`)
      .then(res => res.json())
      .then(data => setDrugDetail(data))
      .finally(() => setDetailLoading(false));
  };

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
                            <button 
                              onClick={() => handleViewDetail(drug)}
                              className="text-senay-blue-600 hover:text-senay-blue-800 font-medium transition-colors"
                            >
                              View Detail
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

      {/* Modal for drug detail */}
      {selectedDrug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-2">{drugDetail?.name || selectedDrug}</h2>
            {detailLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-3">
                {drugDetail?.description && <div><strong>Description:</strong> <p>{drugDetail.description}</p></div>}
                {drugDetail?.indications_and_usage && <div><strong>Indications & Usage:</strong> <p>{drugDetail.indications_and_usage}</p></div>}
                {drugDetail?.purpose && <div><strong>Purpose:</strong> <p>{drugDetail.purpose}</p></div>}
                {drugDetail?.warnings && <div><strong>Warnings:</strong> <p>{drugDetail.warnings}</p></div>}
                {drugDetail?.dosage_and_administration && <div><strong>Dosage & Administration:</strong> <p>{drugDetail.dosage_and_administration}</p></div>}
                {drugDetail?.adverse_reactions && <div><strong>Adverse Reactions:</strong> <p>{drugDetail.adverse_reactions}</p></div>}
                {drugDetail?.contraindications && <div><strong>Contraindications:</strong> <p>{drugDetail.contraindications}</p></div>}
                {drugDetail?.active_ingredient && <div><strong>Active Ingredient:</strong> <p>{drugDetail.active_ingredient}</p></div>}
                {drugDetail?.inactive_ingredient && <div><strong>Inactive Ingredient:</strong> <p>{drugDetail.inactive_ingredient}</p></div>}
                {drugDetail?.precautions && <div><strong>Precautions:</strong> <p>{drugDetail.precautions}</p></div>}
                {drugDetail?.drug_interactions && <div><strong>Drug Interactions:</strong> <p>{drugDetail.drug_interactions}</p></div>}
                {drugDetail?.overdosage && <div><strong>Overdosage:</strong> <p>{drugDetail.overdosage}</p></div>}
                {drugDetail?.how_supplied && <div><strong>How Supplied:</strong> <p>{drugDetail.how_supplied}</p></div>}
                {drugDetail?.storage_and_handling && <div><strong>Storage & Handling:</strong> <p>{drugDetail.storage_and_handling}</p></div>}
                {/* If no details at all */}
                {!drugDetail?.description &&
                  !drugDetail?.indications_and_usage &&
                  !drugDetail?.purpose &&
                  !drugDetail?.warnings &&
                  !drugDetail?.dosage_and_administration &&
                  !drugDetail?.adverse_reactions &&
                  !drugDetail?.contraindications &&
                  !drugDetail?.active_ingredient &&
                  !drugDetail?.inactive_ingredient &&
                  !drugDetail?.precautions &&
                  !drugDetail?.drug_interactions &&
                  !drugDetail?.overdosage &&
                  !drugDetail?.how_supplied &&
                  !drugDetail?.storage_and_handling && (
                    <p>No details found for this drug.</p>
                )}
              </div>
            )}
            <button
              onClick={() => setSelectedDrug(null)}
              className="mt-4 px-4 py-2 bg-senay-blue-600 text-white rounded hover:bg-senay-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DrugList;
