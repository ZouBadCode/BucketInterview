import axios from "axios";
import { baseurl } from "./config";
export async function getAccountBalance(address: string) {
    const response = await axios.post(`http://${baseurl}/account/balance`, {
        address: address
    });
    return response.data;
}