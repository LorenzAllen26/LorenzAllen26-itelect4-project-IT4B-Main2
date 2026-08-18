// ===== ENUM-STYLE CONSTANTS =====
// erasableSyntaxOnly blocks the `enum` keyword, so we use `as const` objects instead --
// same usage (Role.Student, ClaimStatus.Pending), fully erasable.
export const Role = {
  Student: "student",
  Admin: "admin",
  Instructor: "instructor",
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const ClaimStatus = {
  Pending: "Pending",
  Approved: "Approved",
  Rejected: "Rejected",
} as const;
export type ClaimStatus = (typeof ClaimStatus)[keyof typeof ClaimStatus];

// ===== INTERFACES =====
export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
}

export interface Item {
  id: number | string;
  title: string;
  name?: string;
  category?: string;
  description?: string;
  location?: string;
  reportedBy?: number;
  status?: string;
}

export interface Claim {
  id: number;
  itemId: number;
  claimedBy: number;
  notes: string;
  submittedAt: Date;
  status?: ClaimStatus;
}

// ===== TYPE ALIASES =====
export type ID = number | string;

export type Coordinate = {
  x: number;
  y: number;
};

export type Formatter = (value: number) => string;

// ===== GENERIC INTERFACE =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// ===== UTILITY TYPES =====
export type UserUpdate = Partial<User>;
export type UserPreview = Pick<User, "id" | "name" | "role">;
export type PublicUser = Omit<User, "email" | "isActive">;
export type RoleCount = Partial<Record<Role, number>>;