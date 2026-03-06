import React from "react";

const Message = ({ msg }) => {
  return (
    <div className={`message ${msg.sender}`}>
      <div
        className="message-text"
        dangerouslySetInnerHTML={{ __html: msg.text }}
      />
    </div>
  );
};

export default Message;