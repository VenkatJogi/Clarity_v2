import { ArrowLeft, Lightbulb, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { CardDetail, Headline } from '../types/dashboard';
import { LineChart } from './charts/LineChart';
import { BarChart } from './charts/BarChart';

interface DetailsPageProps {
  type: 'headline' | 'card';
  headline?: Headline;
  card?: { title: string; description: string; category: string };
  details?: CardDetail;
  onBack: () => void;
}

export function DetailsPage({ type, headline, card, details, onBack }: DetailsPageProps) {
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

    return charts;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {type === 'headline' ? headline?.title : card?.title}
              </h1>
              {type === 'card' && card && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{card.category.toUpperCase()}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {type === 'headline' && headline && details && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-blue-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Summary</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {headline.summary}
              </p>
            </div>

            {/* <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Full Details</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {headline.details}
              </p>
            </div> */}

            {/* Key Insights and Recommendations Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {details.insight_points && details.insight_points.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Key Insights</h2>
                  </div>
                  <ul className="space-y-3">
                    {details.insight_points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {details.recommendations && details.recommendations.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-emerald-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recommendations</h2>
                  </div>
                  <ul className="space-y-3">
                    {details.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Key Metrics Section */}
            {details.metrics && details.metrics.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {details.metrics.map((metric) => (
                    <div key={metric.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{metric.value}</p>
                      <div className="flex items-center gap-2">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                        ) : metric.trend === 'down' ? (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-gray-400" />
                        )}
                        <span className={`text-sm font-semibold ${
                          metric.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' :
                          metric.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                          'text-gray-600 dark:text-gray-400'
                        }`}>
                          {(metric as any).change || (metric.trend === 'up' ? '+' : metric.trend === 'down' ? '-' : '~') + '0%'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {details.chart_data && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Analytics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {renderCharts()}
                </div>
              </div>
            )}
          </div>
        )}

        {type === 'headline' && headline && !details && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Summary</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {headline.summary}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Full Details</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {headline.details}
              </p>
            </div>
          </div>
        )}

        {type === 'card' && details && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-blue-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Insights</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {details.insights}
              </p>
            </div>

            {/* Key Points and Recommendations Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {details.insight_points && details.insight_points.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Key Insights</h2>
                  </div>
                  <ul className="space-y-3">
                    {details.insight_points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {details.recommendations && details.recommendations.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-emerald-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recommendations</h2>
                  </div>
                  <ul className="space-y-3">
                    {details.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Key Metrics Section */}
            {details.metrics && details.metrics.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {details.metrics.map((metric) => (
                    <div key={metric.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{metric.value}</p>
                      <div className="flex items-center gap-2">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                        ) : metric.trend === 'down' ? (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-gray-400" />
                        )}
                        <span className={`text-sm font-semibold ${
                          metric.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' :
                          metric.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                          'text-gray-600 dark:text-gray-400'
                        }`}>
                          {(metric as any).change || (metric.trend === 'up' ? '+' : metric.trend === 'down' ? '-' : '~') + '0%'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Charts Row */}
            {details.chart_data && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Analytics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {renderCharts()}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
