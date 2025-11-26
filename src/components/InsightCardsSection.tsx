import { InsightCard } from '../types/dashboard';
import { TrendingUp, Users, Package, Target, LineChart, Award } from 'lucide-react';

interface InsightCardsSectionProps {
  cards: InsightCard[];
  onShowDetails: (card: InsightCard) => void;
}

const categoryIcons = {
  customer: Users,
  revenue: TrendingUp,
  operations: Package,
  product: Target,
  market: LineChart,
  strategy: Award,
};

const categoryColors = {
  customer: 'from-emerald-500 to-teal-500',
  revenue: 'from-blue-500 to-cyan-500',
  operations: 'from-orange-500 to-amber-500',
  product: 'from-purple-500 to-pink-500',
  market: 'from-red-500 to-rose-500',
  strategy: 'from-indigo-500 to-violet-500',
};

export function InsightCardsSection({ cards, onShowDetails }: InsightCardsSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = categoryIcons[card.category as keyof typeof categoryIcons] || Target;
          const gradient = categoryColors[card.category as keyof typeof categoryColors] || categoryColors.product;

          return (
            <div
              key={card.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className={`h-2 bg-gradient-to-r ${gradient}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                    {card.category.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {card.title}
                </h3>

                {/* <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-4 leading-relaxed">
                  {card.description}
                </p> */}

                <button
                  onClick={() => onShowDetails(card)}
                  className={`w-full px-4 py-3 bg-gradient-to-r ${gradient} text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-semibold`}
                >
                  Show More Details
                </button>
              </div>

              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gray-100 dark:from-gray-700 opacity-50 rounded-full blur-2xl -z-10" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
