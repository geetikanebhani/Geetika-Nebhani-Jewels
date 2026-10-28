
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5002";

export default function Chat() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("connect_error", (error) => {
  console.error("Socket.IO connection error:", error.message);
});

    socket.on("chatMessage", (data) => {
      setMessages((previous) => [...previous, data]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  function sendMessage(event) {
    event.preventDefault();

    if (!username.trim() || !message.trim() || !socketRef.current) {
      return;
    }

    socketRef.current.emit("chatMessage", {
      username: username.trim(),
      message: message.trim(),
      time: new Date().toLocaleTimeString()
    });

    setMessage("");
  }

  return (
    <section style={{
      maxWidth: "700px",
      margin: "40px auto",
      padding: "24px",
      border: "1px solid #ead2c4",
      borderRadius: "16px",
      fontFamily: "Georgia, serif",
      background: "#fff8f7"
    }}>
      <h2 style={{ textAlign: "center", color: "#a20c43" }}>
        Geetika Nebhani Jewels — Live Chat
      </h2>

      <p style={{ textAlign: "center" }}>
        Status:{" "}
        <strong style={{ color: connected ? "green" : "red" }}>
          {connected ? "Connected" : "Connecting..."}
        </strong>
      </p>

      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter your name"
        aria-label="Your name"
        style={{ width: "100%", padding: "12px", boxSizing: "border-box" }}
      />

      <div style={{
        height: "240px",
        overflowY: "auto",
        background: "white",
        padding: "12px",
        margin: "16px 0",
        borderRadius: "8px"
      }}>
        {messages.map((item, index) => (
          <p key={`${item.time}-${index}`}>
            <strong>{item.username}:</strong> {item.message}
            <small style={{ display: "block", color: "#777" }}>
              {item.time}
            </small>
          </p>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type a message..."
          aria-label="Chat message"
          style={{
            width: "100%",
            padding: "12px",
            boxSizing: "border-box",
            marginBottom: "12px"
          }}
        />

        <button
          type="submit"
          disabled={!connected}
          style={{
            padding: "12px 24px",
            background: "#a20c43",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
