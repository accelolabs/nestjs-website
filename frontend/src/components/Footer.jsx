import TuxIcon from "../icons/TuxIcon";

export default function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-base-300">
      <div className="flex items-center gap-2">
        <TuxIcon className="w-6 h-6" />
        <span className="font-semibold">Linux Computer Club</span>
      </div>
    </footer>
  );
}
