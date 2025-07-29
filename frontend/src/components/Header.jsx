import React from "react";
import { Brain } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Cultural Intelligence Assistant
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI-Powered Cultural Insights & Recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
