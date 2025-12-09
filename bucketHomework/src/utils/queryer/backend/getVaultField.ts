import axios from "axios";

export async function getVaultField() {
    const response = await axios.get("http://localhost:3000/s3/getField");
    return response.data;
}