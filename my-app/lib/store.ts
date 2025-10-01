import { create } from 'zustand'

// 1. Define the state interface
interface UserState {
  userId: string | null
  setUserId: (id: string) => void
  clearUserId: () => void

  userEmail: string | null
  setUserEmail: (email: string) => void

  userName: string | null
  setUserName: (name: string) => void
}

// 2. Create the typed store
export const useUserStore = create<UserState>((set) => ({
  userId: null,
  setUserId: (id: string) => set({ userId: id }),
  clearUserId: () => set({ userId: null }),

  userEmail: null,
  setUserEmail: (email: string) => set({ userEmail: email }),

  userName: null,
  setUserName: (name: string) => set({ userName: name }), // ✅ fixed here
}))
