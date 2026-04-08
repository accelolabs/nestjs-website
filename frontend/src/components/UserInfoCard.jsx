export default function UserInfoCard({ user }) {
  if (!user) {
    return (
      <fieldset className="card bg-base-300 p-4 flex-1 min-w-[250px] border border-base-content/20 rounded-box">
        <legend className="px-2 font-bold">Пользователь</legend>
        <p className="opacity-80">Нет данных пользователя</p>
      </fieldset>
    );
  }

  return (
    <fieldset className="card bg-base-300 p-4 flex-1 min-w-[250px] border border-base-content/20 rounded-box">
      <legend className="px-2 font-bold">Пользователь</legend>
      <div className="mb-1"><strong>ID:</strong> {user.id}</div>
      <div className="mb-1"><strong>Username:</strong> {user.username}</div>
      <div className="mb-1"><strong>Email:</strong> {user.email}</div>
      <div className="mb-1"><strong>Role:</strong> {user.role}</div>
    </fieldset>
  );
}
