import React, { useState } from "react";
import ChatBox from "./ChatBox";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./style.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [chats, setChats] = useState([
    {
      id: 1,
      title: "New Chat",
      messages: []
    }
  ]);

  const [activeChatId, setActiveChatId] = useState(1);

  /* ================= TOGGLE SIDEBAR ================= */
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  /* ================= CREATE NEW CHAT ================= */
  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: []
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  /* ================= ACTIVE CHAT ================= */
  const activeChat = chats.find(c => c.id === activeChatId);

  return (
    <div className="app-container">

      <Sidebar
        sidebarOpen={sidebarOpen}
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        setChats={setChats}  
        createNewChat={createNewChat}
        userName="Rajan"
      />

      <div className="main-content">

        <Header toggleSidebar={toggleSidebar} />

        <ChatBox
          chat={activeChat}
          chats={chats}
          setChats={setChats}
        />

      </div>

    </div>
  );
}

export default App;