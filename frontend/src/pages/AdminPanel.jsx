import { useCallback, useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useAuth } from "../context/useAuth";
import {
  additionalServices,
  clubs,
  createAdditionalService,
  createClub,
  createComputer,
  createSeat,
  seats,
} from "../api/catalogApi";

function PanelCard({ title, children }) {
  return (
    <div className="card bg-base-200 border border-base-content/15 p-4">
      <h2 className="font-bold mb-3">{title}</h2>
      {children}
    </div>
  );
}

export default function AdminPanel() {
  const { token, user } = useAuth();
  const [clubName, setClubName] = useState("");
  const [clubAddress, setClubAddress] = useState("");
  const [seatClubId, setSeatClubId] = useState("");
  const [seatNumber, setSeatNumber] = useState(1);
  const [seatPrice, setSeatPrice] = useState(10);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState(5);
  const [computerSeatId, setComputerSeatId] = useState("");
  const [cpu, setCpu] = useState("Ryzen 5 5600");
  const [ram, setRam] = useState("16GB");
  const [gpu, setGpu] = useState("RTX 3060");
  const [os, setOs] = useState("Windows 11");
  const [clubsData, setClubsData] = useState([]);
  const [seatsData, setSeatsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    try {
      setError("");
      const [c, s, a] = await Promise.all([clubs(), seats(), additionalServices()]);
      setClubsData(c);
      setSeatsData(s);
      setServicesData(a);
      setSeatClubId((prev) => prev || c[0]?.id || "");
      setComputerSeatId((prev) => prev || s[0]?.id || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admin data");
    }
  }, []);

  useEffect(() => {
    Promise.resolve()
      .then(() => loadData())
      .catch(() => {});
  }, [loadData]);

  const submitCreateClub = async () => {
    try {
      setError("");
      setMessage("");
      await createClub({ name: clubName, address: clubAddress }, token);
      setClubName("");
      setClubAddress("");
      setMessage("Club created");
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "createClub failed");
    }
  };

  const submitCreateSeat = async () => {
    try {
      setError("");
      setMessage("");
      await createSeat(
        { number: Number(seatNumber), price: Number(seatPrice), clubId: seatClubId },
        token,
      );
      setMessage("Seat created");
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "createSeat failed");
    }
  };

  const submitCreateService = async () => {
    try {
      setError("");
      setMessage("");
      await createAdditionalService(
        {
          name: serviceName,
          description: serviceDescription,
          price: Number(servicePrice),
        },
        token,
      );
      setServiceName("");
      setServiceDescription("");
      setMessage("Additional service created");
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "createAdditionalService failed");
    }
  };

  const submitCreateComputer = async () => {
    try {
      setError("");
      setMessage("");
      await createComputer({ cpu, ram, gpu, os, seatId: computerSeatId }, token);
      setMessage("Computer created");
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "createComputer failed");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-6xl p-6 grid gap-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="opacity-80">Signed in as: {user?.email} ({user?.role})</p>
        {message ? <p className="text-success">{message}</p> : null}
        {error ? <p className="text-error">{error}</p> : null}

        <div className="grid md:grid-cols-2 gap-4">
          <PanelCard title="Create Club">
            <input
              className="input input-bordered w-full mb-2"
              placeholder="Name"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
            />
            <input
              className="input input-bordered w-full mb-2"
              placeholder="Address"
              value={clubAddress}
              onChange={(e) => setClubAddress(e.target.value)}
            />
            <button className="btn btn-primary w-full" onClick={submitCreateClub}>
              Create Club
            </button>
          </PanelCard>

          <PanelCard title="Create Seat">
            <select
              className="select select-bordered w-full mb-2"
              value={seatClubId}
              onChange={(e) => setSeatClubId(e.target.value)}
            >
              {clubsData.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="input input-bordered w-full mb-2"
              placeholder="Seat number"
              value={seatNumber}
              onChange={(e) => setSeatNumber(Number(e.target.value))}
            />
            <input
              type="number"
              className="input input-bordered w-full mb-2"
              placeholder="Price"
              value={seatPrice}
              onChange={(e) => setSeatPrice(Number(e.target.value))}
            />
            <button className="btn btn-primary w-full" onClick={submitCreateSeat}>
              Create Seat
            </button>
          </PanelCard>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <PanelCard title="Create Additional Service">
            <input
              className="input input-bordered w-full mb-2"
              placeholder="Name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
            <input
              className="input input-bordered w-full mb-2"
              placeholder="Description"
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
            />
            <input
              type="number"
              className="input input-bordered w-full mb-2"
              placeholder="Price"
              value={servicePrice}
              onChange={(e) => setServicePrice(Number(e.target.value))}
            />
            <button className="btn btn-primary w-full" onClick={submitCreateService}>
              Create Additional Service
            </button>
          </PanelCard>

          <PanelCard title="Create Computer">
            <select
              className="select select-bordered w-full mb-2"
              value={computerSeatId}
              onChange={(e) => setComputerSeatId(e.target.value)}
            >
              {seatsData.map((seat) => (
                <option key={seat.id} value={seat.id}>
                  Seat #{seat.number} ({seat.club?.name || "no club"})
                </option>
              ))}
            </select>
            <input
              className="input input-bordered w-full mb-2"
              value={cpu}
              onChange={(e) => setCpu(e.target.value)}
              placeholder="CPU"
            />
            <input
              className="input input-bordered w-full mb-2"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              placeholder="RAM"
            />
            <input
              className="input input-bordered w-full mb-2"
              value={gpu}
              onChange={(e) => setGpu(e.target.value)}
              placeholder="GPU"
            />
            <input
              className="input input-bordered w-full mb-2"
              value={os}
              onChange={(e) => setOs(e.target.value)}
              placeholder="OS"
            />
            <button className="btn btn-primary w-full" onClick={submitCreateComputer}>
              Create Computer
            </button>
          </PanelCard>
        </div>

        <PanelCard title="Current Data Snapshot">
          <p className="text-sm mb-2">Clubs: {clubsData.length}</p>
          <p className="text-sm mb-2">Seats: {seatsData.length}</p>
          <p className="text-sm">Additional Services: {servicesData.length}</p>
        </PanelCard>
      </div>
    </Layout>
  );
}
