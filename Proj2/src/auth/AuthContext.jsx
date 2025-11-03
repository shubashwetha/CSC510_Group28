import { createContext, useContext, useEffect, useMemo, useState } from "react";
import firebaseAuth from "./adapters/firebaseAdapter";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => firebaseAuth.onAuthStateChanged(setUser), []);

  const value = useMemo(() => ({
    user,
    isAuthed: !!user,
    login: (e,p) => firebaseAuth.login(e,p),
    signup: (n,e,p) => firebaseAuth.signup(n,e,p),
    loginWithGoogle: firebaseAuth.loginWithGoogle,
    logout: firebaseAuth.logout,
    getToken: firebaseAuth.getToken,
  }), [user]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);
