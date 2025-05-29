import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Intentar cargar el usuario desde localStorage primero
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    // Si no hay en localStorage, intentar desde sessionStorage
    const sessionUser = sessionStorage.getItem('user');
    return sessionUser ? JSON.parse(sessionUser) : null;
  });

  const login = async (username: string, password: string, rememberMe: boolean) => {
    // Aquí normalmente harías una llamada a tu API
    // Por ahora simulamos un login exitoso
    const userData = {
      username,
      email: `${username}@example.com`
    };
    setUser(userData);

    if (rememberMe) {
      // Si "Recordar sesión" está activado, guardar en localStorage
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      // Si no, guardar en sessionStorage (se borra al cerrar el navegador)
      sessionStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    // Solo eliminamos la información del usuario, no la de la liga
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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