import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'admin' | 'manager' | 'analyst' | null;

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  selectRole: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
        setUser(null);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Static credentials validation
    if (email === 'test@gmail.com' && password === 'test1234') {
      const newUser: User = {
        id: '1',
        email,
        name: 'Test User',
        role: null, // Role will be set after selection
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      throw new Error('Invalid email or password. Use test@gmail.com / test1234');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    // Static credentials - allow registration only with test credentials for demo
    if (email === 'test@gmail.com' && password === 'test1234') {
      const newUser: User = {
        id: '1',
        email,
        name,
        role: null, // Role will be set after selection
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      throw new Error('Demo only supports test@gmail.com / test1234');
    }
  };

  const selectRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user && !!user.role, login, register, selectRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
