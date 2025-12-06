import { ConnectButton } from "@mysten/dapp-kit";
import { useDAppConfig } from "../stores/dAppConfig";


export function Navbar() {
    const { network, setNetwork, queryMethod, setQueryMethod} = useDAppConfig();
    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
            {/* Title */}
            <div className="text-lg font-bold">Bucket Homework</div>
            {/* Selector 選network */}
            <div className="flex items-center gap-4">
                <select
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    className="bg-blue-700 text-white px-2 py-1 rounded cursor-pointer focus:outline-none"
                >
                    <option value="mainnet">Mainnet</option>
                    <option value="testnet">Testnet</option>
                    <option value="devnet">Devnet</option>
                </select>
            {/* Selector 選query method */}
                <select
                    value={queryMethod}
                    onChange={(e) => setQueryMethod(e.target.value)}
                    className="bg-blue-700 text-white px-2 py-1 rounded cursor-pointer focus:outline-none"
                >
                    <option value="json-rpc">JSON-RPC</option>
                    <option value="gRPC">gRPC</option>
                    <option value="graphQL">GraphQL</option>
                </select>
            </div>
            <ConnectButton />
        </nav>
    )
}