import { ConnectButton, useSuiClientContext } from "@mysten/dapp-kit";
import { useDAppConfig } from "../stores/dAppConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    const ctx = useSuiClientContext();

    useEffect(() => {
        if (location.pathname === "/" || location.pathname === "/2") {
            if (network !== "mainnet") {
                setNetwork("mainnet");
                ctx.selectNetwork("mainnet");
            }
        } else if (location.pathname === "/3" || location.pathname === "/4") {
            if (network !== "testnet") {
                setNetwork("testnet");
                ctx.selectNetwork("testnet");
            }
        }
        if (location.pathname === "/2" || location.pathname === "/3") {
            if (queryMethod !== "gRPC") {
                setQueryMethod("gRPC");
            }
        }
    }, [location.pathname]);

    const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newNetwork = e.target.value;
        if (location.pathname === "/" || location.pathname === "/4") {
            if (!window.confirm("This story can support other networks, but doesn't meet the requirements of the homework. Are you sure to switch the network?")) {
                return;
            }
        }
        setNetwork(newNetwork);
        ctx.selectNetwork(newNetwork);
    };

    const isNetworkDisabled = location.pathname === "/2" || location.pathname === "/3";
    const isQueryMethodDisabled = location.pathname === "/2" || location.pathname === "/3";
    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
            {/* Title */}
            <div className="text-lg font-bold">Bucket Homework</div>
            {/* Selector 選network */}
            <div className="flex items-center gap-4">
                <select
                    value={network}
                    onChange={handleNetworkChange}
                    disabled={isNetworkDisabled}
                    className={`bg-blue-700 text-white px-2 py-1 rounded cursor-pointer focus:outline-none ${isNetworkDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    <option value="mainnet">Mainnet</option>
                    <option value="testnet">Testnet</option>
                    <option value="devnet">Devnet</option>
                </select>
            {/* Selector 選query method */}
                <select
                    value={queryMethod}
                    disabled={isQueryMethodDisabled}
                    onChange={(e) => setQueryMethod(e.target.value)}
                    className={`bg-blue-700 text-white px-2 py-1 rounded cursor-pointer focus:outline-none ${isQueryMethodDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
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