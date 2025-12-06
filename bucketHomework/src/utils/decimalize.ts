export function decimalizeBalance(balance: string, decimals: number): string {
    if (decimals === 0) return balance;
    const balanceFront = balance.slice(0, -decimals) || "0";
    const balanceBack = balance.slice(-decimals).padStart(decimals, "0");
    return `${balanceFront}.${balanceBack}`;
}