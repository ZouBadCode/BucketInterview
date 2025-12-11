import axios from "axios";
import { baseurl } from "./config";
export async function getVaultField() {
    const response = await axios.get(`https://${baseurl}/s3/getField`);
    return response.data;
}