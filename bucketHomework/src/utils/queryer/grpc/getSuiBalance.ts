import { grpcClient } from "../../../lib/gRPC";

export async function getSuiBalance_grpc(address: string): Promise<string> {
    if (!address) {
        throw new Error("Address is needed to fetch SUI balance");
    }
    const suiBalance = await grpcClient.stateService.getBalance({
        owner: address,
        coinType: "0x2::sui::SUI",
    })
    console.log("suiBalance grpc", suiBalance);
    return suiBalance
}