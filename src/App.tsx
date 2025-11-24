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

    // Static data for dashboard
    const headlines = [
      {
        id: '1',
        title: 'Q4 Revenue Exceeds Targets',
        summary: 'Strong performance across all segments with 32% YoY growth',
        details: 'Our Q4 results demonstrate exceptional growth across all business segments. Revenue reached $2.8M, exceeding targets by 18%. Key drivers include increased customer acquisition, improved retention rates, and successful product launches in emerging markets.',
        created_at: new Date().toISOString(),
      },
    ];

    const cards = [
      {
        id: '1',
        title: 'Customer Retention',
        description: 'Current retention rate stands at 94.2%, up 2.3% from last quarter',
        category: 'customer',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Revenue Growth',
        description: 'Total revenue increased by 32% year-over-year to $2.8M',
        category: 'revenue',
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Operational Efficiency',
        description: 'Operating costs reduced by 15% through automation initiatives',
        category: 'operations',
        created_at: new Date().toISOString(),
      },
    ];

    const metrics = [
      { id: '1', title: 'Total Revenue', value: '$2.8M', change: '+32%', trend: 'up' as const, created_at: new Date().toISOString() },
      { id: '2', title: 'Active Users', value: '15.2K', change: '+18%', trend: 'up' as const, created_at: new Date().toISOString() },
      { id: '3', title: 'Conversion Rate', value: '8.4%', change: '+2.1%', trend: 'up' as const, created_at: new Date().toISOString() },
    ];

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Real-time insights and performance metrics
                </p>
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
          <HeadlineSection headlines={headlines} onShowDetails={(headline) => {
            setSelectedHeadline(headline);
            setCardDetails({
              insights: 'This headline represents a significant achievement in our organizational performance and demonstrates strong market positioning.',
              insight_points: [
                'Strong growth trajectory across all major business segments',
                'Successful market expansion in emerging markets contributing 25% of growth',
                'Improved operational efficiency reducing time to market by 30%',
                'Enhanced customer satisfaction scores leading to increased retention',
              ],
              recommendations: [
                'Scale successful strategies from emerging markets to other regions',
                'Invest in product innovation to maintain competitive advantage',
                'Expand team capacity to support continued growth momentum',
                'Implement advanced analytics to identify next growth opportunities',
              ],
              chart_data: {
                revenue: [
                  { month: 'Q1', value: 2.0 },
                  { month: 'Q2', value: 2.25 },
                  { month: 'Q3', value: 2.55 },
                  { month: 'Q4', value: 2.8 },
                ],
              },
            });
            setCurrentPage('details');
          }} />
          <InsightCardsSection cards={cards} onShowDetails={handleCardDetails} />
          <KPISection metrics={metrics} />
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
