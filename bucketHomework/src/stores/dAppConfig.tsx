import { create } from "zustand";

// global dApp configuration store
type DAppConfigState = {
    network: string;
    setNetwork: (network: string) => void;
    queryMethod: string;
    setQueryMethod: (method: string) => void;
}

export const useDAppConfig = create<DAppConfigState>((set) => ({
    network: "testnet",
    setNetwork: (network: string) => set({ network }),
    queryMethod: "json-rpc",
    setQueryMethod: (queryMethod: string) => set({ queryMethod })
}))