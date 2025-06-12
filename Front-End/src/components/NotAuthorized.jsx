import React from "react";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "white",
        color: "#222",
        fontFamily:
          "'Comic Sans MS', 'Comic Sans', 'cursive', 'Open Sans', 'sans-serif'",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <h1
        style={{
          fontSize: 48,
          color: "#015CBB",
          marginBottom: 8,
          textShadow: "2px 2px 0 #e0e0e0",
        }}
      >
        🚫 403 - Access Denied
      </h1>

      <img
        src="https://media.giphy.com/media/10tIjpzIu8fe0/giphy.gif"
        alt="Anime facepalm"
        style={{
          width: 220,
          borderRadius: 16,
          boxShadow: "0 4px 24px #0002",
          marginBottom: 24,
        }}
      />

      <div
        style={{
          fontSize: 20,
          color: "#333",
          marginBottom: 24,
          fontWeight: 500,
        }}
      >
        Oops! You don't have permission to view this page.
        <br />
        <span style={{ color: "#015CBB", fontWeight: 600 }}>
          If you believe this is a mistake, please contact your administrator.
        </span>
      </div>

      <Link
        to="/"
        style={{
          marginTop: 16,
          display: "inline-block",
          background: "#015CBB",
          color: "#fff",
          padding: "12px 32px",
          borderRadius: 32,
          textDecoration: "none",
          fontWeight: 600,
          fontSize: 18,
          boxShadow: "0 2px 8px #0001",
          transition: "background 0.2s",
        }}
      >
        🏠 Go Back Home
      </Link>
      <div
        style={{
          marginTop: 32,
          fontSize: 16,
          color: "#666",
        }}
      >
        <em>"Access denied! But hey, at least you found the secret page."</em>
        <div style={{ fontSize: 24, marginTop: 8 }}>😅🔒🚫</div>
      </div>
    </div>
  );
};

export default NotAuthorized;
