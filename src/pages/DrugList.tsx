import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Search, AlertCircle, Loader2, ChevronLeft, ChevronRight, X, Info, AlertTriangle, Zap, Shield, Clock, FileText } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const DrugList: React.FC = () => {
  const { letter } = useParams<{ letter: string }>();
  const [drugs, setDrugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  const [drugDetail, setDrugDetail] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
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

  // Pagination logic
  const totalPages = Math.ceil(drugs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDrugs = drugs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderDetailSection = (title: string, content: string | null, icon: React.ReactNode) => {
    if (!content) return null;
    
    return (
      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center mb-2">
          <div className="text-senay-blue-600 mr-2">{icon}</div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="text-gray-700 leading-relaxed">{content}</div>
      </div>
    );
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
              <>
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-senay-blue-500 to-senay-teal-500 text-white">
                    <CardTitle className="flex items-center justify-between text-2xl">
                      <div className="flex items-center">
                        <Search className="h-6 w-6 mr-3" />
                        Search Results ({drugs.length} found)
                      </div>
                      <div className="text-sm font-normal">
                        Page {currentPage} of {totalPages}
                      </div>
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
                        {currentDrugs.map((drug, index) => (
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
                                Medication #{startIndex + index + 1}
                              </p>
                            </div>
                            <div className="text-right">
                              <Button 
                                onClick={() => handleViewDetail(drug)}
                                variant="outline"
                                className="text-senay-blue-600 border-senay-blue-600 hover:bg-senay-blue-50"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Pagination */}
                {drugs.length > itemsPerPage && (
                  <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1}-{Math.min(endIndex, drugs.length)} of {drugs.length} drugs
                    </div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
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

      {/* Enhanced Modal for drug detail */}
      {selectedDrug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-senay-blue-500 to-senay-teal-500 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-lg mr-4">
                    <Pill className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{drugDetail?.name || selectedDrug}</h2>
                    <p className="text-white/80">Medication Information</p>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedDrug(null)}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {detailLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-senay-blue-500 mr-3" />
                  <p className="text-lg text-gray-600">Loading medication details...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {renderDetailSection("Description", drugDetail?.description, <Info className="h-5 w-5" />)}
                  {renderDetailSection("Indications & Usage", drugDetail?.indications_and_usage, <FileText className="h-5 w-5" />)}
                  {renderDetailSection("Purpose", drugDetail?.purpose, <Zap className="h-5 w-5" />)}
                  {renderDetailSection("Warnings", drugDetail?.warnings, <AlertTriangle className="h-5 w-5" />)}
                  {renderDetailSection("Dosage & Administration", drugDetail?.dosage_and_administration, <Clock className="h-5 w-5" />)}
                  {renderDetailSection("Adverse Reactions", drugDetail?.adverse_reactions, <AlertCircle className="h-5 w-5" />)}
                  {renderDetailSection("Contraindications", drugDetail?.contraindications, <Shield className="h-5 w-5" />)}
                  {renderDetailSection("Active Ingredient", drugDetail?.active_ingredient, <Pill className="h-5 w-5" />)}
                  {renderDetailSection("Inactive Ingredient", drugDetail?.inactive_ingredient, <Pill className="h-5 w-5" />)}
                  {renderDetailSection("Precautions", drugDetail?.precautions, <AlertTriangle className="h-5 w-5" />)}
                  {renderDetailSection("Drug Interactions", drugDetail?.drug_interactions, <AlertCircle className="h-5 w-5" />)}
                  {renderDetailSection("Overdosage", drugDetail?.overdosage, <AlertTriangle className="h-5 w-5" />)}
                  {renderDetailSection("How Supplied", drugDetail?.how_supplied, <Info className="h-5 w-5" />)}
                  {renderDetailSection("Storage & Handling", drugDetail?.storage_and_handling, <Shield className="h-5 w-5" />)}
                  
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
                      <div className="text-center py-12">
                        <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <Info className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Details Available</h3>
                        <p className="text-gray-500">
                          We don't have detailed information for this medication at the moment.
                        </p>
                      </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-end">
                <Button
                  onClick={() => setSelectedDrug(null)}
                  className="bg-senay-blue-600 hover:bg-senay-blue-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DrugList;
