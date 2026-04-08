import { useState } from "react";

const itmoAddresses = [
  { address: "Кронверский проспект, 49, Санкт-Петербург", name: "Клуб Кронва" },
  { address: "Улица Ломоносова 9, Санкт-Петербург", name: "Клуб Ломо" },
  { address: "Биржевая Линия, 14-16, Санкт-Петербург", name: "Клуб Биржа" },
];

const distributions = [
  { name: "Arch", price: 20 },
  { name: "Debian", price: 15 },
  { name: "Ubuntu", price: 10 },
];

function generateSeats() {
  const seats = [];
  for (let i = 1; i <= 16; i++) {
    const dist = distributions[Math.floor(Math.random() * distributions.length)];
    const occupied = Math.random() < 0.4;
    seats.push({
      id: i,
      name: dist.name,
      price: dist.price,
      occupied,
    });
  }
  return seats;
}

export function useMockClubs() {
  const [clubs] = useState(() =>
    itmoAddresses.map((loc, i) => ({
      id: i + 1,
      name: loc.name,
      address: loc.address,
      seats: generateSeats()
    }))
  );

  return clubs;
}
