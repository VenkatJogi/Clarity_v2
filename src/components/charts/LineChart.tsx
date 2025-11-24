interface LineChartProps {
  data: Array<{ month?: string; rate?: number; value?: number; users?: number; mobile?: number; desktop?: number }>;
  dataKey?: string;
  label?: string;
}

export function LineChart({ data, dataKey = 'value', label = 'Value' }: LineChartProps) {
  if (!data || data.length === 0) return null;

  const values = data.map(item => item[dataKey as keyof typeof item] as number || 0);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  return (
    <div className="w-full h-64 bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">{label}</h4>
      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          <polyline
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            points={data
              .map((item, i) => {
                const x = (i / (data.length - 1)) * 400;
                const value = item[dataKey as keyof typeof item] as number || 0;
                const y = 150 - ((value - min) / range) * 130 - 10;
                return `${x},${y}`;
              })
              .join(' ')}
          />

          {data.map((item, i) => {
            const x = (i / (data.length - 1)) * 400;
            const value = item[dataKey as keyof typeof item] as number || 0;
            const y = 150 - ((value - min) / range) * 130 - 10;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="#3b82f6"
                className="hover:r-6 transition-all"
              />
            );
          })}
        </svg>

        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          {data.map((item, i) => (
            <span key={i}>{item.month || item.year || `P${i + 1}`}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
