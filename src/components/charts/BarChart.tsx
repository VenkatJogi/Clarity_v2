interface BarChartProps {
  data: Array<{ segment?: string; rate?: number; value?: number; our?: number; name?: string; adoption?: number; score?: number }>;
  dataKey?: string;
  label?: string;
}

export function BarChart({ data, dataKey = 'value', label = 'Value' }: BarChartProps) {
  if (!data || data.length === 0) return null;

  const values = data.map(item => item[dataKey as keyof typeof item] as number || 0);
  const max = Math.max(...values);

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">{label}</h4>
      <div className="space-y-3">
        {data.map((item, i) => {
          const value = item[dataKey as keyof typeof item] as number || 0;
          const percentage = (value / max) * 100;
          const labelText = item.segment || item.name || item.category || `Item ${i + 1}`;

          return (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{labelText}</span>
                <span className="text-gray-600 dark:text-gray-400 font-semibold">{value}{typeof value === 'number' && value <= 100 ? '%' : ''}</span>
              </div>
              <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${percentage}%` }}
                >
                  {percentage > 20 && (
                    <span className="text-white text-xs font-bold">{value}{typeof value === 'number' && value <= 100 ? '%' : ''}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
