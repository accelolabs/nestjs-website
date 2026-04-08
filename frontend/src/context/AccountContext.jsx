import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const AccountContext = createContext(null);

export function AccountProvider({ children }) {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(authUser);
  const [balance, setBalance] = useState(12);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (authUser) setUser(authUser);
  }, [authUser]);

  const updateUser = data => {
    setUser(u => ({ ...u, ...data }));
  };

  const topUp = amount => {
    if (amount > 0) setBalance(b => b + amount);
  };

  const canAfford = price => balance >= price;

  const addBooking = booking => {
    if (!canAfford(booking.totalPrice)) return false;
    setBalance(b => b - booking.totalPrice);
    setBookings(b => [...b, booking]);
    return true;
  };

  return (
    <AccountContext.Provider
      value={{ user, updateUser, balance, topUp, bookings, addBooking, canAfford }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used inside AccountProvider");
  return ctx;
}
