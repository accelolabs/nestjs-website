import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const [email, setEmail] = useState("demo@local.test");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, registerDummy } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    try {
      setLoading(true);
      setError("");
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const createDummy = async () => {
    try {
      setLoading(true);
      setError("");
      await registerDummy({
        username: "demo",
        email: "demo@local.test",
        password: "demo123",
      });
      setEmail("demo@local.test");
      setPassword("demo123");
    } catch (err) {
      setError(err instanceof Error ? err.message : "registerDummy failed");
    } finally {
      setLoading(false);
    }
  };

  const createDummyAdmin = async () => {
    try {
      setLoading(true);
      setError("");
      await registerDummy({
        username: "admin",
        email: "admin@local.test",
        password: "admin123",
        role: "ADMIN",
      });
      setEmail("admin@local.test");
      setPassword("admin123");
    } catch (err) {
      setError(err instanceof Error ? err.message : "registerDummy admin failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center py-20 px-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label mt-2">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="demo@local.test"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label mt-2">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <p className="text-error text-sm mt-2">{error}</p> : null}

          <button
            className="btn btn-neutral mt-4 w-full"
            onClick={submit}
            disabled={loading}
          >
            Sign in
          </button>
          <button
            className="btn btn-outline mt-2 w-full"
            onClick={createDummy}
            disabled={loading}
          >
            Register dummy
          </button>
          <button
            className="btn btn-outline mt-2 w-full"
            onClick={createDummyAdmin}
            disabled={loading}
          >
            Register dummy admin
          </button>
        </fieldset>
      </div>
    </Layout>
  );
}
