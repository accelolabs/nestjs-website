import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useAccount } from "../context/useAccount";
import { useAuth } from "../context/useAuth";
import { cancelBooking } from "../api/bookingApi";

import UserInfoCard from "../components/UserInfoCard";
import PasswordCard from "../components/PasswordCard";
import BalanceCard from "../components/BalanceCard";
import BookingCard from "../components/BookingCard";

export default function UserDashboard() {
  const { user, balance, bookings, topUp, refreshBookings, refreshBalance } = useAccount();
  const { token } = useAuth();
  const [cancellingId, setCancellingId] = useState("");

  useEffect(() => {
    refreshBookings().catch(() => {
      // Keep UI usable when backend is unavailable.
    });
    refreshBalance().catch(() => {
      // Keep UI usable when backend is unavailable.
    });
  }, [refreshBookings, refreshBalance]);

  const handleCancel = async (bookingId) => {
    if (!token) return;
    try {
      setCancellingId(bookingId);
      await cancelBooking(bookingId, token);
      await refreshBookings();
      await refreshBalance();
    } finally {
      setCancellingId("");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Личный кабинет</h1>

        <h2 className="text-2xl font-bold mb-4">Активные брони</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          {bookings.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onCancel={handleCancel}
              cancelling={cancellingId === b.id}
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Ваш аккаунт</h2>
        <div className="flex flex-wrap gap-4">
          <UserInfoCard user={user} />
          <PasswordCard changePassword={() => {}} />
          <BalanceCard balance={balance} topUp={topUp} refreshBalance={refreshBalance} />
        </div>
      </div>
    </Layout>
  );
}
