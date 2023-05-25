import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { ContextProps } from "./types";

export const AuthContext = React.createContext<{ currentUser: null }>({
  currentUser: null,
});
export const AuthProvider = ({ children }: ContextProps) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, setCurrentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
