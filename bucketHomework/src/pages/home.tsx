import { useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { getSuiBalance } from "../utils/queryer/json-rpc/getSuiBalance";
import { getCoinMetadata } from "../utils/queryer/json-rpc/getCoinMetadata";
import { useEffect, useState } from "react";
import { decimalizeBalance } from "../utils/decimalize";
import { getSuiBalance_gql } from "../utils/queryer/graphQL/getSuiBalance"
import { getCoinMetadata_gql } from "../utils/queryer/graphQL/getCoinMetadata";
import { getSuiBalance_grpc } from "../utils/queryer/grpc/getSuiBalance";
import { useDAppConfig } from "../stores/dAppConfig";
import { getCoinMetadata_grpc } from "../utils/queryer/grpc/getCoinMetadata";

export function Home() {
    const suiClient = useSuiClient();
    const currentAccount = useCurrentAccount();
    const [suiBalance, setSuiBalance] = useState("");
    const [decimals, setDecimals] = useState<number>(0);
    const { network, queryMethod } = useDAppConfig();

    useEffect(() => {
        if (!currentAccount) return;
        if (queryMethod === "json-rpc") {
            const res = getSuiBalance(suiClient, currentAccount.address);
            const metadata = getCoinMetadata(suiClient, "0x2::sui::SUI");
            metadata.then(meta => {
                setDecimals(meta!.decimals);
            });
            res.then(balance => {
                setSuiBalance(balance.totalBalance);
            });
        } else if (queryMethod === "graphQL") {
            const res = getSuiBalance_gql(currentAccount.address, network)
            const metadata = getCoinMetadata_gql("0x2::sui::SUI", network);
            res.then(balance=> {
                setSuiBalance(balance.address?.balance?.totalBalance); // todo: type definition
            })
            metadata.then(meta => {
                const decimals = meta.coinMetadata?.decimals ?? 0;
                setDecimals(decimals);
            });
        } else if (queryMethod === "gRPC") {
            const res = getSuiBalance_grpc(currentAccount.address, network);
            const metadata = getCoinMetadata_grpc("0x2::sui::SUI", network);
            res.then(balance => {
                setSuiBalance(balance); // totalBalance in gRPC response
            }
            )
            metadata.then(meta => {
                setDecimals(meta);
            })
        }

    }, [suiClient, currentAccount?.address, network, queryMethod]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {currentAccount ? (
                <div>
                    <p className="mb-2">Connected Account: {currentAccount.address}</p>
                    <p className="mb-2">SUI Balance: {suiBalance ? `$${decimalizeBalance(suiBalance, decimals || 0)} Sui` : "No Sui found in this wallet"}</p>
                </div>
            ) : (
                <p>Please connect your wallet to see account details.</p>
            )}
        </div>
    )
}