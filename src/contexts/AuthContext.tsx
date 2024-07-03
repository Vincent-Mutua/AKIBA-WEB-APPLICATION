import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"; // Import ReactNode for children type
import { auth } from "../config/firebase";
import {onAuthStateChanged, User } from "firebase/auth";

interface AuthProviderProps {
  children: ReactNode; // Define children prop explicitly
}

interface AuthContextProps {
  currentUser: User | null;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextProps>({ currentUser: null, isAdmin: false });

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => { // Use AuthProviderProps to include children
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      // Example: Determine if the user is an admin based on your own logic
      setIsAdmin(user ? checkAdminStatus(user) : false);
    });

    return unsubscribe;
  }, []);

  // Example function to check admin status
  const checkAdminStatus = (user: User): boolean => {
    // Implement your logic to determine if the user is an admin
    // Example: Check a specific claim or database field
    return user.email === "admin@example.com";
  };

  const value = {
    currentUser,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
