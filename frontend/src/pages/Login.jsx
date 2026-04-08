import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = () => {
    login(phone, password);
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="flex justify-center items-center py-20 px-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label mt-2">Телефон</label>
          <input
            type="tel"
            className="input w-full"
            placeholder="+79991234567"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />

          <label className="label mt-2">Пароль</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            className="btn btn-neutral mt-4 w-full"
            onClick={submit}
          >
            Войти
          </button>
        </fieldset>
      </div>
    </Layout>
  );
}
