import { useEffect, useState } from "react"

export function Story2() {
    const [address, setAddress] = useState("");

    useEffect(() => {
        console.log("Address changed:", address);
    }, [address])
    return (
        <div className="min-h-screen flex items-cemter justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-700">Input Address:</h2>

                <input
                    type="text"
                    placeholder="input address"
                    value={address}
                    onChange={(e)=> setAddress(e.target.value)}
                    className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
        </div>
    )
}