
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const products = [
  { id: 1, name: "Royal Necklace", price: 24999 },
  { id: 2, name: "Designer Earrings", price: 8499 },
  { id: 3, name: "Designer Rings", price: 5999 },
];

export default function Products() {
  const { addItem } = useContext(AppContext);

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-rose-700">
        Jewellery Products
      </h2>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-xl border border-rose-200 bg-white p-4"
          >
            <h3 className="font-semibold">{product.name}</h3>

            <p className="mt-2">₹{product.price.toLocaleString("en-IN")}</p>

            <button
              onClick={() => addItem(product)}
              className="mt-3 rounded-full bg-rose-600 px-4 py-2 text-white"
            >
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
