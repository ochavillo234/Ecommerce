import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Ito yung component na nagpo-provide ng auth state sa buong app.
// Lahat ng child components nito ay pwedeng ma-access yung user info, login, logout, etc.
export function AuthProvider({ children }: { children: ReactNode }) {
  // State para i-store yung data ng naka-login na user. Null kung walang naka-login.
  const [user, setUser] = useState<User | null>(null);

  // Function para sa pag-login.
  const login = async (email: string, password: string): Promise<boolean> => {
    // DITO YUNG API CALL para mag-authenticate sa backend.
    // Magse-send ka ng POST request sa inyong /api/login endpoint dala yung email at password.
    // Halimbawa: const response = await api.login(email, password);

    // Pansamantalang simulation ng API call.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Kung successful yung login from API, i-se-set mo yung user data.
    // Halimbawa: if (response.success) { setUser(response.user); return true; }
    if (email === 'admin@hanbok.com' && password === 'admin123') {
      setUser({ id: '1', name: 'Admin User', email: 'admin@hanbok.com', isAdmin: true });
      return true;
    }

    if (email === 'user@hanbok.com' && password === 'user123') {
      setUser({ id: '2', name: 'Regular User', email: 'user@hanbok.com', isAdmin: false });
      return true;
    }

    return false;
  };

  // Function para sa pag-register ng bagong user.
  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    // DITO YUNG API CALL para mag-register sa backend.
    // Magse-send ka ng POST request sa /api/register endpoint.
    // Halimbawa: const response = await api.register(name, email, password);

    // Pansamantalang simulation ng API call.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Kung successful yung registration, i-lo-login mo na rin yung user.
    // Halimbawa: if (response.success) { setUser(response.user); return true; }
    setUser({ id: Date.now().toString(), name, email, isAdmin: false });
    return true;
  };

  // Function para sa pag-logout.
  // Pwede ka ring mag-add ng API call dito para i-invalidate yung session sa backend.
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

// Custom hook para mas madaling gamitin yung AuthContext sa ibang components.
// Imbes na `useContext(AuthContext)` lagi, `useAuth()` na lang.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
