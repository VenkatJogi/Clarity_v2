import { X, Lightbulb, CheckCircle, TrendingUp } from 'lucide-react';
import { CardDetail, Headline } from '../types/dashboard';
import { LineChart } from './charts/LineChart';
import { BarChart } from './charts/BarChart';
import { PieChart } from './charts/PieChart';

interface DetailViewProps {
  type: 'headline' | 'card';
  headline?: Headline;
  card?: { title: string; description: string; category: string };
  details?: CardDetail;
  onClose: () => void;
}

export function DetailView({ type, headline, card, details, onClose }: DetailViewProps) {
  const renderCharts = () => {
    if (!details?.chart_data) return null;

    const chartData = details.chart_data;
    const charts = [];

    if (chartData.retention) {
      charts.push(
        <LineChart
          key="retention"
          data={chartData.retention as Array<{ month: string; rate: number }>}
          dataKey="rate"
          label="Retention Rate Trend"
        />
      );
    }

    if (chartData.revenue) {
      charts.push(
        <LineChart
          key="revenue"
          data={chartData.revenue as Array<{ month: string; value: number }>}
          dataKey="value"
          label="Revenue Trend (Millions)"
        />
      );
    }

    if (chartData.efficiency) {
      charts.push(
        <LineChart
          key="efficiency"
          data={chartData.efficiency as Array<{ month: string; score: number }>}
          dataKey="score"
          label="Efficiency Score"
        />
      );
    }

    if (chartData.usage) {
      charts.push(
        <LineChart
          key="usage"
          data={chartData.usage as Array<{ month: string; users: number }>}
          dataKey="users"
          label="Active Users"
        />
      );
    }

    if (chartData.segmentRetention) {
      charts.push(
        <BarChart
          key="segmentRetention"
          data={chartData.segmentRetention as Array<{ segment: string; rate: number }>}
          dataKey="rate"
          label="Retention by Segment"
        />
      );
    }

    if (chartData.bySegment) {
      charts.push(
        <BarChart
          key="bySegment"
          data={chartData.bySegment as Array<{ segment: string; value: number }>}
          dataKey="value"
          label="Revenue by Segment (%)"
        />
      );
    }

    if (chartData.features) {
      charts.push(
        <BarChart
          key="features"
          data={chartData.features as Array<{ name: string; adoption: number }>}
          dataKey="adoption"
          label="Feature Adoption Rate"
        />
      );
    }

    if (chartData.satisfaction) {
      charts.push(
        <BarChart
          key="satisfaction"
          data={chartData.satisfaction as Array<{ category: string; score: number }>}
          dataKey="score"
          label="Customer Satisfaction"
        />
      );
    }

    if (chartData.processes) {
      charts.push(
        <PieChart
          key="processes"
          data={chartData.processes as Array<{ type: string; percentage: number }>}
          label="Process Automation Status"
        />
      );
    }

    if (chartData.marketShare && Array.isArray(chartData.marketShare)) {
      const firstSegment = chartData.marketShare[0];
      if (firstSegment) {
        charts.push(
          <BarChart
            key="marketShare"
            data={chartData.marketShare as Array<{ segment: string; our: number }>}
            dataKey="our"
            label="Our Market Share by Segment"
          />
        );
      }
    }

    return charts;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-3xl">
          <div>
            <h2 className="text-3xl font-bold">
              {type === 'headline' ? headline?.title : card?.title}
            </h2>
            {type === 'card' && card && (
              <p className="mt-1 text-blue-100">{card.category.toUpperCase()}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {type === 'headline' && headline && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-blue-200 dark:border-gray-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Summary</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {headline.summary}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Full Details</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {headline.details}
                </p>
              </div>
            </div>
          )}

          {type === 'card' && details && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-blue-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Insights</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {details.insights}
                </p>
              </div>

              {details.insight_points && details.insight_points.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Key Points</h3>
                  </div>
                  <ul className="space-y-3">
                    {details.insight_points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {details.recommendations && details.recommendations.length > 0 && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recommendations</h3>
                  </div>
                  <ul className="space-y-3">
                    {details.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {details.chart_data && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analytics</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {renderCharts()}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
