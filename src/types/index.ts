// ===== ENUMS REPLACED WITH 'AS CONST' OBJECTS =====
// Represents the multi-step lifecycle of a claim on a found item
export const ClaimStatus = {
  Pending: 0,
  Approved: 1,
  Rejected: 2,
} as const;
// Generates the union type (0 | 1 | 2) from the object values
export type ClaimStatus = typeof ClaimStatus[keyof typeof ClaimStatus];

// Kept at runtime for compatibility with various bundlers
export const Role = {
  Student: "student",
  Admin: "admin",
} as const;
// Generates the union type ("student" | "admin") from the object values
export type Role = typeof Role[keyof typeof Role];

// ===== CORE INTERFACES =====
export interface User {
  id: number;
  name: string;
  email: string;
  role: Role; // Works perfectly with the new type definition
  isActive: boolean;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  location: string;
  reportedBy: number; // User id
}

export interface Claim {
  id: number;
  itemId: number;
  claimedBy: number; // User id
  notes: string;
  submittedAt: string;
}

// ===== ALIAS TYPES =====
export type ID = string;
export type Coordinate = { x: number; y: number };
export type Formatter = (value: number) => string;
export type StringOrNumber = string | number;

// ===== GENERIC INTERFACE =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
export type UserUpdate = Partial<User>;
export type UserPreview = Pick<User, "id" | "name" | "role">;
export type PublicUser = Omit<User, "email" | "isActive">;
export type RoleCount = Record<Role, number>; 
