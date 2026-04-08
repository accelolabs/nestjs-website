import { useState } from "react";

export default function PasswordCard({ changePassword }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const submit = () => {
    if (newPass !== confirmPass) return;
    changePassword(oldPass, newPass);
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <fieldset className="card bg-base-300 p-4 flex-1 min-w-[250px] border border-base-content/20 rounded-box">
      <legend className="px-2 font-bold">Смена пароля</legend>

      <input
        type="password"
        placeholder="Старый пароль"
        className="input input-bordered w-full mb-2"
        value={oldPass}
        onChange={e => setOldPass(e.target.value)}
      />
      <input
        type="password"
        placeholder="Новый пароль"
        className="input input-bordered w-full mb-2"
        value={newPass}
        onChange={e => setNewPass(e.target.value)}
      />
      <input
        type="password"
        placeholder="Повторите новый пароль"
        className="input input-bordered w-full mb-2"
        value={confirmPass}
        onChange={e => setConfirmPass(e.target.value)}
      />
      <button className="btn btn-sm btn-soft btn-primary w-full" onClick={submit}>
        Изменить пароль
      </button>
    </fieldset>
  );
}
