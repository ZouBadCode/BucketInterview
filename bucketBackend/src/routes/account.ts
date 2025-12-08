import { mainnetGRPC } from "../libs/client";
import { Router, Request, Response } from "express";
import { toJSONSafe } from "../utils/json_helper";

const router = Router();

router.post(
  "/balance",
  async (req: Request, res: Response) => {
    try {
      const { address } = req.body as { address?: string };

      if (!address) {
        return res.status(400).json({
          success: false,
          message: "address is required"
        });
      }

      const balances = await getAllBalance(address);

      // 🔴 這裡先處理 BigInt 再丟給 res.json
      return res.json(
        toJSONSafe({
          success: true,
          balances
        })
      );
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
);

async function getAllBalance(address: string) {
  const response = await mainnetGRPC.stateService.listBalances({
    owner: address
  });

  return response.response.balances;
}

export default router;
