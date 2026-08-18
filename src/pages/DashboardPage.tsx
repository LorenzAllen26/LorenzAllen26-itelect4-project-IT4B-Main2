import { useState } from "react";
import type { User } from "../types/index";
import UserCard from "../components/UserCard";
import useToggle from "../hooks/useToggle";
import { student } from "../data/mockData";

function DashboardPage() {
  // These two came straight from Session 5's App.tsx, unchanged
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetails, toggleDetails] = useToggle(false);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UserCard user={student} onSelect={setSelectedUser} />
      </div>

      <button
        onClick={toggleDetails}
        className="mt-6 rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
      >
        {showDetails ? "Hide" : "Show"} Details
      </button>

      {showDetails && selectedUser !== null && (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
          Selected: <span className="font-semibold">{selectedUser.name}</span> ({selectedUser.role})
        </div>
      )}
    </div>
  );
}

export default DashboardPage;