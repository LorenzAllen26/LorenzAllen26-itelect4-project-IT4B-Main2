import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api, type Item } from "../api/client";

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: item, isLoading, error } = useQuery<Item, Error>({
    queryKey: ["items", id],
    queryFn: () => api.getItemById(id || ""),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-6 text-center">
        Loading item details...
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-black text-red-500 p-6 text-center">
        Item not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto border border-gray-800 rounded bg-gray-900/80 p-6 mt-6 shadow-md">
        <Link to="/items" className="text-blue-400 hover:underline mb-4 inline-block">
          &larr; Back to Items
        </Link>
        <h1 className="text-2xl font-bold text-white">{item.name}</h1>
        <p className="text-gray-300 mt-2">
          Category: <span className="text-white">{item.category}</span>
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Status: <span className="text-white">{item.status}</span>
        </p>
        <p className="text-xs text-gray-500 mt-4">ID: {item.id}</p>
      </div>
    </div>
  );
}