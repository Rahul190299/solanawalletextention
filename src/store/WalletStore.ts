import { create } from "zustand";
import type { WalletState } from "../types/WalletState";

const walletStore = create<WalletState>((set) => ({
  bIsAuthenticated: false,
  hasWallet: false,
  accounts: [],
  activeAccount: { publicKey: "" },
  balances: {},
  connection: null,
  network: "devnet",
  pendingRequests: [],
  popupMode: "idle",
  encryptedMnemonic: "",
  unlockWallet: (password) => {
    //decrypt seed here
    return new Promise((res, rej) => res(true));
  },
  lockWallet: () => {
    set({ bIsAuthenticated: false });
  },
  setAccounts: (accounts) => {
    set({ accounts: accounts });
  },
  setActiveAccount: (account) => {
    set({ activeAccount: account });
  },
  setConnection: (connection) => {
    set({ connection: connection });
  },
  setBalance: (pubkey, balance) =>
    set((state) => ({
      balances: { ...state.balances, [pubkey]: balance },
    })),

  setNetwork: (network) => {
    set({ network: network });
  },
  addRequest: (req) => {
    set((state) => {
      return {
        pendingRequests: [...state.pendingRequests, req],
      };
    });
  },
  resolveRequest: (id) =>
    set((state) => ({
      pendingRequests: state.pendingRequests.filter((r) => r.id !== id),
      popupMode: "idle",
    })),

  setPopupMode: (mode) => set({ popupMode: mode }),
}));
