import type { ClaimStatus, AiListing } from "../types/index";

export interface Item {
  id: string;
  name: string;
  category: string;
  status: string;
  description?: string;
  locationFound?: string;
  dateFound?: string;
}

export type NewItem = Omit<Item, "id">;

export interface ClaimRecord {
  id: string;
  itemId: string;
  userId: string;
  status: ClaimStatus;
  notes: string;
  submittedAt: string;
}

export type NewClaim = Omit<ClaimRecord, "id">;

// Use Vercel backend URL in production, fallback to environment variable or production domain
const BASE_URL =
  (import.meta as any).env?.VITE_API_URL || "https://gt-4-fullstack.vercel.app";

export const api = {
  // Items API Methods
  getItems: async (): Promise<Item[]> => {
    const res = await fetch(`${BASE_URL}/api/items`).catch(() => fetch(`${BASE_URL}/items`));
    if (!res.ok) throw new Error("Failed to fetch items");
    return res.json();
  },

  getItemById: async (id: string): Promise<Item> => {
    const res = await fetch(`${BASE_URL}/api/items/${id}`).catch(() => fetch(`${BASE_URL}/items/${id}`));
    if (!res.ok) throw new Error("Failed to fetch item");
    return res.json();
  },

  getItem: async (id: string): Promise<Item> => {
    const res = await fetch(`${BASE_URL}/api/items/${id}`).catch(() => fetch(`${BASE_URL}/items/${id}`));
    if (!res.ok) throw new Error("Failed to fetch item");
    return res.json();
  },

  createItem: async (item: NewItem): Promise<Item> => {
    const res = await fetch(`${BASE_URL}/api/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error("Failed to create item");
    return res.json();
  },

  updateItemStatus: async (id: string, status: string): Promise<Item> => {
    const res = await fetch(`${BASE_URL}/api/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update item status");
    return res.json();
  },

  // Claims API Methods
  createClaim: async (claim: NewClaim): Promise<ClaimRecord> => {
    const res = await fetch(`${BASE_URL}/api/claims`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(claim),
    });
    if (!res.ok) throw new Error("Failed to create claim");
    return res.json();
  },

  getClaims: async (): Promise<ClaimRecord[]> => {
    const res = await fetch(`${BASE_URL}/api/claims`);
    if (!res.ok) throw new Error("Failed to fetch claims");
    const data: Array<ClaimRecord & { createdAt?: string }> = await res.json();

    return data.map((claim) => ({
      ...claim,
      submittedAt: claim.submittedAt || claim.createdAt || new Date().toISOString(),
    }));
  },
};

export async function askAi(prompt: string): Promise<AiListing> {
  const token = localStorage.getItem("token");

  // Primary attempt at /api/ai
  let res = await fetch(`${BASE_URL}/api/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ prompt }),
  });

  // Fallback to /ai if /api/ai is not found (404)
  if (res.status === 404) {
    res = await fetch(`${BASE_URL}/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ prompt }),
    });
  }

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }

  return (await res.json()) as AiListing;
}