import { SuiGrpcClient } from '@mysten/sui/grpc';

export const grpcClient = new SuiGrpcClient({
	network: 'testnet',
	baseUrl: 'https://fullnode.testnet.sui.io:443',
});