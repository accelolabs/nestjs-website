import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import TuxIcon from "../icons/TuxIcon";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar px-4 py-2 shadow bg-base-300">
      <div className="navbar-start">
        <Link to="/" className="flex items-center">
          <TuxIcon className="w-10 h-10" />
          <span className="ml-2 font-bold">Linux Computer Club</span>
        </Link>
      </div>

      <div className="navbar-end hidden md:flex gap-2">
        {user ? (
          <>
            <Link to="/dashboard" className="btn btn-ghost btn-sm">
              Личный кабинет
            </Link>
            <Link to="/booking" className="btn btn-ghost btn-sm">
              Бронирование
            </Link>
            <button className="btn btn-ghost btn-sm" onClick={logout}>
              Выход
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-secondary btn-sm">
            Войти
          </Link>
        )}
      </div>

      {user && (
        <div className="navbar-end md:hidden">
          <div className="dropdown dropdown-end">
            <label className="btn btn-circle swap swap-rotate">
              <input
                type="checkbox"
                checked={open}
                onChange={() => setOpen(v => !v)}
              />
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>

            {open && (
              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-48">
                <li>
                  <Link to="/dashboard" onClick={() => setOpen(false)}>
                    Личный кабинет
                  </Link>
                </li>
                <li>
                  <Link to="/booking" onClick={() => setOpen(false)}>
                    Бронирование
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                  >
                    Выход
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}

      {!user && (
        <div className="navbar-end md:hidden">
          <Link to="/login" className="btn btn-secondary btn-sm">
            Войти
          </Link>
        </div>
      )}
    </div>
  );
}
