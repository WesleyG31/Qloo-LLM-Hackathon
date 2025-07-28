import React from "react";
import { RefreshCw } from "lucide-react";

export default function RecommendationResult({ data, onReset }) {
  if (!data) return null;

  if (data.error) {
    return (
      <div className="mt-8 bg-red-100 text-red-800 p-4 rounded-lg shadow">
        <strong>Error:</strong> {data.error}
      </div>
    );
  }

  const displayText =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);

  const handleTryAgain = () => {
    if (onReset) onReset(); // Call the reset function passed from App
  };

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 transition-all">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-200 font-semibold ">
          Recommendations
        </h2>
        <button
          onClick={handleTryAgain}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          New Search
        </button>
      </div>

      <pre className="whitespace-pre-wrap text-gray-200">{displayText}</pre>
    </div>
  );
}
