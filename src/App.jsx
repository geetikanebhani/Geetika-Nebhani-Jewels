
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext.jsx";
import useDocumentTitle from "./hooks/useDocumentTitle.js";
import Cart from "./components/Cart.jsx";
import Chat from "./components/Chat.jsx";

export default function App() {
  const user = useContext(UserContext);
  const [count, setCount] = useState(0);

  const [backendMessage, setBackendMessage] = useState(
    "Checking backend connection..."
  );

  useDocumentTitle(`Geetika Nebhani Jewels - ${count}`);

  // Experiment 2: React Hooks
  useEffect(() => {
    console.log("React experiments mounted");

    return () => {
      console.log("React experiments unmounted");
    };
  }, []);

  // Experiment 7: Backend connection test
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend request failed");
        }
        return response.text();
      })
      .then((message) => {
        setBackendMessage(message);
      })
      .catch((error) => {
        console.error("Backend connection error:", error);
        setBackendMessage("Backend connection failed");
      });
  }, []);

  return (
    <div>
      {/* Experiment 2: React Hooks Dashboard */}
      <section
        style={{
          padding: "36px 20px",
          background: "#fff8f7",
          borderTop: "1px solid #f0d5d5",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            maxWidth: "850px",
            margin: "0 auto",
            padding: "32px",
            background: "#ffffff",
            border: "1px solid #ead2c4",
            borderRadius: "18px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#a67c52", letterSpacing: "3px" }}>
            EXPERIMENT 2 · REACT HOOKS
          </p>

          <h2 style={{ color: "#a20c43", fontSize: "30px" }}>
            Jewellery Dashboard
          </h2>

          <p>Welcome back, {user?.name || "Geetika"}</p>

          <p style={{ fontSize: "36px", color: "#a20c43" }}>
            {count}
          </p>

          <button onClick={() => setCount((n) => n + 1)}>
            Increase Counter
          </button>{" "}

          <button onClick={() => setCount(0)}>
            Reset
          </button>

          <p>Course: {user?.course || "IT"}</p>
        </div>
      </section>

      
      
      {/* Experiment 3: Context API Shared Cart */}
      <Cart />



      {/* Experiment 8: Real-Time Chat */}
      <Chat />


      {/* Experiment 7: Docker Backend Status */}
      <section
        style={{
          margin: "30px auto",
          padding: "24px",
          maxWidth: "850px",
          textAlign: "center",
          background: "#fff8f7",
          border: "1px solid #ead2c4",
          borderRadius: "12px",
          fontFamily: "Georgia, serif",
        }}
      >
        <p style={{ color: "#a67c52", letterSpacing: "2px" }}>
          EXPERIMENT 7 · DOCKER
        </p>

        <h2 style={{ color: "#a20c43" }}>
          Backend Connection Status
        </h2>

        <p>{backendMessage}</p>
      </section>
    </div>
  );
}
