import MapWithSearch from "./MapWithSearch";

export default function ClubSelectionCard({ clubs = [], selectable, onSelectClub }) {
  return (
    <div className="card bg-base-300 p-4">
      <h2 className="font-bold mb-3">Выбор компьютерного клуба</h2>
      <MapWithSearch clubs={clubs} selectable={selectable} onSelectClub={onSelectClub} />
    </div>
  );
}
