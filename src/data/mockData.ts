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
  { id: 1, title: "Blue Umbrella", description: "Found near the library entrance", category: "Personal item", location: "Library", reportedBy: student.id },
  { id: 2, title: "Black Wallet", description: "Found on a bench outside the cafeteria", category: "Personal item", location: "Cafeteria", reportedBy: student.id },
  { id: 3, title: "Blue Water Bottle", description: "Left behind in Room 204", category: "Drinkware", location: "Room 204", reportedBy: student.id },
  { id: 4, title: "Red Notebook", description: "Left on a desk in Room 305", category: "School supply", location: "Room 305", reportedBy: student.id },
  { id: 5, title: "Silver Earphones", description: "Found near the gymnasium entrance", category: "Electronics", location: "Gymnasium", reportedBy: student.id },
  { id: 6, title: "Green Jacket", description: "Left hanging on a chair in the computer lab", category: "Clothing", location: "Computer Lab", reportedBy: student.id },
  { id: 7, title: "Calculator", description: "Found under a desk in Room 101", category: "Electronics", location: "Room 101", reportedBy: student.id },
  { id: 8, title: "Yellow Cap", description: "Found near the parking lot", category: "Clothing", location: "Parking Lot", reportedBy: student.id },
  { id: 9, title: "Wireless Mouse", description: "Left on a table in the study area", category: "Electronics", location: "Study Area", reportedBy: student.id },
  { id: 10, title: "Purple Lunch Box", description: "Found beside the cafeteria vending machines", category: "Food container", location: "Cafeteria", reportedBy: student.id },
  { id: 11, title: "Student ID Card", description: "Found near the main building security desk", category: "Identification", location: "Main Building", reportedBy: student.id },
];

export const initialClaim: Claim = {
  id: 1,
  itemId: 1,
  claimedBy: student.id,
  notes: "This is mine -- has my initials on the strap",
  submittedAt: new Date(),
  status: ClaimStatus.Pending,
};
