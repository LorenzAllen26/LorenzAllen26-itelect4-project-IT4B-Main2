// src/pages/ItemsPage.tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import type { Item } from "../types/index";
import ItemCard from "../components/ItemCard";
import usePrevious from "../hooks/usePrevious";
import { mockItems } from "../data/mockData";

function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearch = usePrevious(searchTerm);

  useEffect(() => {
    setTimeout(() => {
      setItems(mockItems);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      searchInputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => setSearchTerm(e.target.value);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          Loading items...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 text-red-700 dark:text-red-300 text-sm">
        ⚠️ Could not load items.
        <button
          onClick={() => setIsError(false)}
          className="block mt-3 px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Items</h2>

      <button
        onClick={() => setIsError(true)}
        className="self-start px-3 py-1.5 rounded-md bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-medium"
      >
        Simulate Error
      </button>

      <input
        ref={searchInputRef}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search items..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
      />

      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Previous search: "{previousSearch}"
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, index) => (
          <Link key={item.id} to={`/items/${item.id}`}>
            <ItemCard item={item} variant={index === 0 ? "default" : "compact"} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ItemsPage;