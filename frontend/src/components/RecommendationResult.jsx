import React, { useState, useEffect } from "react";
import { RefreshCw, ClipboardCopy, Star } from "lucide-react";

export default function RecommendationResult({ data, onReset }) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setIsVisible(true);
    }
  }, [data]);

  if (!data) return null;

  const textToCopy =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleTryAgain = () => {
    if (onReset) onReset();
  };

  return (
    <div
      className={`mt-8 bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-700 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-lg sm:text-xl text-gray-100 font-semibold flex items-center gap-2">
          <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
          Recommendations
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white transition-all duration-200 transform hover:scale-105 active:scale-95 w-full sm:w-auto"
            title="Copy to clipboard"
          >
            <ClipboardCopy className="w-5 h-5" />
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            onClick={handleTryAgain}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 w-full sm:w-auto"
            title="New Search"
          >
            <RefreshCw className="w-5 h-5" />
            New Search
          </button>
        </div>
      </div>

      <pre className="text-sm sm:text-base text-gray-100 whitespace-pre-wrap overflow-x-auto max-w-full">
        {data.error ? data.message || data.error : textToCopy}
      </pre>
    </div>
  );
}
