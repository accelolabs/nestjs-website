import { useRef, useState, useCallback } from "react";
import { useYMapsClubs } from "../hooks/useYMapsClubs";
import ClubCard from "./ClubCard";

export default function MapWithSearch({ selectable = false, onSelectClub }) {
  const mapContainer = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClub, setSelectedClub] = useState(null);

  const handleSelect = useCallback((club) => {
    if (selectable) {
      setSelectedClub(club);
      onSelectClub?.(club);
    }
  }, [selectable, onSelectClub]);

  const { loaded, filterPlacemarks } = useYMapsClubs(
    mapContainer,
    {},
    handleSelect
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (loaded) filterPlacemarks(e.target.value);
  };

  return (
    <>
      <div className="form-control mb-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Введите улицу или часть адреса"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div
        ref={mapContainer}
        className="h-[400px] w-full bg-base-200 rounded-md border border-base-300"
      ></div>

      {selectedClub && <ClubCard club={selectedClub} />}
    </>
  );
}
