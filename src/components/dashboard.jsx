
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Dashboard() {
  const user = useContext(UserContext);

  return (
    <section className="mt-8 border-t border-rose-200 pt-6">
      <h2 className="text-xl font-semibold text-rose-700">
        Customer Information
      </h2>

      <p className="mt-2">Welcome, {user.name}</p>
      <p>Role: {user.role}</p>
    </section>
  );
}
