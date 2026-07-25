export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin";
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

export type ID = string;
export type Coordinate = { x: number; y: number };
export type Formatter = (value: number) => string;
export type StringOrNumber = string | number;

// ===== GENERIC INTERFACE =====
// ApiResponse<T> can wrap ANY data type -- every future GT reuses this
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
// Partial<T> -- every field becomes optional
export type UserUpdate = Partial<User>;

// Pick<T, K> -- keep ONLY the listed fields
export type UserPreview = Pick<User, "id" | "name" | "role">;

// Omit<T, K> -- keep every field EXCEPT the listed ones
export type PublicUser = Omit<User, "email" | "isActive">;

// Record<K, T> -- a fixed set of keys, each mapped to the same value type
export type RoleCount = Record<"student" | "admin", number>;

// ===== ENUMS =====
// Regular enum -- exists at runtime; can be looped over or reverse-mapped
// Represents the multi-step lifecycle of a claim on a found item
export enum ClaimStatus {
  Pending,
  Approved,
  Rejected,
}

// const enum -- inlined at compile time, zero runtime overhead
export const enum Role {
  Student = "student",
  Admin = "admin",
}