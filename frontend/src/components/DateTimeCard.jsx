export default function DateTimeCard({ booking, updateBooking }) {
  const handleDateChange = (e) => updateBooking({ date: e.target.value });
  const handleTimeChange = (e) => updateBooking({ startTime: e.target.value });
  const handleHoursChange = (e) => updateBooking({ hours: Number(e.target.value) });

  return (
    <div className="card bg-base-300 p-4">
      <h2 className="font-bold mb-3">Выбор даты и времени</h2>
      <div className="grid gap-3">
        <input
          type="date"
          className="input input-bordered w-full"
          value={booking.date || ""}
          onChange={handleDateChange}
        />
        <input
          type="time"
          className="input input-bordered w-full"
          value={booking.startTime || ""}
          onChange={handleTimeChange}
        />
        <label className="font-semibold">
          Количество часов: {booking.hours || 1}
        </label>
        <input
          type="range"
          min="1"
          max="12"
          step="1"
          value={booking.hours || 1}
          className="range w-full"
          onChange={handleHoursChange}
        />
      </div>
    </div>
  );
}
