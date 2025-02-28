import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WalletState {
  isConnected: boolean
  address: string | null
  setConnected: (address: string) => void
  disconnect: () => void
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      isConnected: false,
      address: null,
      setConnected: (address) => set({ isConnected: true, address }),
      disconnect: () => set({ isConnected: false, address: null }),
    }),
    {
      name: "wallet-storage",
    },
  ),
)

