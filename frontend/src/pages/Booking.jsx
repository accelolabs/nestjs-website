import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import ClubSelectionCard from "../components/ClubSelectionCard";
import DateTimeCard from "../components/DateTimeCard";
import SeatsSelection from "../components/SeatsSelection";
import useMockBooking from "../hooks/useMockBooking";
import { useAccount } from "../context/AccountContext";

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
    </div>
  );
}

export default function Booking() {
  const { booking, updateBooking } = useMockBooking();
  const { addBooking, canAfford, balance } = useAccount();
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const totalPrice =
    selectedSeats.reduce((sum, seatId) => {
      const seat = selectedClub?.seats.find(s => s.id === seatId);
      return seat ? sum + seat.price : sum;
    }, 0) * booking.hours;

  const handlePay = () => {
    if (!selectedSeats.length || !canAfford(totalPrice)) return;

    const seats = selectedClub.seats.filter(s =>
      selectedSeats.includes(s.id)
    );

    addBooking({
      id: crypto.randomUUID(),
      club: selectedClub,
      date: booking.date,
      startTime: booking.startTime,
      hours: booking.hours,
      seats,
      totalPrice
    });

    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-5xl p-6 grid gap-6">
        <h1 className="text-3xl font-bold text-center">
          Бронирование компьютера
        </h1>

        <ClubSelectionCard selectable onSelectClub={setSelectedClub} />

        {selectedClub && (
          <DateTimeCard booking={booking} updateBooking={updateBooking} />
        )}

        {selectedClub && booking.startTime && (
          <>
            <div className="card bg-base-300 p-4">
              <SeatsSelection
                club={selectedClub}
                selectedSeats={selectedSeats}
                onSelect={setSelectedSeats}
              />
            </div>

            <SummaryCard totalPrice={totalPrice} balance={balance} />

            <button
              className="btn btn-primary w-full"
              disabled={!selectedSeats.length || !canAfford(totalPrice)}
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
