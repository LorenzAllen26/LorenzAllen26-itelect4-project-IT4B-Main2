// src/App.tsx
import "./App.css";
import { useState, useEffect, useRef } from "react";
import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimBadge from "./components/ClaimBadge";
import type { User, Item, Claim } from "./types/index";
import { Role, ClaimStatus } from "./types/index";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

// ===== MOCK DATA (still hard-coded here -- items themselves move into state below) =====
const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
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
];

const claim: Claim = {
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
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [showDetails, toggleDetails] = useToggle(false);
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
  ): void => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="app">
        <p className="loading-text">Loading items...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <UserCard user={student} onSelect={setSelectedUser} />
      {selectedUser && (
        <p className="selected-note">Selected: {selectedUser.name}</p>
      )}

      <input
        ref={searchInputRef}
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search items..."
        className="search-input"
      />

      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p className="previous-search">Previous search: "{previousSearch}"</p>
      )}

      <button className="toggle-button" onClick={toggleDetails}>
        {showDetails ? "Hide" : "Show"} Item Details
      </button>

      {showDetails &&
        filteredItems.map((item) => <ItemCard key={item.id} item={item} />)}

      <ClaimBadge
        claim={claim}
        onStatusChange={(claimId, status) =>
          console.log(`Claim ${claimId} status changed to:`, status)
        }
      >
        <p>Awaiting review</p>
      </ClaimBadge>

      <footer className="app-footer">
        <a href="https://github.com/LorenzAllen26/ITELECT4_Session3_React_TypeScript_Components" target="_blank" rel="noreferrer">View on GitHub</a>
      </footer>
    </div>
  );
}

export default App;