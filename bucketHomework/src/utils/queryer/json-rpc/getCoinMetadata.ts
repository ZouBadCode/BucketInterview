import { type SuiClient } from "@mysten/sui/client";

export async function getCoinMetadata(suiClient: SuiClient, coinType: string) {
    const coinMetadata = await suiClient.getCoinMetadata({
        coinType: coinType,
    })
    return coinMetadata;
}