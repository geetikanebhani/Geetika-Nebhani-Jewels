
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    function handleCartUpdate(event) {
      setItems(event.detail?.cart ?? []);
    }

    window.addEventListener(
      "jewellery-cart-updated",
      handleCartUpdate
    );

    window.dispatchEvent(
      new CustomEvent("jewellery-cart-request")
    );

    return () => {
      window.removeEventListener(
        "jewellery-cart-updated",
        handleCartUpdate
      );
    };
  }, []);

  function addItem(item) {
    window.dispatchEvent(
      new CustomEvent("jewellery-cart-add-request", {
        detail: { id: item.id },
      })
    );
  }

  function removeItem(id) {
    window.dispatchEvent(
      new CustomEvent("jewellery-cart-remove-request", {
        detail: { id },
      })
    );
  }

  const totalItems = items.reduce(
    (total, item) => total + item.qty,
    0
  );

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <AppContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext must be used inside AppProvider"
    );
  }

  return context;
}
