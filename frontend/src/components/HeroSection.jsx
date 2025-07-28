import React from "react";

export default function HeroSection() {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Discover Your Next
        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {" "}
          Cultural Favorite
        </span>
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
        Just describe your interests — whether it's movies, music, books, or mood — and get smart,
        personalized recommendations powered by AI that understands your taste.
      </p>
    </div>
  );
}
