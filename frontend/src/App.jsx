import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Recommender from "./components/Recommender";
import LoadingState from "./components/LoadingState";
import RecommendationResult from "./components/RecommendationResult";
import { fetchRecommendations } from "./services/api";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const handlePreferenceSubmit = async (input) => {
    console.log("User submitted preferences:", input);
    setIsLoading(true);
    setRecommendation(null);

    const { data, error } = await fetchRecommendations(input);

    if (error) {
      console.error("Error:", error);
      setRecommendation({ error });
    } else {
      setRecommendation(data);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <HeroSection />

        <Recommender onSubmit={handlePreferenceSubmit} isLoading={isLoading} />

        {/* Loading State */}
        {isLoading && <LoadingState />}
        <RecommendationResult
          data={recommendation}
          onReset={() => setRecommendation(null)}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
