// src/App.tsx
import "./App.css";
import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimBadge from "./components/ClaimBadge";
import type { User, Item, Claim } from "./types/index";
import { Role } from "./types/index";

const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: Role.Student,
  isActive: true,
};

const foundItem: Item = {
  id: 1,
  title: "Blue Umbrella",
  description: "Found near the library entrance",
  location: "Library",
  reportedBy: student.id,
};

const claim: Claim = {
  id: 1,
  itemId: foundItem.id,
  claimedBy: student.id,
  notes: "This is mine -- has my initials on the strap",
  submittedAt: new Date().toISOString(), // 💡 Fixed: Converts the Date object into a string matching your interface
};

function App() {
  return (
    <div className="app">
      <UserCard
        user={student}
        onSelect={(u) => console.log("Selected user:", u)}
      />
      <ItemCard item={foundItem} />
      <ClaimBadge
        claim={claim}
        onStatusChange={(claimId, status) =>
          console.log(`Claim ${claimId} status changed to:`, status)
        }
      >
        <p>Awaiting review</p>
      </ClaimBadge>
    </div>
  );
}

export default App;
