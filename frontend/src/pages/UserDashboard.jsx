import { useEffect } from "react";
import Layout from "../layouts/Layout";
import { useAccount } from "../context/useAccount";

import UserInfoCard from "../components/UserInfoCard";
import PasswordCard from "../components/PasswordCard";
import BalanceCard from "../components/BalanceCard";
import BookingCard from "../components/BookingCard";

export default function UserDashboard() {
  const { user, balance, bookings, topUp, refreshBookings, refreshBalance } = useAccount();

  useEffect(() => {
    refreshBookings().catch(() => {
      // Keep UI usable when backend is unavailable.
    });
    refreshBalance().catch(() => {
      // Keep UI usable when backend is unavailable.
    });
  }, [refreshBookings, refreshBalance]);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Личный кабинет</h1>

        <h2 className="text-2xl font-bold mb-4">Активные брони</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          {bookings.map((b) => (
            <BookingCard key={b.id} booking={b} />
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
