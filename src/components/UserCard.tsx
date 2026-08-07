// src/components/UserCard.tsx
import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    onSelect(user);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">
        {user.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 my-1">
        {user.email}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 my-1">
        Role: {user.role}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 my-1">
        Status: {user.isActive ? "Active" : "Inactive"}
      </p>
      <button
        onClick={handleClick}
        className="mt-3 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
      >
        Select
      </button>
    </div>
  );
}

export default UserCard;