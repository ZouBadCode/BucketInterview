import { Router, Request, Response } from "express";
import { testnetGRPC } from "../libs/client";
const route = Router();

route.get('/getField', async (req: Request, res: Response) => {
    try {
        const fieldData = await getVaultField();
        res.status(200).json({ field: fieldData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve field data' });
    }
});

async function getVaultField(): Promise<any> {
    const response = await testnetGRPC.ledgerService.getObject({
        objectId: "0xeeb34a78eaf4ae873c679db294296778676de4a335f222856716d1ad6ed54e45",
        readMask: {
            "paths": ["json"]
        }
    });
    console.log("Vault Field Data:", response.response.object?.json);
    return response.response.object?.json;
}

export default route;