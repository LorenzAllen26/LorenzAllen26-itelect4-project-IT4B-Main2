// src/App.tsx
import { useState, useEffect, useRef } from "react";
import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimBadge from "./components/ClaimBadge";
import type { User, Item, Claim } from "./types/index";
import { Role, ClaimStatus } from "./types/index";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

// ===== MOCK DATA =====
const student: User = {
  id: 1,
  name: "Lorenz Allen Biscocho",
  email: "lorenzallen@gmail.com",
  role: Role.Student,
  isActive: true,
};

const mockItems: Item[] = [
  {
    id: 1,
    title: "Blue Umbrella",
    description: "Found near the library entrance",
    location: "Library",
    reportedBy: student.id,
  },
  {
    id: 2,
    title: "Black Wallet",
    description: "Found on a bench outside the cafeteria",
    location: "Cafeteria",
    reportedBy: student.id,
  },
  {
    id: 3,
    title: "Blue Water Bottle",
    description: "Left behind in Room 204",
    location: "Room 204",
    reportedBy: student.id,
  },
  {
    id: 4,
    title: "Red Notebook",
    description: "Left on a desk in Room 305",
    location: "Room 305",
    reportedBy: student.id,
  },
  {
    id: 5,
    title: "Silver Earphones",
    description: "Found near the gymnasium entrance",
    location: "Gymnasium",
    reportedBy: student.id,
  },
  {
    id: 6,
    title: "Green Jacket",
    description: "Left hanging on a chair in the computer lab",
    location: "Computer Lab",
    reportedBy: student.id,
  },
  {
    id: 7,
    title: "Calculator",
    description: "Found under a desk in Room 101",
    location: "Room 101",
    reportedBy: student.id,
  },
];

const initialClaim: Claim = {
  id: 1,
  itemId: 1,
  claimedBy: student.id,
  notes: "This is mine -- has my initials on the strap",
  submittedAt: new Date(),
  status: ClaimStatus.Pending,
};

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [claim, setClaim] = useState<Claim>(initialClaim);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  // ===== Load mock items on mount =====
  useEffect(() => {
    setTimeout(() => {
      setItems(mockItems);
      setIsLoading(false);
    }, 500);
  }, []);

  // ===== Apply/remove the "dark" class on <html> for Tailwind class-based dark mode =====
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    if (!isLoading) {
      searchInputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (_claimId: number, status: ClaimStatus): void => {
    setClaim((prev) => ({ ...prev, status }));
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== Styled early-return states =====
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          Loading items...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="max-w-sm w-full rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 text-red-700 dark:text-red-300 text-sm text-center">
          ⚠️ Could not load items. Please try again.
          <button
            onClick={() => setIsError(false)}
            className="block mx-auto mt-3 px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-5">
        {/* ===== Header with dark mode + simulate error buttons ===== */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            Lost &amp; Found
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsError(true)}
              className="px-3 py-1.5 rounded-md bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
            >
              Simulate Error
            </button>
            <button
              onClick={toggleDarkMode}
              className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>

        <UserCard user={student} onSelect={setSelectedUser} />
        {selectedUser && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Selected: {selectedUser.name}
          </p>
        )}

        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search items..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Previous search: "{previousSearch}"
          </p>
        )}

        <button
          onClick={toggleDetails}
          className="self-center px-4 py-2 rounded-md border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 text-sm font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors"
        >
          {showDetails ? "Hide" : "Show"} Item Details
        </button>

        {/* ===== Responsive grid: 1 col mobile, 2 cols sm, 3 cols lg ===== */}
        {showDetails && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item, index) => (
              <ItemCard
                key={item.id}
                item={item}
                variant={index === 0 ? "default" : "compact"}
              />
            ))}
          </div>
        )}

        <ClaimBadge claim={claim} onStatusChange={handleStatusChange}>
          Awaiting review
        </ClaimBadge>

        <footer className="text-center pt-2">
          <a
            href="https://github.com/LorenzAllen26/ITELECT4_Session3_React_TypeScript_Components"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 underline-offset-2 hover:underline transition-colors"
          >
            View on GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;