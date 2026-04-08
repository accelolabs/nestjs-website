export default function DateTimeCard({ booking, updateBooking }) {
  const handleDateChange = (e) =>
    updateBooking({
      date: e.target.value,
      startTime: "",
      seatIds: [],
    });
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="card bg-base-300 p-4">
      <h2 className="font-bold mb-3">Выбор даты и времени</h2>
      <div className="grid gap-3">
        <input
          type="date"
          className="input input-bordered w-full"
          value={booking.date || ""}
          onChange={handleDateChange}
          min={today}
        />
        <p className="text-sm opacity-80">
          Время выбирается автоматически из свободных 1-часовых слотов.
        </p>
      </div>
    </div>
  );
}
