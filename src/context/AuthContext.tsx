import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, AuthState, SignInCredentials, SignUpCredentials, User } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_STORAGE_KEY = 'auth_state';
const API_BASE_URL = 'https://03k4o8ww63.execute-api.us-east-1.amazonaws.com';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { user: null, isAuthenticated: false };
  });

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  const signIn = async (credentials: SignInCredentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/dev/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sign in failed');
      }

      if (!data.userId) {
        throw new Error('No user ID received');
      }

      const user: User = {
        id: data.userId,
        username: credentials.username,
        email: '', // Email not provided in login response
      };
      
      setAuthState({
        user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (credentials: SignUpCredentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/dev/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sign up failed');
      }

      // After successful signup, automatically sign in
      await signIn({
        username: credentials.username,
        password: credentials.password,
      });
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        signIn,
        signUp,
        signOut,
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