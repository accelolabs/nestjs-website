import { useState } from "react";

export default function useMockBooking() {
  const [booking, setBooking] = useState({
    club: null,
    date: "",
    startTime: "",
    hours: 1,
    seats: []
  });

  const updateBooking = data =>
    setBooking(b => ({ ...b, ...data }));

  return { booking, updateBooking };
}
