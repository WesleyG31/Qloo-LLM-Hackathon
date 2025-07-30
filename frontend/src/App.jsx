import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Recommender from "./components/Recommender";
import LoadingState from "./components/LoadingState";
import RecommendationResult from "./components/RecommendationResult";
import { fetchRecommendations } from "./services/api";
import PromptGuide from "./components/PromptGuide";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const handlePreferenceSubmit = async (input) => {
    setIsLoading(true);
    setRecommendation(null);

    const { data, error, message } = await fetchRecommendations(input);
    console.log("fetchRecommendations response:", { data, error, message });

    if (error) {
      console.error("Error:", message || error);
      setRecommendation({ error: message || "Unknown error" });
    } else {
      setRecommendation(data);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <section className="w-full">
          <HeroSection />
        </section>

        <section className="w-full">
          <PromptGuide />
        </section>

        <section className="w-full">
          <Recommender onSubmit={handlePreferenceSubmit} isLoading={isLoading} />
        </section>

        <section className="w-full">
          {isLoading && <LoadingState />}
          {!isLoading && recommendation && (
            <RecommendationResult
              data={recommendation}
              onReset={() => setRecommendation(null)}
            />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
