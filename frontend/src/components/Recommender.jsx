import React, { useState } from "react";
import { Send, Sparkles } from "lucide-react";

export default function Recommender({ onSubmit, isLoading }) {
  const [preferences, setPreferences] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (preferences.trim() && !isLoading) {
      onSubmit(preferences.trim());
    }
  };

  const examplePrompts = [
    "I'm writing a web series for Gen Z girls in NYC who are obsessed with astrology, TikTok aesthetics, and indie romance films.",
    "Looking for game concept ideas for millennial men in Berlin who love cyberpunk, underground techno, and glitch art.",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <textarea
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="Tell me about your movie preferences, favorite genres, or movies you love..."
            className="w-full p-6 pr-16 text-lg text-gray-200 bg-gray-800 border border-gray-700 rounded-2xl shadow-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200 min-h-[120px] max-h-[200px]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!preferences.trim() || isLoading}
            className="absolute bottom-4 right-4 p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Try these examples:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setPreferences(prompt)}
              disabled={isLoading}
              className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
