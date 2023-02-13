import { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  } from "firebase/auth";

import { auth } from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    function signup(email, password) {
        // If the new account was created, the user is signed in automatically.
        return createUserWithEmailAndPassword(auth, email, password);
     }
     
     function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
     }

     function logout() {
        return signOut(auth);
      }
     
     useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setCurrentUser(user);
        });
    
        return unsubscribe;
    }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}