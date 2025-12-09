import { Transaction } from "@mysten/sui/transactions";

export function createSendSui(address: string, amount: number): Transaction {
    const tx = new Transaction();
    let amountConverted = amount * 1_000_000_000; //BCS can't process float, convert to integer
    const [coin] = tx.splitCoins(tx.gas, [amountConverted]);
    tx.transferObjects([coin], address);

    return tx;
}