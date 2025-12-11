import { useState, useMemo } from "react";
import { useDAppConfig } from "../stores/dAppConfig";
import {
    useCurrentAccount,
    useSignAndExecuteTransaction,
    useSignTransaction,
} from "@mysten/dapp-kit";
import { createSendSui } from "../utils/tx/sendSui";
import { executeTx_gql } from "../utils/tx/graphQL/sendSui";
import { getGrpcClient } from "../lib/gRPC";
import { fromBase64, isValidSuiAddress } from "@mysten/sui/utils";

export function Story4() {
    const [toAddress, setToAddress] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [successDigest, setSuccessDigest] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const { network, queryMethod } = useDAppConfig();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const { mutate: signTransaction } = useSignTransaction();
    const sender = useCurrentAccount();

    // Explorer base URL based on network
    const explorerBaseUrl = useMemo(() => {
        switch (network) {
            case "testnet":
                return "https://suiscan.xyz/testnet/tx";
            case "devnet":
                return "https://suiscan.xyz/devnet/tx";
            case "mainnet":
            default:
                return "https://suiscan.xyz/mainnet/tx";
        }
    }, [network]);

    // Full explorer URL for the successful transaction
    const explorerUrl = useMemo(() => {
        if (!successDigest) return null;
        return `${explorerBaseUrl}/${successDigest}`;
    }, [explorerBaseUrl, successDigest]);

    // Send SUI Transaction
    async function sendSui() {
        setSuccessDigest(null);
        setErrorMessage("");

        if (!toAddress || !amount) {
            alert("Please enter a valid address and amount.");
            return;
        }
        if (!(isValidSuiAddress(toAddress))) {
            return alert("Please enter a valid SUI address.");
        }
        const tx = createSendSui(toAddress, amount);

        if (queryMethod === "json-rpc") {
            signAndExecuteTransaction(
                {
                    transaction: tx,
                    chain: `sui:${network}`,
                },
                {
                    onSuccess: (result) => {
                        setSuccessDigest(result.digest);
                    },
                    onError: (error) => {
                        setErrorMessage(`Transaction failed: ${error.message}`);
                    },
                }
            );
        } else if (queryMethod === "graphQL") {
            if (!sender?.address) {
                alert("Please connet wallet");
                return;
            }

            tx.setSender(sender.address);

            signTransaction(
                {
                    transaction: tx,
                    chain: `sui:${network}`,
                },
                {
                    onSuccess: async (signResult) => {
                        try {
                            const result = (await executeTx_gql(
                                signResult.bytes,
                                signResult.signature,
                                network
                            )) as {
                                executeTransaction: { effects: { digest: string } };
                            };
                            setSuccessDigest(result.executeTransaction.effects.digest);
                        } catch (err: any) {
                            setErrorMessage(
                                `Signature failed: ${err?.message ?? "Unknown error"}`
                            );
                        }
                    },
                    onError: (error) => {
                        setErrorMessage(`Signature failed: ${error.message}`);
                    },
                }
            );
        } else if (queryMethod === "gRPC") {
            signTransaction(
                {
                    transaction: tx,
                    chain: `sui:${network}`,
                },
                {
                    onSuccess: async (signResult) => {
                        try {
                            const txBytes = fromBase64(signResult.bytes);
                            const result =
                                await getGrpcClient(network).transactionExecutionService.executeTransaction(
                                    {
                                        transaction: {
                                            bcs: { value: txBytes },
                                        },
                                        signatures: [
                                            {
                                                bcs: { value: fromBase64(signResult.signature) },
                                                signature: { oneofKind: undefined },
                                            },
                                        ],
                                    }
                                );

                            console.log("gRPC Transaction successful:", result);
                            const digest = result.response.transaction?.effects?.transactionDigest;
                            if (digest) {
                                setSuccessDigest(digest);
                            } else {
                                setErrorMessage("Transaction success but digest not found.");
                            }
                        } catch (err: any) {
                            setErrorMessage(
                                `Signature failed: ${err?.message ?? "Unknown error"}`
                            );
                        }
                    },
                    onError: (error) => {
                        setErrorMessage(`Signature failed: ${error.message}`);
                    },
                }
            );
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Transfer SUI</h2>
                <p className="text-xs text-gray-500 mb-4">
                    Network: <span className="font-mono">{network}</span> · Method:{" "}
                    <span className="font-mono">{queryMethod}</span>
                </p>

                {/* Success Message */}
                {successDigest && explorerUrl && (
                    <div className="mb-4 border border-green-300 bg-green-50 text-green-800 text-sm rounded-lg p-3">
                        <p className="font-semibold mb-1">Transaction successful</p>
                        <p className="break-all text-xs">
                            Digest:{" "}
                            <a
                                href={explorerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline font-mono hover:opacity-80"
                            >
                                {successDigest}
                            </a>
                        </p>
                    </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <div className="mb-4 border border-red-300 bg-red-50 text-red-800 text-sm rounded-lg p-3">
                        <p className="font-semibold mb-1">Error</p>
                        <p className="break-all text-xs">{errorMessage}</p>
                    </div>
                )}

                {/* Address */}
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Target Address
                </label>
                <input
                    type="text"
                    placeholder="0x..."
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4 text-sm"
                />

                {/* Amount */}
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Amount (SUI)
                </label>
                <input
                    type="number"
                    min="0"
                    step="0.000001"
                    placeholder="e.g. 0.1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-6 text-sm"
                />

                <button
                    type="button"
                    className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={sendSui}
                >
                    Send SUI
                </button>
            </div>
        </div>
    );
}
