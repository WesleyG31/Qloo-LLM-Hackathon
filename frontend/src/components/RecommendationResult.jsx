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
      className={`mt-8 bg-gray-800  p-6 rounded-2xl shadow-lg border border-gray-700 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-100 font-semibold flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-400" />
          Recommendations
        </h2>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600  hover:from-purple-700 hover:to-blue-700 rounded-xl text-white transition-all duration-200 transform hover:scale-105 active:scale-95"
            title="Copy to clipboard"
          >
            <ClipboardCopy className="w-5 h-5" />
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            onClick={handleTryAgain}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
            title="New Search"
          >
            <RefreshCw className="w-5 h-5" />
            New Search
          </button>
        </div>
      </div>

      <pre className="text-gray-100 whitespace-pre-wrap max-w-none overflow-x-auto">
        {data.error ? data.message || data.error : textToCopy}
      </pre>
    </div>
  );
}
