import { useEffect, useState } from "react";
import { getVaultField } from "../utils/queryer/backend/getVaultField";

export function Story3() {
    const [admin, setAdmin] = useState<string>("");
    const [balance, setBalance] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // get vault field data on component mount from backend
    useEffect(() => {
        async function fetchData() {
            try {
                const fieldData = await getVaultField();

                const fields = fieldData?.field?.kind?.structValue?.fields;

                const adminVal = fields?.admin?.kind?.stringValue ?? "";
                const balanceVal = fields?.balance?.kind?.stringValue ?? "";
                const idVal = fields?.id?.kind?.stringValue ?? "";

                setAdmin(adminVal);
                setBalance(balanceVal);
                setId(idVal);
            } catch (e) {
                console.error(e);
                setError("failed to fetch vault field data");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-sm text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-sm text-red-500">{error}</div>;
    }

    return (
        <div className="border p-4 rounded-md bg-gray-50 text-sm">
            <p><span className="font-semibold">Admin:</span> {admin}</p>
            <p><span className="font-semibold">Balance:</span> {balance}</p>
            <p><span className="font-semibold">ID:</span> {id}</p>
        </div>
    );
}
