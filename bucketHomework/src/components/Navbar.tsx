import { ConnectButton } from "@mysten/dapp-kit";
import { useDAppConfig } from "../stores/dAppConfig";
import { useLocation, useNavigate } from "react-router-dom";

const route = [
    { path: "/", name: "story one"},
    { path: "/2", name: "story two"},
    { path: "/3", name: "story three"},
    { path: "/4", name: "story four"}
]

export function Navbar() {
    const { network, setNetwork, queryMethod, setQueryMethod} = useDAppConfig();
    const navigate = useNavigate();
    const location = useLocation();
    
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

            {/* Route Selector */}
            <select
                value={location.pathname}
                onChange={(e) => navigate(e.target.value)}
                className="bg-blue-700 text-white px-2 py-1 rounded cursor-pointer focus:outline-none"
            >
                {route.map((router) => (
                    <option key={router.path} value={router.path}>
                        {router.name}
                    </option>
                ))}
            </select>
            <ConnectButton />
        </nav>
    )
}