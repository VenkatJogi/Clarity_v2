import { useState, useEffect } from 'react';
import { Moon, Sun, LogOut, User } from 'lucide-react';
import { useTheme } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import { HeadlineSection } from './components/HeadlineSection';
import { InsightCardsSection } from './components/InsightCardsSection';
import { KPISection } from './components/KPISection';
import { DetailsPage } from './components/DetailsPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { RoleSelectionPage } from './components/RoleSelectionPage';
import { Chatbot } from './components/Chatbot';

function App() {
  try {
    const { theme, toggleTheme } = useTheme();
    const { user, isAuthenticated, logout } = useAuth();
    const [currentPage, setCurrentPage] = useState<'login' | 'register' | 'role' | 'dashboard' | 'details'>('login');
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Get API response from localStorage
    const roiInsightsRaw = typeof window !== 'undefined' ? localStorage.getItem('roiInsights') : null;
    let roiInsights: any = null;
    try {
      roiInsights = roiInsightsRaw ? JSON.parse(roiInsightsRaw) : null;
    } catch {
      roiInsights = null;
    }

    // Extract data from API response
    const date = roiInsights?.date || '';
    const overview = roiInsights?.overview || '';
    const headline = roiInsights?.headline || '';
    const questions = roiInsights?.questions || [];

    // Headline cards: each question's headline
    const dynamicHeadlines = questions.map((q: any, idx: number) => ({
      id: String(idx + 1),
      title: q.headline || '',
      summary: q.summary || '',
      details: q.details || '',
      created_at: date,
    }));

    // Insight cards: each question as a card
    const dynamicCards = questions.map((q: any, idx: number) => ({
      id: String(idx + 1),
      title: q.headline || '',
      description: q.overview || '',
      category: q.category || 'insight',
      created_at: date,
    }));

    // Metrics (if available)
    const metrics = roiInsights?.metrics || [];

    const [selectedHeadline, setSelectedHeadline] = useState<any>(null);
    const [selectedCard, setSelectedCard] = useState<any>(null);
    const [cardDetails, setCardDetails] = useState<any>(null);

    // Update page based on auth state
    useEffect(() => {
      if (isAuthenticated) {
        setCurrentPage('dashboard');
      } else if (user && !user.role) {
        setCurrentPage('role');
      } else if (!user) {
        setCurrentPage('login');
      }
    }, [isAuthenticated, user]);

    const handleCardDetails = (card: any) => {
      setSelectedCard(card);
      // Mock card details with charts
      let chartData = null;

      if (card.category === 'customer') {
        chartData = {
          retention: [
            { month: 'Jan', rate: 85.5 },
            { month: 'Feb', rate: 87.2 },
            { month: 'Mar', rate: 89.1 },
            { month: 'Apr', rate: 91.0 },
            { month: 'May', rate: 92.5 },
            { month: 'Jun', rate: 94.2 },
          ],
          segmentRetention: [
            { segment: 'Enterprise', rate: 96.5 },
            { segment: 'Mid-Market', rate: 93.2 },
            { segment: 'SMB', rate: 91.0 },
            { segment: 'Startup', rate: 88.5 },
          ],
        };
      } else if (card.category === 'revenue') {
        chartData = {
          revenue: [
            { month: 'Jan', value: 1.8 },
            { month: 'Feb', value: 1.95 },
            { month: 'Mar', value: 2.1 },
            { month: 'Apr', value: 2.3 },
            { month: 'May', value: 2.55 },
            { month: 'Jun', value: 2.8 },
          ],
          bySegment: [
            { segment: 'Product Sales', value: 65 },
            { segment: 'Services', value: 25 },
            { segment: 'Subscriptions', value: 10 },
          ],
        };
      } else if (card.category === 'operations') {
        chartData = {
          efficiency: [
            { month: 'Jan', score: 72 },
            { month: 'Feb', score: 75 },
            { month: 'Mar', score: 78 },
            { month: 'Apr', score: 82 },
            { month: 'May', score: 85 },
            { month: 'Jun', score: 88 },
          ],
          features: [
            { name: 'Automation', adoption: 92 },
            { name: 'Analytics', adoption: 88 },
            { name: 'Integration', adoption: 75 },
            { name: 'API Access', adoption: 70 },
          ],
        };
      }

      setCardDetails({
        insights: 'Our customer retention strategy focuses on personalized engagement and proactive support.',
        insight_points: [
          'Improved onboarding process increased retention by 8%',
          'Implemented customer success program reducing churn',
          'Regular feature updates based on customer feedback',
        ],
        recommendations: [
          'Continue investment in customer success team',
          'Expand product features based on user requests',
          'Implement advanced analytics for user behavior tracking',
        ],
        metrics: metrics,
        chart_data: chartData,
      });
      setCurrentPage('details');
    };

    function closeDetailsPage() {
      setSelectedHeadline(null);
      setSelectedCard(null);
      setCardDetails(null);
      setCurrentPage('dashboard');
    }

    const handleLogout = () => {
      logout();
      setCurrentPage('login');
      setShowProfileMenu(false);
    };

    const handleLoginSuccess = () => {
      setCurrentPage('role');
    };

    const handleRoleSelected = () => {
      setCurrentPage('dashboard');
    };

    // Show login page
    if (currentPage === 'login') {
      return (
        <LoginPage
          onSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setCurrentPage('register')}
        />
      );
    }

    // Show register page
    if (currentPage === 'register') {
      return (
        <RegisterPage
          onSuccess={handleLoginSuccess}
          onSwitchToLogin={() => setCurrentPage('login')}
        />
      );
    }

    // Show role selection page
    if (currentPage === 'role') {
      return <RoleSelectionPage onRoleSelected={handleRoleSelected} />;
    }

    // Show details page
    if (currentPage === 'details') {
      return (
        <>
          <DetailsPage
            type={selectedCard ? 'card' : 'headline'}
            headline={selectedHeadline}
            card={selectedCard}
            details={cardDetails}
            onBack={closeDetailsPage}
          />
          <Chatbot />
        </>
      );
    }

    // Dashboard
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center">
                <img src="/logo.png" alt="Clarity Logo" className="h-48 w-auto" />
              </div>
              <div className="flex items-center gap-4">
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

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all"
                    aria-label="Profile menu"
                  >
                    <User className="w-5 h-5" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{user?.email}</p>
                        {user?.role && (
                          <div className="mt-2 inline-block px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </div>
                        )}
                      </div>

                      <div className="px-4 py-3 space-y-2">
                        <button
                          onClick={() => setShowProfileMenu(false)}
                          className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-semibold"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Show date at top */}
          {date && (
            <div className="mb-4 text-right text-sm text-gray-500 dark:text-gray-400">Date: {date}</div>
          )}
          {/* Overview section: overview + headline */}
          {(overview || headline) && (
            <div className="mb-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-200 mb-2">Overview</h2>
              {overview && <p className="text-gray-700 dark:text-gray-300 mb-2">{overview}</p>}
              {headline && <p className="text-gray-700 dark:text-gray-300 font-semibold">{headline}</p>}
            </div>
          )}
          {/* Dynamic Headline Cards */}
          <HeadlineSection headlines={dynamicHeadlines} onShowDetails={(headline) => {
            setSelectedHeadline(headline);
            setCardDetails({
              insights: headline.summary,
              insight_points: [],
              recommendations: [],
              metrics: metrics,
              chart_data: {},
            });
            setCurrentPage('details');
          }} />
          {/* Dynamic Insight Cards */}
          <InsightCardsSection cards={dynamicCards} onShowDetails={handleCardDetails} />
          {/* <KPISection metrics={metrics} /> */}
        </main>

        <Chatbot />
      </div>
    );
  } catch (error) {
    console.error('App error:', error);
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Error in App</h1>
        <p>{(error as Error).message}</p>
      </div>
    );
  }
}

export default App;
