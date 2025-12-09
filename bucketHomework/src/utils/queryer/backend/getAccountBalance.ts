import axios from "axios";

export async function getAccountBalance(address: string) {
    const response = await axios.post("http://localhost:3000/account/balance", {
        address: address
    });
    return response.data;
}