import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Target,
  MapPin,
  Users,
  Heart,
  Globe,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function PromptGuide() {
  const [isExpanded, setIsExpanded] = useState(false);

  const goodExamples = [
    "I'm developing a web series for Gen Z women in Los Angeles who are obsessed with astrology, TikTok aesthetics, thrift shopping, and indie romance films with diverse casts.",
    "Creating a marketing campaign for millennial men in Berlin who love cyberpunk culture, underground techno, craft beer, and are drawn to brands with authentic storytelling.",
    "Designing a mobile game for teenage girls in Seoul who follow K-pop, webtoons, kawaii culture, and value friendship and self-expression in their entertainment.",
    "Developing content strategy for Gen X parents in Toronto who enjoy true crime podcasts, craft cocktails, vintage fashion, and nostalgic 90s references.",
  ];

  const badExamples = [
    "Give me some cultural insights",
    "What's trending now?",
    "Help me with my project",
    "Any good recommendations?",
  ];

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-2xl transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              🎯 How to Get Better Cultural Insights
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get deeper cultural insights by describing your target audience
              clearly
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="w-full px-6 pb-6 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Include at least 2 of these elements:
            </h4>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-gray-800 dark:text-gray-200">
                      Location
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      City, country, or region
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 italic">
                      "Young adults in Tokyo"
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-gray-800 dark:text-gray-200">
                      Age Group
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Generation or age range
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 italic">
                      "Gen Z college students"
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-gray-800 dark:text-gray-200">
                      Cultural Preferences
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Music, media, platforms, brands, trends
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 italic">
                      "Love indie rock, craft culture, sustainability"
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-gray-800 dark:text-gray-200">
                      Values & Motivations
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Core values, emotional drivers, lifestyle
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 italic">
                      "Value authenticity and social impact"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />✅ Good Examples
              </h4>
              <div className="space-y-3">
                {goodExamples.map((example, index) => (
                  <div
                    key={index}
                    className="text-sm text-green-700 dark:text-green-300 bg-white dark:bg-green-900/30 p-3 rounded-lg"
                  >
                    "{example}"
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5" />❌ Avoid These
              </h4>
              <div className="space-y-2">
                {badExamples.map((example, index) => (
                  <div
                    key={index}
                    className="text-sm text-red-700 dark:text-red-300 bg-white dark:bg-red-900/30 p-2 rounded-lg"
                  >
                    "{example}"
                  </div>
                ))}
              </div>
              <p className="text-xs text-red-600 dark:text-red-400 mt-3 italic">
                These are too vague and won't generate meaningful
                recommendations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
