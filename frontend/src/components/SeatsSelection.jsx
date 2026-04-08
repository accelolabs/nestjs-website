export default function SeatsSelection({ club, selectedSeats, onSelect }) {
  const toggleSeat = (seat) => {
    if (seat.occupied) return;

    const newSelected = selectedSeats.includes(seat.id)
      ? selectedSeats.filter((id) => id !== seat.id)
      : [...selectedSeats, seat.id];

    onSelect?.(newSelected);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {club.seats.map((seat) => {
        const isSelected = selectedSeats.includes(seat.id);
        return (
          <button
            key={seat.id}
            className={`btn btn-sm w-full ${
              seat.occupied
                ? "btn-disabled"
                : isSelected
                ? "btn-primary"
                : "btn-outline"
            }`}
            onClick={() => toggleSeat(seat)}
            disabled={seat.occupied}
          >
            {seat.name} - ${seat.price}
          </button>
        );
      })}
    </div>
  );
}
