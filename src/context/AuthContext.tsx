// src/context/AuthContext.tsx
import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  type User as FirebaseUser,
  updateProfile as firebaseUpdateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import type { UserProfile } from "../types/User";

type AuthContextType = {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;

  signup: (
    email: string,
    password: string,
    first: string,
    last: string
  ) => Promise<void>;

  login: (email: string, password: string) => Promise<FirebaseUser>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  loginWithGoogle: () => Promise<FirebaseUser>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const profileUnsubRef = useRef<(() => void) | null>(null);

  // -------------------------------------------------------------------
  // 🔥 AUTH STATE LISTENER (with role protection)
  // -------------------------------------------------------------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (profileUnsubRef.current) {
        profileUnsubRef.current();
        profileUnsubRef.current = null;
      }

      if (!firebaseUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(userRef);

      let profileData: UserProfile;

      if (!snap.exists()) {
        // Create only ONCE
        const nameParts = (firebaseUser.displayName || "").split(" ");

        profileData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: firebaseUser.displayName || "",
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" "),
          phone: firebaseUser.phoneNumber || "",
          role: "customer", // default, but will not overwrite existing admin
          createdAt: new Date().toISOString(),
        };

        // USE MERGE TO PREVENT ROLE OVERWRITE
        await setDoc(userRef, profileData, { merge: true });
      } else {
        profileData = snap.data() as UserProfile;
      }

      setProfile(profileData);

      // Live Firestore listener (role-protected)
      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (!docSnap.exists()) return;
        const newData = docSnap.data() as UserProfile;

        // Prevent accidental role overwrite
        setProfile((prev) => ({
          ...prev,
          ...newData,
          role: prev?.role || newData.role,
        }));
      });

      profileUnsubRef.current = unsubscribe;
      setLoading(false);
    });

    return () => {
      unsub();
      if (profileUnsubRef.current) profileUnsubRef.current();
    };
  }, []);

  // -------------------------------------------------------------------
  // ⭐ SIGNUP
  // -------------------------------------------------------------------
  const signup = async (
    email: string,
    password: string,
    first: string,
    last: string
  ): Promise<void> => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const u = res.user;

    await firebaseUpdateProfile(u, { displayName: `${first} ${last}` });

    const profileData: UserProfile = {
      uid: u.uid,
      email: u.email || "",
      name: `${first} ${last}`,
      firstName: first,
      lastName: last,
      phone: "",
      role: "customer",
      createdAt: new Date().toISOString(),
    };

    // MERGE — do not overwrite admin if manually set
    await setDoc(doc(db, "users", u.uid), profileData, { merge: true });

    await sendEmailVerification(u);
    await signOut(auth);
  };

  // -------------------------------------------------------------------
  // ⭐ EMAIL LOGIN
  // -------------------------------------------------------------------
  const login = async (
    email: string,
    password: string
  ): Promise<FirebaseUser> => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  };

  // -------------------------------------------------------------------
  // ⭐ LOGOUT
  // -------------------------------------------------------------------
  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  // -------------------------------------------------------------------
  // ⭐ UPDATE PROFILE
  // -------------------------------------------------------------------
  const updateProfile = async (
    data: Partial<UserProfile>
  ): Promise<void> => {
    if (!user) throw new Error("Not authenticated");

    const ref = doc(db, "users", user.uid);

    // NEVER allow "role" changes here unless explicitly passed
    const safeData = { ...data };
    if (data.role === undefined) delete (safeData as any).role;

    await setDoc(ref, safeData, { merge: true });

    setProfile((prev) => (prev ? { ...prev, ...safeData } : prev));
  };

  // -------------------------------------------------------------------
  // ⭐ GOOGLE LOGIN (MERGE-PROTECTED)
  // -------------------------------------------------------------------
  const loginWithGoogle = async (): Promise<FirebaseUser> => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    const u = res.user;

    const userRef = doc(db, "users", u.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      const nameParts = (u.displayName || "").split(" ");

      const newProfile: UserProfile = {
        uid: u.uid,
        email: u.email || "",
        name: u.displayName || "",
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" "),
        phone: u.phoneNumber || "",
        role: "customer",
        createdAt: new Date().toISOString(),
      };

      await setDoc(userRef, newProfile, { merge: true });
    }

    return u;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signup,
        login,
        logout,
        updateProfile,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
