import { Headline } from '../types/dashboard';

interface HeadlineSectionProps {
  headlines: Headline[];
  onShowDetails: (headline: Headline) => void;
}

export function HeadlineSection({ headlines, onShowDetails }: HeadlineSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Headlines</h2>
      <div className="grid grid-cols-1 gap-4">
        {headlines.slice(0, 1).map((headline) => (
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
                className="text-left font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Show More Details
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl -z-10" />
          </div>
        ))}
      </div>
    </div>
  );
}
