import { createNetworkConfig, SuiClientProvider, WalletProvider, lightTheme } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
	devnet: { url: getFullnodeUrl('devnet') },
	testnet: { url: getFullnodeUrl('testnet') },
	mainnet: { url: getFullnodeUrl('mainnet') },
});
const queryClient = new QueryClient();

export function SuiProvider({ children }: { children: React.ReactNode }) {
	const [activeNetwork, setActiveNetwork] = useState('devnet' as keyof typeof networkConfig);

	return (
		<QueryClientProvider client={queryClient}>
			<SuiClientProvider networks={networkConfig} network={activeNetwork} onNetworkChange={(network) => {
				setActiveNetwork(network);
			}}>
				<WalletProvider theme={lightTheme}>
					{children}
				</WalletProvider>
			</SuiClientProvider>
		</QueryClientProvider>
	);
}