import { useState } from "react";

export default function useMockBooking() {
  const [booking, setBooking] = useState({
    clubId: "",
    date: "",
    startTime: "",
    seatIds: [],
    additionalServiceIds: [],
  });

  const updateBooking = data =>
    setBooking(b => ({ ...b, ...data }));

  return { booking, updateBooking };
}
