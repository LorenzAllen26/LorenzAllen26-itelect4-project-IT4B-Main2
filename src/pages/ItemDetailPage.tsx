// src/pages/ItemDetailPage.tsx
import { useParams, useNavigate } from "react-router";
import ItemCard from "../components/ItemCard";
import { mockItems } from "../data/mockData";

function ItemDetailPage() {
  // Reads whatever is in the :id slot of the URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Turn that string into a real Item object
  // (item.id is a number, so we convert id to a number before comparing)
  const item = mockItems.find((i) => i.id === Number(id));

  // The URL is user input -- they can type anything. Handle that.
  if (item === undefined) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-300">
        No item found with id "{id}".
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {item.title}
      </h2>

      <div className="max-w-sm">
        <ItemCard item={item} />
      </div>

      <button
        onClick={() => navigate("/items")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Items
      </button>
    </div>
  );
}

export default ItemDetailPage;