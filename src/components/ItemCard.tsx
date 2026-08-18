import type { Item } from "../types/index";

interface ItemCardProps {
  item: Item;
  variant?: "default" | "compact";
}

function ItemCard({ item, variant = "default" }: ItemCardProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 ${
        isCompact ? "p-3" : "p-5"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3
          className={`flex items-center gap-1 font-semibold text-gray-900 dark:text-gray-100 ${
            isCompact ? "mb-1 text-sm" : "mb-3 text-base"
          }`}
        >
          🧳 {item.title}
        </h3>
      </div>

      {!isCompact && item.description && (
        <p className="my-1 text-sm text-gray-600 dark:text-gray-300">
          {item.description}
        </p>
      )}

      {item.category && (
        <p
          className={`my-1 text-gray-500 dark:text-gray-400 ${
            isCompact ? "text-xs" : "text-sm"
          }`}
        >
          Category: {item.category}
        </p>
      )}

      {item.location && (
        <p
          className={`my-1 text-gray-500 dark:text-gray-400 ${
            isCompact ? "text-xs" : "text-sm"
          }`}
        >
          Location: {item.location}
        </p>
      )}

      {!isCompact && item.reportedBy && (
        <p className="my-1 text-sm text-gray-500 dark:text-gray-400">
          Reported by User #{item.reportedBy}
        </p>
      )}
    </div>
  );
}

export default ItemCard;