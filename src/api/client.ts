export interface Item {
  id: string;
  name: string;
  category: string;
  status: string;
}

export type NewItem = Omit<Item, "id">;

const BASE_URL = "http://localhost:3001";

export const api = {
  getItems: async (): Promise<Item[]> => {
    const res = await fetch(`${BASE_URL}/items`);
    if (!res.ok) throw new Error("Failed to fetch items");
    return res.json();
  },

  getItemById: async (id: string): Promise<Item> => {
    const res = await fetch(`${BASE_URL}/items/${id}`);
    if (!res.ok) throw new Error("Failed to fetch item");
    return res.json();
  },

  createItem: async (newItem: NewItem): Promise<Item> => {
    const res = await fetch(`${BASE_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    if (!res.ok) throw new Error("Failed to create item");
    return res.json();
  },
};