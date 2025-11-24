interface PieChartProps {
  data: Array<{ type?: string; percentage?: number; segment?: string; value?: number }>;
  label?: string;
}

export function PieChart({ data, label = 'Distribution' }: PieChartProps) {
  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + (item.percentage || item.value || 0), 0);
  let currentAngle = 0;

  const colors = [
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981',
    '#6366f1',
  ];

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">{label}</h4>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {data.map((item, i) => {
              const value = item.percentage || item.value || 0;
              const percentage = (value / total) * 100;
              const angle = (percentage / 100) * 360;

              const startAngle = currentAngle;
              currentAngle += angle;

              const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);

              const largeArc = angle > 180 ? 1 : 0;

              return (
                <path
                  key={i}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={colors[i % colors.length]}
                  className="hover:opacity-80 transition-opacity"
                />
              );
            })}
            <circle cx="50" cy="50" r="25" fill="white" className="dark:fill-gray-800" />
          </svg>
        </div>

        <div className="space-y-2 flex-1">
          {data.map((item, i) => {
            const value = item.percentage || item.value || 0;
            const labelText = item.type || item.segment || `Item ${i + 1}`;

            return (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: colors[i % colors.length] }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{labelText}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {value}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
