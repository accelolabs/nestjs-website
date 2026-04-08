import { useState } from "react";

export default function BalanceCard({ balance, topUp }) {
  const [amount, setAmount] = useState(0);
  const [sendReceipt, setSendReceipt] = useState(false);

  const submitTopUp = () => {
    topUp(amount);
    setAmount(0);
    setSendReceipt(false);
  };

  return (
    <fieldset className="card bg-base-300 p-4 flex-1 min-w-[250px] border border-base-content/20 rounded-box">
      <legend className="px-2 font-bold">Баланс</legend>

      <div className="text-xl font-semibold mb-3">{balance}$</div>

      <h3 className="font-bold mb-2">Пополнить баланс</h3>
      <select className="select select-bordered w-full mb-3">
        <option>Free money</option>
      </select>
      <input
        type="number"
        className="input input-bordered w-full mb-3"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
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
      <button className="btn btn-sm btn-soft btn-primary w-full" onClick={submitTopUp}>
        Пополнить
      </button>
    </fieldset>
  );
}
