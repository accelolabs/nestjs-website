export default function ClubCard({ club }) {
  if (!club) return null;

  return (
    <div className="card w-full bg-base-200 shadow-xl mb-4 border-2 border-primary">
      <div className="card-body">
        <h2 className="card-title">{club.name}</h2>
        <p>{club.address}</p>
      </div>
    </div>
  );
}
