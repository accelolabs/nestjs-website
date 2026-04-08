import MapWithSearch from "./MapWithSearch";

export default function ClubSelectionCard({ selectable, onSelectClub }) {
  return (
    <div className="card bg-base-300 p-4">
      <h2 className="font-bold mb-3">Выбор компьютерного клуба</h2>
      <MapWithSearch selectable={selectable} onSelectClub={onSelectClub} />
    </div>
  );
}
