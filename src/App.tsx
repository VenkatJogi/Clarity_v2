import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { supabase } from './lib/supabase';
import { useTheme } from './contexts/ThemeContext';
import { Headline, InsightCard, CardDetail, KPIMetric } from './types/dashboard';
import { HeadlineSection } from './components/HeadlineSection';
import { InsightCardsSection } from './components/InsightCardsSection';
import { KPISection } from './components/KPISection';
import { DetailView } from './components/DetailView';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [cards, setCards] = useState<InsightCard[]>([]);
  const [metrics, setMetrics] = useState<KPIMetric[]>([]);
  const [selectedHeadline, setSelectedHeadline] = useState<Headline | null>(null);
  const [selectedCard, setSelectedCard] = useState<InsightCard | null>(null);
  const [cardDetails, setCardDetails] = useState<CardDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [headlinesRes, cardsRes, metricsRes] = await Promise.all([
        supabase.from('headlines').select('*').order('created_at', { ascending: false }),
        supabase.from('insight_cards').select('*').order('created_at', { ascending: false }),
        supabase.from('kpi_metrics').select('*').order('created_at', { ascending: false }),
      ]);

      if (headlinesRes.data) setHeadlines(headlinesRes.data);
      if (cardsRes.data) setCards(cardsRes.data);
      if (metricsRes.data) setMetrics(metricsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCardDetails(card: InsightCard) {
    setSelectedCard(card);

    const { data } = await supabase
      .from('card_details')
      .select('*')
      .eq('card_id', card.id)
      .maybeSingle();

    if (data) {
      setCardDetails(data);
    }
  }

  function closeDetailView() {
    setSelectedHeadline(null);
    setSelectedCard(null);
    setCardDetails(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Real-time insights and performance metrics
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <HeadlineSection headlines={headlines} onShowDetails={setSelectedHeadline} />
        <InsightCardsSection cards={cards} onShowDetails={handleCardDetails} />
        <KPISection metrics={metrics} />
      </main>

      {selectedHeadline && (
        <DetailView
          type="headline"
          headline={selectedHeadline}
          onClose={closeDetailView}
        />
      )}

      {selectedCard && cardDetails && (
        <DetailView
          type="card"
          card={selectedCard}
          details={cardDetails}
          onClose={closeDetailView}
        />
      )}
    </div>
  );
}

export default App;
