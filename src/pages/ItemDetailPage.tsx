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

  if (isLoading) return <div className="p-6">Loading item details...</div>;
  if (error || !item) return <div className="p-6 text-red-500">Item not found.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto border rounded bg-white mt-6 shadow-sm">
      <Link to="/items" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Items
      </Link>
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <p className="text-gray-600 mt-2">Category: {item.category}</p>
      <p className="text-sm text-gray-500 mt-1">Status: {item.status}</p>
      <p className="text-xs text-gray-400 mt-4">ID: {item.id}</p>
    </div>
  );
}