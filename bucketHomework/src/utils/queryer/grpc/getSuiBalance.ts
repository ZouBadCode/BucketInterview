import { grpcClient } from "../../../lib/gRPC";

export async function getSuiBalance_grpc(address: string): Promise<string> {
    if (!address) {
        throw new Error("Address is needed to fetch SUI balance");
    }
    const suiBalance = await grpcClient.stateService.getBalance({
        owner: address,
        coinType: "0x2::sui::SUI",
    })
    return suiBalance.response.balance?.balance?.toString() || "0"; // can't import GetBalanceRequest, GetBalanceResponse, so direactly return string
}