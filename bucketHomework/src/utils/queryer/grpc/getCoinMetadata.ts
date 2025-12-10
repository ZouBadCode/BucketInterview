import { getGrpcClient } from "../../../lib/gRPC";

export async function getCoinMetadata_grpc(coinType: string, network: string): Promise<number> {
    if (!coinType) {
        throw new Error("Coin type is needed to fetch coin metadata");   
    }
    const client = getGrpcClient(network);
    const coinMetadata = await client.stateService.getCoinInfo({
        coinType: coinType,
    })
    console.log("gRPC coin metadata:", coinMetadata);
    return coinMetadata.response.metadata?.decimals || 0; // can't import GetCoinInfoRequest, GetCoinInfoResponse, so direactly return number
}