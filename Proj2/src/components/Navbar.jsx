import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "../components/auth/AuthModal";
import { useAuth } from "../auth/AuthContext";

const brand = "#681a75";
const brandHover = "#7B1FA2";

const btn = {
  background: brand,
  color: "#fff",
  padding: "8px 14px",
  borderRadius: 10,
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
};

const Navbar = () => {
  const location = useLocation();
  const { isAuthed, user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  // Close modal automatically after a successful login (email or Google)
  useEffect(() => {
    if (showAuth && isAuthed) setShowAuth(false);
  }, [isAuthed, showAuth]);

  return (
    <>
      <nav className="navbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px" }}>
        <h1>🏘️ NeighborhoodPool</h1>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          <Link to="/nearby-orders" className={location.pathname === "/nearby-orders" ? "active" : ""}>Nearby Orders</Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isAuthed ? (
            <>
              <span style={{ color: "#fff", opacity: 0.9 }}>
                Hi, {user?.displayName || user?.email?.split("@")[0]}
              </span>
              <button
                onClick={logout}
                style={btn}
                onMouseEnter={(e) => (e.currentTarget.style.background = brandHover)}
                onMouseLeave={(e) => (e.currentTarget.style.background = brand)}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              style={btn}
              onMouseEnter={(e) => (e.currentTarget.style.background = brandHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = brand)}
            >
              Login / Sign up
            </button>
          )}
        </div>
      </nav>

      {/* Auth modal available on every page */}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};

export default Navbar;
