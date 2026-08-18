import type { User, Claim } from "../types/index";
import { Role } from "../types/index";

export const student: User = {
  id: 1,
  name: "Lorenz Allen Biscocho",
  email: "lorenzallen@gmail.com",
  role: Role.Student,
  isActive: true,
};

export const claims: Claim[] = [
  {
    id: 1,
    itemId: 1,
    claimedBy: 1,
    status: "Pending",
    notes: "This is mine — it has my initials on the case.",
    submittedAt: new Date("2026-08-18"),
  },
];