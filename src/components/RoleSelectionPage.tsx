import React from 'react';
import { UserRole, useAuth } from '../contexts/AuthContext';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface RoleSelectionPageProps {
  onRoleSelected: () => void;
}

const roleOptions: Array<{ id: UserRole; title: string }> = [
  {
    id: 'admin',
    title: 'Administrator',
  },
  {
    id: 'manager',
    title: 'Manager',
  },
  {
    id: 'analyst',
    title: 'Analyst',
  },
];

export function RoleSelectionPage({ onRoleSelected }: RoleSelectionPageProps) {
  const { selectRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [selectedRole, setSelectedRole] = React.useState<UserRole | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSelectRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setLoading(true);
    selectRole(selectedRole);
    setTimeout(() => {
      onRoleSelected();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Left Side - Image */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden justify-center items-center"
        style={{
          backgroundImage: 'url(/bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center text-white space-y-6">
          <h1 className="text-5xl font-bold">Choose Your Role</h1>
          <p className="text-xl text-gray-200 max-w-md">Select the role that best fits your needs to access customized features</p>
        </div>
      </div>

      {/* Right Side - Role Selection Form */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 flex flex-col items-center justify-center p-8 sm:p-12">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>

        <div className="w-full max-w-md">
          <form onSubmit={handleSelectRole} className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Select Your Role</h2>
              <p className="text-gray-600 dark:text-gray-400">Choose the role that best describes your position</p>
            </div>

            <div className="space-y-3">
              <label htmlFor="role-select" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Role
              </label>
              <select
                id="role-select"
                value={selectedRole || ''}
                onChange={(e) => setSelectedRole(e.target.value as Exclude<UserRole, null>)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
                required
              >
                <option value="">Select a role...</option>
                {roleOptions.map((role) => (
                  <option key={role.id} value={role.id || ''}>
                    {role.title}
                  </option>
                ))}
              </select>
            </div>

            {selectedRole && (
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <p className="text-sm text-indigo-800 dark:text-indigo-300">
                  <span className="font-semibold">Selected:</span> {roleOptions.find((r) => r.id === selectedRole)?.title}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedRole || loading}
              className="w-full px-4 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Setting Up Your Dashboard...' : 'Continue to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
