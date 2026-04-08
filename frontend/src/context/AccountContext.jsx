import { useCallback, useMemo, useState } from "react";
import { AccountContext } from "./account-context";
import { useAuth } from "./useAuth";
import { userBookings } from "../api/bookingApi";
import { freeMoney } from "../api/authApi";

export function AccountProvider({ children }) {
  const { user, token, setUser, refreshMe } = useAuth();
  const [bookings, setBookings] = useState([]);
  const balance = user?.balance ?? 0;

  const refreshBalance = useCallback(async () => {
    if (!token) {
      return 0;
    }

    const updatedUser = await refreshMe();
    return updatedUser?.balance ?? 0;
  }, [token, refreshMe]);

  const refreshBookings = useCallback(async () => {
    if (!token) {
      setBookings([]);
      return [];
    }

    const data = await userBookings(token);
    setBookings(data);
    return data;
  }, [token]);

  const topUp = useCallback(async (amount) => {
    if (!token) throw new Error("Not authenticated");
    const updatedUser = await freeMoney(token, amount);
    setUser(updatedUser);
    return updatedUser.balance ?? 0;
  }, [token, setUser]);

  const canAfford = useCallback((price) => balance >= price, [balance]);

  const addBooking = useCallback((booking) => {
    setBookings((b) => [...b, booking]);
    return true;
  }, []);

  const value = useMemo(
    () => ({
      user,
      balance,
      refreshBalance,
      bookings,
      topUp,
      canAfford,
      addBooking,
      refreshBookings,
    }),
    [user, balance, refreshBalance, bookings, topUp, canAfford, addBooking, refreshBookings],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}
