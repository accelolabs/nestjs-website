export default function BookingCard({ booking }) {
  return (
    <fieldset className="card bg-base-300 p-4 flex-1 min-w-[260px] border border-base-content/20 rounded-box">
      <legend className="px-2 font-bold">{booking.club.name}</legend>

      <div className="text-sm mb-1">
        {booking.date} {booking.startTime} · {booking.hours}ч
      </div>

      <div className="text-sm mb-2">
        Места:
        <ul className="list-disc list-inside">
          {booking.seats.map(seat => (
            <li key={seat.id}>
              Место {seat.id}: {seat.name} (${seat.price})
            </li>
          ))}
        </ul>
      </div>

      <div className="font-semibold">
        Итог: ${booking.totalPrice}
      </div>
    </fieldset>
  );
}
