import React, { useState, useEffect } from "react";
import { RefreshCw, ClipboardCopy, Star } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function RecommendationResult({ data, onReset }) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isError = data?.error;
  const message = data?.message || "";

  useEffect(() => {
    if (message) setIsVisible(true);
  }, [message]);

  if (!message) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleTryAgain = () => {
    if (onReset) onReset();
  };

  return (
    <div
      className={`mt-8 p-4 sm:p-6 rounded-2xl shadow-lg border transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${
        isError ? "bg-red-800 border-red-600" : "bg-gray-800 border-gray-700"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2
          className={`text-lg sm:text-xl font-semibold flex items-center gap-2 ${
            isError ? "text-red-100" : "text-gray-100"
          }`}
        >
          <Star
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              isError ? "text-red-300" : "text-yellow-400"
            }`}
          />
          {isError ? "Oops! Something went wrong" : "Recommendations"}
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {!isError && (
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white transition-all duration-200 transform hover:scale-105 active:scale-95 w-full sm:w-auto"
              title="Copy to clipboard"
            >
              <ClipboardCopy className="w-5 h-5" />
              {copied ? "Copied!" : "Copy"}
            </button>
          )}

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

      <div
        className={`prose max-w-none ${
          isError ? "prose-red text-red-100" : "prose-invert text-gray-100"
        }`}
      >
        {isError ? <p>{message}</p> : <ReactMarkdown>{message}</ReactMarkdown>}
      </div>
    </div>
  );
}
