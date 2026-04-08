import { useState } from "react";

export default function BalanceCard({ balance, topUp, refreshBalance }) {
  const [method, setMethod] = useState("free_money");
  const [amount, setAmount] = useState(100);
  const [sendReceipt, setSendReceipt] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTopUpClick = async () => {
    const finalAmount = method === "free_money" ? 100 : Number(amount);
    if (!Number.isFinite(finalAmount) || finalAmount <= 0) {
      setError("Введите корректную сумму");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await topUp(finalAmount);
      if (refreshBalance) {
        await refreshBalance();
      }
      setAmount(100);
      setSendReceipt(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Top-up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <fieldset className="card bg-base-300 p-4 flex-1 min-w-[250px] border border-base-content/20 rounded-box">
      <legend className="px-2 font-bold">Баланс</legend>

      <div className="text-xl font-semibold mb-3">{balance}$</div>

      <h3 className="font-bold mb-2">Пополнить баланс</h3>
      <select
        className="select select-bordered w-full mb-3"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="free_money">Free money (+100)</option>
        <option value="manual">Manual amount</option>
      </select>
      <input
        type="number"
        className="input input-bordered w-full mb-3"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        disabled={method === "free_money"}
      />
      <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          className="checkbox"
          checked={sendReceipt}
          onChange={e => setSendReceipt(e.target.checked)}
        />
        <span>Прислать чек на почту</span>
      </label>
      <button
        className="btn btn-sm btn-soft btn-primary w-full"
        onClick={handleTopUpClick}
        disabled={loading}
      >
        {loading ? "Пополнение..." : "Пополнить"}
      </button>
      {error ? <p className="text-error text-sm mt-2">{error}</p> : null}
    </fieldset>
  );
}
