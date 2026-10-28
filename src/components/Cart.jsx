
import { useAppContext } from "../context/AppContext.jsx";

export default function Cart() {
  const { items, removeItem, totalItems, totalPrice } =
    useAppContext();

  return (
    <section
      style={{
        maxWidth: "850px",
        margin: "24px auto",
        padding: "24px",
        border: "1px solid #ead2c4",
        borderRadius: "16px",
        background: "#fffafa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ color: "#a20c43" }}>
        Experiment 3 — Shared Cart State
      </h2>

      <p>Total items in your existing bag: {totalItems}</p>

      {items.length === 0 ? (
        <p>
          Your bag is empty. Add an item using the original
          jewellery storefront above.
        </p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 0",
                borderBottom: "1px solid #ead2c4",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <div style={{ flex: 1 }}>
                <strong>{item.name}</strong>
                <p>
                  ₹{item.price.toLocaleString("en-IN")} ×{" "}
                  {item.qty}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  padding: "8px 12px",
                  color: "#a20c43",
                  border: "1px solid #a20c43",
                  borderRadius: "20px",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>
            Total: ₹{totalPrice.toLocaleString("en-IN")}
          </h3>
        </>
      )}
    </section>
  );
}
