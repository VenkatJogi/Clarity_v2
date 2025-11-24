import { KPIMetric } from '../types/dashboard';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPISectionProps {
  metrics: KPIMetric[];
}

export function KPISection({ metrics }: KPISectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const TrendIcon = metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : Minus;
          const trendColor =
            metric.trend === 'up'
              ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
              : metric.trend === 'down'
              ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
              : 'text-gray-500 bg-gray-50 dark:bg-gray-700';

          return (
            <div
              key={metric.id}
              className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  {metric.title}
                </h3>
                <div className={`p-1.5 rounded-lg ${trendColor} transition-colors`}>
                  <TrendIcon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
