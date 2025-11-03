// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const brand = "#681a75";
const brandHover = "#7B1FA2";

const btn = {
  background: brand,
  color: "#fff",
  padding: "1rem 2rem",
  borderRadius: 12,
  textDecoration: "none",
  fontSize: "1.1rem",
  display: "inline-block",
  transition: "background-color .2s ease",
  border: "none",
  outline: "none",
  boxShadow: "none",
};

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1100,
          margin: "0 auto 24px",
          padding: "24px 24px 0",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.6rem", letterSpacing: 0.3 }}>
          NeighborhoodPool
        </h1>
        {/* Auth controls are now in Navbar */}
      </header>

      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <h2 style={{ marginTop: 8, marginBottom: 8, fontSize: "1.4rem" }}>
          Welcome to NeighborhoodPool
        </h2>
        <p style={{ marginTop: 0, opacity: 0.9 }}>
          Location-based pooled order management to save time and trips.
        </p>

        <div style={{ marginTop: "2.5rem" }}>
          <Link
            to="/nearby-orders"
            style={btn}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = brandHover)
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = brand)}
          >
            View Nearby Orders →
          </Link>
        </div>
      </main>
    </div>
  );
}
