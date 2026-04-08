import Layout from "../layouts/Layout";
import { useAuth } from "../context/AuthContext";
import { useAccount } from "../context/AccountContext";

import UserInfoCard from "../components/UserInfoCard";
import PasswordCard from "../components/PasswordCard";
import BalanceCard from "../components/BalanceCard";
import BookingCard from "../components/BookingCard";

export default function UserDashboard() {
  const { user: authUser } = useAuth();
  const {
    user,
    updateUser,
    balance,
    bookings,
    topUp
  } = useAccount();

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Личный кабинет
        </h1>

        <h2 className="text-2xl font-bold mb-4">Активные брони</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          {bookings.map(b => (
            <BookingCard key={b.id} booking={b} />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Ваш аккаунт</h2>
        <div className="flex flex-wrap gap-4">
          <UserInfoCard user={user} updateUser={updateUser} />
          <PasswordCard changePassword={() => {}} />
          <BalanceCard balance={balance} topUp={topUp} />
        </div>
      </div>
    </Layout>
  );
}
