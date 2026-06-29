import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface User {
  id: string;
  email: string;
  username: string;
  isAdmin?: boolean;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            username: userData.username || 'User',
            isAdmin: userData.isAdmin || false,
            role: userData.role || 'user',
          });
        } else {
          // Fallback if doc doesn't exist yet
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            username: firebaseUser.displayName || 'User',
            isAdmin: false,
            role: 'user',
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const isSuperAdmin = email.toLowerCase().trim() === 'mr.lamonpro@gmail.com';
    const isPasswordValid = password === 'VishnuMc';

    if (isSuperAdmin) {
      if (!isPasswordValid) {
        throw new Error('Access Denied: Invalid Administrative Credentials.');
      }
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          isAdmin: true,
          role: 'ADMIN',
          email: firebaseUser.email?.toLowerCase(),
          updatedAt: new Date().toISOString()
        }, { merge: true });
        return;
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          await register('DevGrid Admin', email, password);
          return;
        }
        throw new Error('Access Denied: Administrative Authentication Failed.');
      }
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Log the access
      await setDoc(doc(db, 'logs', `${firebaseUser.uid}_${Date.now()}`), {
        email: firebaseUser.email,
        userId: firebaseUser.uid,
        type: 'login',
        timestamp: new Date(),
        ipAddress: '192.168.1.' + Math.floor(Math.random() * 255), // Simulated IP
      });

    } catch (error: any) {
      let message = 'Login failed. Please check your credentials.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        message = 'Invalid email or password.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      }
      throw new Error(message);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user document in Firestore
      const isAdmin = email.toLowerCase() === 'mr.lamonpro@gmail.com';
      const userData = {
        username,
        email: email.toLowerCase(),
        isAdmin,
        role: isAdmin ? 'ADMIN' : 'USER',
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);

      // Log the registration event (Client Log)
      await setDoc(doc(db, 'logs', `reg_${firebaseUser.uid}_${Date.now()}`), {
        email: firebaseUser.email,
        userId: firebaseUser.uid,
        type: 'registration',
        timestamp: new Date(),
        ipAddress: '192.168.1.' + Math.floor(Math.random() * 255), // Simulated IP
        category: 'Client Logs'
      });
    } catch (error: any) {
      let message = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'This email has already been taken. Please log in instead.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      }
      throw new Error(message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
