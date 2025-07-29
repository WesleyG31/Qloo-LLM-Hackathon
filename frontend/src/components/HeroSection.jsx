import React from "react";
import { AlertCircle, RefreshCw, Target, TrendingUp } from 'lucide-react';
export default function HeroSection() {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Unlock Deep 
        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {" "}
          Cultural Insights
        </span>
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
        Describe your target audience and get AI-powered cultural intelligence for content creation, marketing strategies, and trend analysis.
      </p>

      <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-500" />
              <span>Content Creators</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span>Marketing Agencies</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-green-500" />
              <span>Cultural Researchers</span>
            </div>
          </div>


    </div>
  );
}
