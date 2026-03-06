import React, { useState, useEffect, useRef } from "react";

function Sidebar({
  sidebarOpen,
  chats = [],
  activeChatId,
  setActiveChatId,
  setChats,
  createNewChat,
  userName = "Rajan"
}) {
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const wrapperRef = useRef(null);

  // ✅ NEW: Scroll control refs
  const listRef = useRef(null);
  const scrollPosition = useRef(0);

  /* ================= CLOSE MENU WHEN CLICK ANYWHERE ================= */
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ================= PRESERVE SCROLL ================= */
  const handleScroll = () => {
    if (listRef.current) {
      scrollPosition.current = listRef.current.scrollTop;
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = scrollPosition.current;
    }
  }, [chats]); // restore after chats update

  /* ================= DELETE ================= */
  const deleteChat = (id) => {
    const filtered = chats.filter(chat => chat.id !== id);
    setChats(filtered);
    setMenuOpenId(null);

    if (activeChatId === id && filtered.length > 0) {
      setActiveChatId(filtered[0].id);
    }
  };

  /* ================= COPY ================= */
  const copyChat = (title) => {
    navigator.clipboard.writeText(title);
    setMenuOpenId(null);
  };

  /* ================= EDIT START ================= */
  const startEdit = (chat, title) => {
    setEditingId(chat.id);
    setEditValue(title);
    setMenuOpenId(null);
  };

  /* ================= SAVE EDIT ================= */
  const saveEdit = (id) => {
    const updated = chats.map(chat =>
      chat.id === id
        ? { ...chat, customTitle: editValue }
        : chat
    );

    setChats(updated);
    setEditingId(null);
  };

  return (
    <div
      ref={wrapperRef}
      className={`sidebar ${sidebarOpen ? "open" : "closed"}`}
    >
      {/* LOGO */}
      <div className="logo">🤖 Smart AI</div>

      {/* NEW CHAT */}
      <button className="new-chat-btn" onClick={createNewChat}>
        + New Chat
      </button>

      {/* CHAT LIST */}
      <div
        className="chat-list"
        ref={listRef}
        onScroll={handleScroll}
      >
        {chats.map(chat => {

          const messages = chat.messages || [];

          const firstText =
            messages[0]?.text ||
            messages[0]?.content ||
            "New Chat";

          const autoTitle = firstText.slice(0, 25);

          const title = chat.customTitle || autoTitle;

          const lastMsg =
            messages[messages.length - 1]?.text ||
            messages[messages.length - 1]?.content ||
            "New conversation";

          return (
            <div
              key={chat.id}
              className={`chat-item ${
                chat.id === activeChatId ? "active" : ""
              }`}
              onClick={() => setActiveChatId(chat.id)}
            >

              {editingId === chat.id ? (
                <input
                  className="edit-input"
                  value={editValue}
                  autoFocus
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => saveEdit(chat.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(chat.id);
                  }}
                />
              ) : (
                <>
                  <div className="chat-title">💬 {title}</div>
                  <div className="chat-preview">
                    {lastMsg.slice(0, 30)}
                  </div>
                </>
              )}

              {/* MENU BUTTON */}
              <div
                className="menu-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpenId(
                    menuOpenId === chat.id ? null : chat.id
                  );
                }}
              >
                ⋮
              </div>

              {/* MENU */}
              {menuOpenId === chat.id && (
                <div
                  className="chat-menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div onClick={() => startEdit(chat, title)}>
                    ✏ Edit
                  </div>

                  <div onClick={() => copyChat(title)}>
                    📋 Copy
                  </div>

                  <div
                    className="delete"
                    onClick={() => deleteChat(chat.id)}
                  >
                    🗑 Delete
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* USER */}
      <div className="sidebar-user">
        <div className="avatar">
          {userName.charAt(0).toUpperCase()}
        </div>

        <div>
          <div className="username">{userName}</div>
          <div className="status">Online</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
