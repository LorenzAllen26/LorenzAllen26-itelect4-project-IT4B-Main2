# Campus Lost & Found Tracker

A simple lost-and-found system for campus use. Students can report items they've
lost or found, and security admins can review claims made against found items to
verify the rightful owner before returning it. Built as a TypeScript project for
ITELECT4, using strict type-checking throughout.

## Types & Interfaces

- **`User`** -- a person using the system (`student` or `admin` role)
- **`Item`** -- a lost or found item report, tied to the user who reported it
- **`Claim`** -- a request from a user claiming ownership of a found item, with a
  status lifecycle (`Pending` -> `Approved` / `Rejected`)
- **`ApiResponse<T>`** -- a generic wrapper for any API response shape
- **`UserUpdate`**, **`UserPreview`**, **`PublicUser`**, **`RoleCount`** -- utility
  types derived from `User` for updates, previews, public-safe data, and role
  counts
- **`ClaimStatus`** (enum) -- tracks a claim's lifecycle
- **`Role`** (const enum) -- `student` / `admin`

## How to Install and Run

\`\`\`bash
npm install
npx tsc --noEmit      # type-check only, no output files
npx ts-node src/index.ts
\`\`\`