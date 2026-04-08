export default function BookingCard({ booking, onCancel, cancelling }) {
  return (
    <fieldset className="card bg-base-300 p-4 flex-1 min-w-[260px] border border-base-content/20 rounded-box">
      <legend className="px-2 font-bold">{booking.club.name}</legend>

      <div className="text-sm mb-1">
        {booking.date} {booking.startTime} · 1ч
      </div>
      <div className="text-sm mb-1">
        Статус: <strong>{booking.status}</strong>
      </div>

      <div className="text-sm mb-2">
        Места:
        <ul className="list-disc list-inside">
          {booking.seats.map(seat => (
            <li key={seat.id}>
              Место {seat.number} (${seat.price})
            </li>
          ))}
        </ul>
      </div>

      <div className="font-semibold">
        Итог: ${booking.totalPrice}
      </div>
      {booking.additionalServices?.length ? (
        <div className="text-xs mt-2 opacity-80">
          Услуги: {booking.additionalServices.map((s) => s.name).join(", ")}
        </div>
      ) : null}
      {booking.status === "ACTIVE" && onCancel ? (
        <button
          className="btn btn-sm btn-warning mt-3"
          onClick={() => onCancel(booking.id)}
          disabled={cancelling}
        >
          {cancelling ? "Отмена..." : "Отменить бронь"}
        </button>
      ) : null}
    </fieldset>
  );
}
