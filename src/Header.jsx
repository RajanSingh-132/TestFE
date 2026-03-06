import React from "react";

function Header({ toggleSidebar }) {
  return (
    <div className="header">

      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <h2>AI Chatbot</h2>

    </div>
  );
}

export default Header;