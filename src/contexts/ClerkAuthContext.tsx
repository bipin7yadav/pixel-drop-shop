import { createContext, useContext, ReactNode } from 'react';
import { useUser, useAuth, SignIn, SignUp } from '@clerk/clerk-react';

interface ClerkAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  signOut: () => Promise<void>;
}

const ClerkAuthContext = createContext<ClerkAuthContextType | undefined>(undefined);

export function ClerkAuthProvider({ children }: { children: ReactNode }) {
  const { isLoaded: isUserLoaded, user } = useUser();
  const { isLoaded: isAuthLoaded, signOut } = useAuth();

  const isLoading = !isUserLoaded || !isAuthLoaded;
  const isAuthenticated = !!user;

  return (
    <ClerkAuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signOut,
      }}
    >
      {children}
    </ClerkAuthContext.Provider>
  );
}

export function useClerkAuth() {
  const context = useContext(ClerkAuthContext);
  if (context === undefined) {
    throw new Error('useClerkAuth must be used within a ClerkAuthProvider');
  }
  return context;
}

export { SignIn, SignUp }; 