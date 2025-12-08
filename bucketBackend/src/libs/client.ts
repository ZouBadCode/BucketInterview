import { SuiGrpcClient } from '@mysten/sui/grpc';

export const mainnetGRPC = new SuiGrpcClient({
    network: 'mainnet',
    baseUrl: 'https://fullnode.mainnet.sui.io:443',
});

export const testnetGRPC = new SuiGrpcClient({
	network: 'testnet',
	baseUrl: 'https://fullnode.testnet.sui.io:443',
})