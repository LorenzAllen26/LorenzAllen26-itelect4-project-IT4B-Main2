import type {
  User,
  Item,
  Claim,
  ID,
  Coordinate,
  Formatter,
  ApiResponse,
  UserUpdate,
  UserPreview,
  PublicUser,
  RoleCount,
} from "../types/index";
import { ClaimStatus, Role } from "../types/index";

// ===== PRIMITIVE TYPE ANNOTATIONS =====
const projectName: string = "campus-lost-and-found";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

function greet(name: string, year: number): string {
  return `Welcome to ${name} -- AY ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}

logMessage(greet(projectName, currentYear));

let anything: any = "hello";
anything = 42;
anything = true;

let userInput: unknown = "test";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}

function throwError(message: string): never {
  throw new Error(message);
}

const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const item: Item = {
  id: 1,
  title: "Blue Umbrella",
  description: "Found near the library entrance",
  location: "Library",
  reportedBy: student.id,
};

console.log(student);
console.log(item);

const studentId: ID = "S2026-001";
const position: Coordinate = { x: 10, y: 20 };
const formatScore: Formatter = (value: number) => `${value}%`;

console.log(studentId);
console.log(formatScore(95.5));

// ===== GENERIC FUNCTIONS =====
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((i) => i.id === id);
}

const firstUser = getFirst<User>([student]);
const foundUser = getById<User>([student], 1);

console.log(firstUser?.name);
console.log(foundUser?.email);

// ===== USING THE GENERIC INTERFACE =====
const userResponse: ApiResponse<User> = {
  success: true,
  data: student,
};

const itemResponse: ApiResponse<Item[]> = {
  success: true,
  data: [item],
};

console.log(userResponse.data.name);

// ===== USING UTILITY TYPES =====
const patch: UserUpdate = { name: "Juan D. Cruz" };
const preview: UserPreview = { id: 1, name: "Juan dela Cruz", role: "student" };
const publicProfile: PublicUser = { id: 1, name: "Juan dela Cruz", role: "student" };
const roleCount: RoleCount = { student: 45, admin: 2 };

// ===== ReturnType<T> =====
function makeClaim(itemId: number) {
  return {
    id: 1,
    itemId,
    claimedBy: 1,
    notes: "This is mine -- has my initials on the strap",
    submittedAt: new Date(),
  };
}

type NewClaim = ReturnType<typeof makeClaim>;
const claimExample: NewClaim = makeClaim(item.id);

// ===== USING ENUMS =====
let status: ClaimStatus = ClaimStatus.Pending;
console.log(ClaimStatus[status]); // "Pending" -- reverse mapping

status = ClaimStatus.Approved;
console.log(status === ClaimStatus.Approved); // true

const currentRole: Role = Role.Student;
console.log(currentRole); // "student"