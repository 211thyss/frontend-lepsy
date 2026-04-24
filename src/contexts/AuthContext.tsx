import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_URL } from '../config/api';

interface Provider {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  role: string;
  avatarUrl?: string;
}

interface AuthContextType {
  provider: Provider | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger le token au démarrage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedProvider = localStorage.getItem('provider');

    if (storedToken && storedProvider) {
      setToken(storedToken);
      setProvider(JSON.parse(storedProvider));
    }
    setIsLoading(false);
  }, []);

  // Écouter les changements du localStorage pour mettre à jour le provider
  useEffect(() => {
    const handleStorageChange = () => {
      const storedProvider = localStorage.getItem('provider');
      if (storedProvider) {
        setProvider(JSON.parse(storedProvider));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event pour les changements dans la même fenêtre
    window.addEventListener('providerUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('providerUpdated', handleStorageChange);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur de connexion');
      }

      const data = await response.json();

      // Stocker le token et les infos du provider
      localStorage.setItem('token', data.token);
      localStorage.setItem('provider', JSON.stringify(data.provider));

      setToken(data.token);
      setProvider(data.provider);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('provider');
    setToken(null);
    setProvider(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{
        provider,
        token,
        login,
        logout,
        isAuthenticated: !!token && !!provider,
        isLoading,
      }}
    >
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
