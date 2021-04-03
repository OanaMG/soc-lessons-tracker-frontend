import React, { createContext, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <AuthContext.Provider value={[user, isAuthenticated, isLoading]}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
