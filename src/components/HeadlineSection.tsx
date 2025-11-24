import { Headline } from '../types/dashboard';
import { ChevronRight } from 'lucide-react';

interface HeadlineSectionProps {
  headlines: Headline[];
  onShowDetails: (headline: Headline) => void;
}

export function HeadlineSection({ headlines, onShowDetails }: HeadlineSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Headlines</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {headlines.map((headline) => (
          <div
            key={headline.id}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                {headline.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
                {headline.summary}
              </p>
              <button
                onClick={() => onShowDetails(headline)}
                className="flex items-center justify-between w-full px-4 py-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-200 font-medium shadow-sm"
              >
                <span>Show More Details</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl -z-10" />
          </div>
        ))}
      </div>
    </div>
  );
}
