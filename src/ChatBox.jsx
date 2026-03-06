import React, { useState, useRef, useEffect } from "react";
import { sendMessage } from "./api";
import Message from "./Message";

const ChatBox = ({ chat, chats, setChats }) => {

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  

  // Auto scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);
   if (!chat) return null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    const updatedMessages = [...chat.messages, userMessage];
    updateChatMessages(updatedMessages);

try {
  const res = await sendMessage({
    user_id: "user123",
    message: input
  });

  const botMessage = {
    sender: "bot",
    text: res.response
  };

  updateChatMessages([...updatedMessages, botMessage]);

} catch (err) {
  console.error(err);
}
 

    setInput("");
  };

  const updateChatMessages = (messages) => {
    const updatedChats = chats.map(c =>
      c.id === chat.id ? { ...c, messages } : c
    );

    setChats(updatedChats);
  };

  // ENTER KEY SEND
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      handleSend();
    }
  };

  return (
    <div className="chat-container">

      {/* Messages */}
      <div className="chat-box">
        {chat.messages.map((msg, index) => (
          <Message key={index} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="input-box">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type message..."
          rows={1}
        />
        <button onClick={handleSend}>Send</button>
      </div>

    </div>
  );
};

export default ChatBox;