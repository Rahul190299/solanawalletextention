import { Connection,PublicKey } from "@solana/web3.js";
export interface WalletState {
  bIsAuthenticated: boolean;
  hasWallet: boolean;
  accounts: WalletAccount[];
  activeAccount: WalletAccount;
  balances: Record<string, number>;
  // 🌐 Connection
  connection: Connection | null;
  network: "devnet" | "testnet" | "mainnet-beta";
  pendingRequests: Request[];
  popupMode: "idle" | "connect" | "sign" | "send";
  encryptedMnemonic : string;
  setEncryptedMnemonic : (encryptedMnemonic : string) => void,
  setHasWallet : () => void;
  unlockWallet: (password: string) => Promise<boolean>;
  lockWallet: () => void;
  // Wallet
  setAccounts: (accounts: WalletAccount[]) => void;
  setActiveAccount: (account: WalletAccount) => void;

  // Balance
  setBalance: (pubkey: string, balance: number) => void;

  // Network
  setConnection: (connection: Connection) => void;
  setNetwork: (network: WalletState["network"]) => void;

  // Requests
  addRequest: (req: Request) => void;
  resolveRequest: (id: string) => void;

  // UI
  setPopupMode: (mode: WalletState["popupMode"]) => void;
}

export type WalletAccount = {
  publicKey: string; // base58 string
  label?: string;
};

export type Request = {
  id: string;
  type: "connect" | "sign" | "send";
  origin: string;
  payload: any;
};
