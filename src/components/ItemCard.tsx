// src/components/ItemCard.tsx
import type { Item } from "../types/index";

interface ItemCardProps {
  item: Item;
  variant?: "default" | "compact";
}

function ItemCard({ item, variant = "default" }: ItemCardProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm ${
        isCompact ? "p-3" : "p-5"
      }`}
    >
      <h3
        className={`font-semibold text-gray-900 dark:text-gray-50 flex items-center gap-1 ${
          isCompact ? "text-sm mb-1" : "text-base mb-3"
        }`}
      >
        🧳 {item.title}
      </h3>
      {!isCompact && (
        <p className="text-sm text-gray-500 dark:text-gray-400 my-1">
          {item.description}
        </p>
      )}
      <p
        className={`text-gray-500 dark:text-gray-400 my-1 ${
          isCompact ? "text-xs" : "text-sm"
        }`}
      >
        Location: {item.location}
      </p>
      {!isCompact && (
        <p className="text-sm text-gray-500 dark:text-gray-400 my-1">
          Reported by User #{item.reportedBy}
        </p>
      )}
    </div>
  );
}

export default ItemCard;