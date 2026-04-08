import { useState } from "react";

export default function UserInfoCard({ user, updateUser }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    birthday: user.birthday
  });

  const save = () => {
    updateUser(form);
    setEditing(false);
  };

  const cancel = () => {
    setForm({
      name: user.name,
      phone: user.phone,
      email: user.email,
      birthday: user.birthday
    });
    setEditing(false);
  };

  return (
    <fieldset className="card bg-base-300 p-4 flex-1 min-w-[250px] border border-base-content/20 rounded-box">
      <legend className="px-2 font-bold">Информация о пользователе</legend>

      {editing ? (
        <>
          <input
            className="input input-bordered w-full mb-2"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Имя"
          />
          <input
            className="input input-bordered w-full mb-2"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="Телефон"
          />
          <input
            className="input input-bordered w-full mb-2"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Почта"
          />
          <input
            type="date"
            className="input input-bordered w-full mb-2"
            value={form.birthday}
            onChange={e => setForm({ ...form, birthday: e.target.value })}
          />
          <div className="flex gap-2">
            <button className="btn btn-sm btn-soft btn-primary flex-1" onClick={save}>
              Сохранить
            </button>
            <button className="btn btn-sm btn-soft btn-primary flex-1" onClick={cancel}>
              Отмена
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-1"><strong>Имя:</strong> {user.name}</div>
          <div className="mb-1"><strong>Телефон:</strong> {user.phone}</div>
          <div className="mb-1"><strong>Почта:</strong> {user.email}</div>
          <div className="mb-1"><strong>День рождения:</strong> {user.birthday}</div>
          <button
            className="btn btn-sm btn-soft btn-primary w-full"
            onClick={() => setEditing(true)}
          >
            Редактировать
          </button>
        </>
      )}
    </fieldset>
  );
}
