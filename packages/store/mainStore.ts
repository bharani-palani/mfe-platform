import { create } from 'zustand'

type AppState = {
  user: string | null
  setUser: (name: string) => void
  logout: () => void
}

export const userStore = create<AppState>((set) => ({
  user: null,
  setUser: (name) => set({ user: name }),
  logout: () => set({ user: null }),
}))
