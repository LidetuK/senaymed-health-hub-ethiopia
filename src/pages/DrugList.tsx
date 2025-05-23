import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div className="min-h-screen bg-background pt-20 pb-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Drugs starting with '{letter?.toUpperCase()}'</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <ul className="list-disc pl-6 space-y-2">
            {drugs.length === 0 ? (
              <li>No drugs found.</li>
            ) : (
              drugs.map(drug => <li key={drug}>{drug}</li>)
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DrugList; 