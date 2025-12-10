import { SuiGrpcClient } from '@mysten/sui/grpc';

const clients: Record<string, SuiGrpcClient> = {};

export const getGrpcClient = (network: string) => {
    if (!clients[network]) {
        clients[network] = new SuiGrpcClient({
            network: network as any,
            baseUrl: `https://fullnode.${network}.sui.io:443`,
        });
    }
    return clients[network];
}
