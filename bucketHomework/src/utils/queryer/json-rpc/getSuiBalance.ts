import { type SuiClient, type CoinBalance } from "@mysten/sui/client";

export async function getSuiBalance(suiClient: SuiClient, address: string): Promise<CoinBalance> {
    const suiBalance = await suiClient.getBalance({
        owner: address,
        coinType: "0x2::sui::SUI",
    })
    return suiBalance;
}

