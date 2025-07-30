import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-16 text-center">
      <div className="relative mb-6">
        <Brain className="w-16 h-16 text-purple-500 animate-pulse" />
        <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
      </div>

      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Analyzing Cultural Patterns
      </h3>

      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-sm sm:max-w-md">
        Our AI is processing cultural data and generating personalized insights for your target audience...
      </p>

      <div className="flex gap-1 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
