import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import ClubSelectionCard from "../components/ClubSelectionCard";
import DateTimeCard from "../components/DateTimeCard";
import SeatsSelection from "../components/SeatsSelection";
import useMockBooking from "../hooks/useMockBooking";
import { useAccount } from "../context/useAccount";
import { useAuth } from "../context/useAuth";
import {
  availableSlots,
  availableSeats,
  createBooking as createBookingRequest,
} from "../api/bookingApi";
import { useClubsData } from "../hooks/useClubsData";

function SummaryCard({ totalPrice, balance }) {
  return (
    <div className="card bg-base-200 p-4 mb-4">
      <div className="flex justify-between mb-2">
        <span className="font-semibold">Общая стоимость:</span>
        <span className="font-semibold">${totalPrice}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold">Баланс:</span>
        <span className="font-semibold">${balance}</span>
      </div>
      <p className="text-sm opacity-80 mt-2">Длительность слота: 1 час.</p>
    </div>
  );
}

export default function Booking() {
  const { booking, updateBooking } = useMockBooking();
  const { addBooking, canAfford, balance } = useAccount();
  const { token, refreshMe } = useAuth();
  const { clubs } = useClubsData();
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableSeatIds, setAvailableSeatIds] = useState([]);
  const [freeSlots, setFreeSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const navigate = useNavigate();

  const totalPrice = selectedSeats.reduce((sum, seatId) => {
    const seat = selectedClub?.seats.find((s) => s.id === seatId);
    return seat ? sum + seat.price : sum;
  }, 0);

  const handleSelectClub = (club) => {
    setSelectedClub(club);
    setSelectedSeats([]);
    setAvailableSeatIds([]);
    setFreeSlots([]);
    updateBooking({ clubId: club.id, seatIds: [] });
  };

  const handleSelectSeats = (seatIds) => {
    setSelectedSeats(seatIds);
    updateBooking({ seatIds });
  };

  const loadSlotsForDate = async () => {
    if (!selectedClub || !booking.date) return;

    try {
      setLoadingSlots(true);
      setError("");
      const slots = await availableSlots(selectedClub.id, booking.date);
      setFreeSlots(slots);

      if (slots.length > 0) {
        const firstSlot = slots[0];
        updateBooking({ startTime: firstSlot });
        const seats = await availableSeats(selectedClub.id, booking.date, firstSlot);
        setAvailableSeatIds(seats.map((s) => s.id));
      } else {
        updateBooking({ startTime: "" });
        setAvailableSeatIds([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load free slots");
      setFreeSlots([]);
      setAvailableSeatIds([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSelectSlot = async (startTime) => {
    if (!selectedClub || !booking.date) return;
    try {
      setError("");
      updateBooking({ startTime });
      const seats = await availableSeats(selectedClub.id, booking.date, startTime);
      setAvailableSeatIds(seats.map((s) => s.id));
      setSelectedSeats([]);
      updateBooking({ seatIds: [] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load free seats");
    }
  };

  const loadAvailability = async () => {
    if (!selectedClub || !booking.date || !booking.startTime) return;
    try {
      const seats = await availableSeats(selectedClub.id, booking.date, booking.startTime);
      setAvailableSeatIds(seats.map((s) => s.id));
    } catch {
      // Keep fallback to local data when API is unavailable.
      setAvailableSeatIds([]);
    }
  };

  const handlePay = async () => {
    if (!selectedClub || !selectedSeats.length || !booking.date || !booking.startTime) {
      return;
    }

    if (!canAfford(totalPrice)) {
      setError("Недостаточно средств");
      return;
    }

    const input = {
      clubId: selectedClub.id,
      seatIds: selectedSeats,
      additionalServiceIds: booking.additionalServiceIds,
      date: booking.date,
      startTime: booking.startTime,
    };

    try {
      setLoading(true);
      setError("");
      const created = await createBookingRequest(input, token);
      addBooking(created);
      await refreshMe();
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking API call failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-5xl p-6 grid gap-6">
        <h1 className="text-3xl font-bold text-center">Бронирование компьютера</h1>

        <ClubSelectionCard clubs={clubs} selectable onSelectClub={handleSelectClub} />

        {selectedClub && <DateTimeCard booking={booking} updateBooking={updateBooking} />}

        {selectedClub && booking.date ? (
          <button
            className="btn btn-outline"
            onClick={loadSlotsForDate}
            disabled={loadingSlots}
          >
            Показать свободные слоты
          </button>
        ) : null}

        {freeSlots.length > 0 ? (
          <div className="card bg-base-200 p-4">
            <h3 className="font-semibold mb-3">Свободные слоты</h3>
            <div className="flex flex-wrap gap-2">
              {freeSlots.map((slot) => (
                <button
                  key={slot}
                  className={`btn btn-sm ${
                    booking.startTime === slot ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => handleSelectSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {selectedClub && booking.date && booking.startTime ? (
          <button className="btn btn-outline" onClick={loadAvailability}>
            Обновить доступность мест
          </button>
        ) : null}

        {selectedClub && booking.startTime && (
          <>
            <div className="card bg-base-300 p-4">
              <SeatsSelection
                club={{
                  ...selectedClub,
                  seats: selectedClub.seats.map((seat) => ({
                    ...seat,
                    occupied:
                      availableSeatIds.length > 0 && !availableSeatIds.includes(seat.id),
                  })),
                }}
                selectedSeats={selectedSeats}
                onSelect={handleSelectSeats}
              />
            </div>

            <SummaryCard totalPrice={totalPrice} balance={balance} />
            {error ? <p className="text-error">{error}</p> : null}

            <button
              className="btn btn-primary w-full"
              disabled={!selectedSeats.length || !canAfford(totalPrice) || loading}
              onClick={handlePay}
            >
              Оплатить
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
