// src/data/mockData.ts
import type { User, Item, Claim } from "../types/index";
import { Role, ClaimStatus } from "../types/index";

export const student: User = {
  id: 1,
  name: "Lorenz Allen Biscocho",
  email: "lorenzallen@gmail.com",
  role: Role.Student,
  isActive: true,
};

export const mockItems: Item[] = [
  { id: 1, title: "Blue Umbrella", description: "Found near the library entrance", location: "Library", reportedBy: student.id },
  { id: 2, title: "Black Wallet", description: "Found on a bench outside the cafeteria", location: "Cafeteria", reportedBy: student.id },
  { id: 3, title: "Blue Water Bottle", description: "Left behind in Room 204", location: "Room 204", reportedBy: student.id },
  { id: 4, title: "Red Notebook", description: "Left on a desk in Room 305", location: "Room 305", reportedBy: student.id },
  { id: 5, title: "Silver Earphones", description: "Found near the gymnasium entrance", location: "Gymnasium", reportedBy: student.id },
  { id: 6, title: "Green Jacket", description: "Left hanging on a chair in the computer lab", location: "Computer Lab", reportedBy: student.id },
  { id: 7, title: "Calculator", description: "Found under a desk in Room 101", location: "Room 101", reportedBy: student.id },
  { id: 8, title: "Yellow Cap", description: "Found near the parking lot", location: "Parking Lot", reportedBy: student.id },
  { id: 9, title: "Wireless Mouse", description: "Left on a table in the study area", location: "Study Area", reportedBy: student.id },
];

export const initialClaim: Claim = {
  id: 1,
  itemId: 1,
  claimedBy: student.id,
  notes: "This is mine -- has my initials on the strap",
  submittedAt: new Date(),
  status: ClaimStatus.Pending,
};