import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/db";
import { FiLock, FiUser, FiAlertCircle } from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const user = db.admins.getCurrentUser();
    if (user) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    // Add small timeout for professional login feel
    try {
      const res = await db.admins.login(username.trim(), password);
      setLoading(false);
      if (res.success) {
        navigate("/admin");
      } else {
        setError(res.message || "Invalid credentials");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred during authentication.");
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl sm:p-10">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
            <FiLock className="h-7 w-7" />
          </div>
          <h2 className="mt-6 font-serif text-3xl font-bold tracking-tight text-white">
            Gyan Mandir Admin
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to access your administrative dashboard
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
            <FiAlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Username
              </label>
              <div className="relative mt-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                  <FiUser className="h-5 w-5" />
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-2xl border border-zinc-800 bg-zinc-950 py-3.5 pl-11 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Password
              </label>
              <div className="relative mt-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                  <FiLock className="h-5 w-5" />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-2xl border border-zinc-800 bg-zinc-950 py-3.5 pl-11 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-2xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </div>
        </form>
        
        <div className="mt-6 border-t border-zinc-800/80 pt-6 text-center text-xs text-zinc-500">
          <p>Default credentials: <span className="font-semibold text-zinc-400">admin</span> / <span className="font-semibold text-zinc-400">password</span></p>
        </div>
      </div>
    </div>
  );
}
