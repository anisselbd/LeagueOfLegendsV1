import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/League_of_Legends_icon.svg";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Fermer le menu si clic en dehors
  useEffect(() => {
    function handleClick(e) {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <header className="header">
      <div className="header-flex">
        <Link to="/" className="logo-area">
          <img src={logo} alt="LoL Logo" className="logo-icon" />
        </Link>
        <div className="header-center">
          <span className="logo-text">League <span>of </span>Legends</span>
        </div>
        <div className="header-side">
          <nav className="nav" ref={menuRef}>
            <button
              className="dropdown-toggle"
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              style={{
                background: "none",
                border: "none",
                color: "var(--muted)",
                fontWeight: 500,
                fontSize: 18,
                cursor: "pointer",
                padding: "4px 12px",
                borderRadius: 6,
                outline: "none"
              }}
            >
              Menu ▾
            </button>
            {open && (
              <div className="dropdown-menu">
                <NavLink to="/" end onClick={() => setOpen(false)}>Accueil</NavLink>
                <NavLink to="/champions" end onClick={() => setOpen(false)}>Champions</NavLink>
                <NavLink to="/regions" onClick={() => setOpen(false)}>Régions</NavLink>
                <NavLink to="/quiz" onClick={() => setOpen(false)}>Quiz</NavLink>
                <NavLink to="/summoner" onClick={() => setOpen(false)}>Invocateur</NavLink>
                <NavLink to="/items" onClick={() => setOpen(false)}>Items</NavLink>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}