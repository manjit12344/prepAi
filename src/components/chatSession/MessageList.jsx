import React from "react";
import MessageBubble from "./MessageBubble";

const MessageList = React.forwardRef(function MessageList(
  { messages, loading },
  bottomRef
) {
  return (
    <div>
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}

      {loading && <p>AI is thinking...</p>}

      <div ref={bottomRef} />
    </div>
  );
});

export default MessageList;
