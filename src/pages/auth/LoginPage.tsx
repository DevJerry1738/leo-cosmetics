// src/pages/auth/Login.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase/config";
import { signOut } from "firebase/auth";
import "../../styles/Auth.css";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoadingLocal(true);

    try {
      const u = await login(email, password);
      await u.reload();

      if (!u.emailVerified) {
        await signOut(auth);
        setError("Your email is not verified. Please check your inbox.");
        setLoadingLocal(false);
        return;
      }

      // load user profile so we can check role
      const userRef = doc(db, "users", u.uid);
      const snap = await getDoc(userRef);
      const data = snap.data();

      if (data?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoadingLocal(false);
    }
  };

 const google = async () => {
  setError(null);
  setLoadingLocal(true);

  try {
    const u = await loginWithGoogle(); // returns FirebaseUser

    const userRef = doc(db, "users", u.uid);
    const snap = await getDoc(userRef);
    const data = snap.data();

    if (data?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/products");
    }
  } catch (err: any) {
    setError(err.message || "Google login failed");
  } finally {
    setLoadingLocal(false);
  }
};


  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={submit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="auth-btn primary"
            type="submit"
            disabled={loadingLocal}
          >
            {loadingLocal ? <div className="spinner" /> : "Log in"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button
          className="auth-btn google"
          onClick={google}
          disabled={loadingLocal}
        >
          {loadingLocal ? <div className="spinner" /> : "Continue with Google"}
        </button>

        <p className="switch-auth">
          Don’t have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </section>
  );
}
