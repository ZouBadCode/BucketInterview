import { useState } from "react";
import { useDAppConfig } from "../stores/dAppConfig";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { createSendSui } from "../utils/tx/sendSui";

export function Stroy4() {
    const [toAddress, setToAddress] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [finalMessage, setFinalMessage] = useState("");
    const { network, queryMethod } = useDAppConfig();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

    async function sendSui() {
        if (!toAddress || !amount) {
            alert("Please enter a valid address and amount.");
            return;
        }

        if (queryMethod == "json-rpc") {
            const tx = createSendSui(toAddress, amount);
            signAndExecuteTransaction({
                transaction: tx,
                chain: "sui:testnet",
            }, {
                onSuccess: (result) => {
                    console.log("Transaction successful:", result);
                },
                onError: (error) => {
                    console.error("Transaction failed:", error);
                }
            }
            )
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h2 className="text-xl font-bold mb-4 text-gray-700">
                    Transfer SUI
                </h2>

                {/* Target Address */}
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Target Address
                </label>
                <input
                    type="text"
                    placeholder="0x..."
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4"
                />

                {/* Amount (Only SUI) */}
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
                    className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4"
                />

                {/* Error / Success
                {errorMsg && (
                    <p className="text-red-500 text-sm mb-2 break-all">{errorMsg}</p>
                )}
                {successMsg && (
                    <p className="text-green-600 text-sm mb-2 break-all">
                        {successMsg}
                    </p>
                )} */}

                <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={sendSui}
                >
                </button>
        </div>
    );
}