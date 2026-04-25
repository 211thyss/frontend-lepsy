import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_URL } from '../config/api';

interface Provider {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  title?: string;
  phone?: string;
  role: string;
  avatarUrl?: string;
  isVerified?: boolean;
}

interface AuthContextType {
  provider: Provider | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Provider) => void;
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

    if (storedToken && storedProvider && storedProvider !== 'undefined') {
      try {
        setToken(storedToken);
        setProvider(JSON.parse(storedProvider));
      } catch (error) {
        console.error('Error parsing stored provider:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('provider');
      }
    }
    setIsLoading(false);
  }, []);

  // Écouter les changements du localStorage pour mettre à jour le provider
  useEffect(() => {
    const handleStorageChange = () => {
      const storedProvider = localStorage.getItem('provider');
      if (storedProvider && storedProvider !== 'undefined') {
        try {
          setProvider(JSON.parse(storedProvider));
        } catch (error) {
          console.error('Error parsing provider from storage:', error);
          localStorage.removeItem('provider');
        }
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

      // Le backend peut retourner soit "provider" soit "patient"
      const user = data.provider || data.patient;
      
      if (!user) {
        throw new Error('Réponse invalide du serveur');
      }

      // Stocker le token et les infos de l'utilisateur
      localStorage.setItem('token', data.token);
      localStorage.setItem('provider', JSON.stringify(user));

      setToken(data.token);
      setProvider(user);
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

  const updateUser = (user: Provider) => {
    localStorage.setItem('provider', JSON.stringify(user));
    setProvider(user);
    // Déclencher un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(new Event('providerUpdated'));
  };

  return (
    <AuthContext.Provider
      value={{
        provider,
        token,
        login,
        logout,
        updateUser,
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
