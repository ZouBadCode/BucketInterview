import { useEffect, useState } from "react"
import { getAccountBalance } from "../utils/queryer/backend/getAccountBalance";
import { decimalizeBalance } from "../utils/decimalize";
export function Story2() {
    const [address, setAddress] = useState("");
    const [balances, setBalances] = useState<any>("");

    useEffect(() => {
        if (address.slice(2) === "0x") {
            getAccountBalance(address).then((data) => {
                setBalances(data);
                console.log(data);
            })
        } else {
            setBalances(null);
        }
    }, [address])
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-gray-700">Input Address:</h2>

                <input
                    type="text"
                    placeholder="input address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
                    {balances?.balances?.length > 0 ? (
                        balances.balances.map((b: any, i: number) => (
                            <div key={i} className="border p-3 rounded-md mt-2 text-sm bg-gray-50">
                                <img src={b.coinInfo.metadata.iconUrl} alt="no image" width={24} height={24} className="inline-block mr-2 align-middle" />
                                <p className="break-all"><span className="font-semibold">Coin:</span> {b.coinType}</p>
                                <p className="break-all"><span className="font-semibold">Balance:</span> {decimalizeBalance(b.balance, b.coinInfo.metadata.decimals)}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm mt-2">No balances found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}