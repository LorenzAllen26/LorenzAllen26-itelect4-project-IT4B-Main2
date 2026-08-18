import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        name: "Lorenz Allen Biscocho",
        email: "lorenzallen@gmail.com",
        role: "student",
      },
      token: "mock-jwt-token",
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
      // Requirement: partialize saves ONLY data (user & token), not actions
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);