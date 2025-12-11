import { mainnetGRPC } from "../libs/client";
import { Router, Request, Response } from "express";
import { toJSONSafe } from "../utils/json_helper";

const router = Router();

// post /account/balance
// body: { address: string }
// response: { success: boolean, balances: Array<{ coinType: string, balance: string, coinInfo: any }> }
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
      console.log(balances);
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

// Helper function to get all balances by grpc
async function getAllBalance(address: string) {
  const response = await mainnetGRPC.stateService.listBalances({
    owner: address
  });

  const balances = response.response.balances ?? [];

  const balancesWithInfo = await Promise.all(
    balances.map(async (b) => {
      const coinType = b.coinType ?? "";
      const coinInfo = await getCoinInfo(coinType);
      return {
        coinType,
        balance: b.balance ?? "",
        coinInfo,
      };
    })
  );

  return balancesWithInfo;
}

// Helper function to get coin info by grpc
async function getCoinInfo(coinType: string) {
  const response = await mainnetGRPC.stateService.getCoinInfo({
    coinType: coinType
  });
  return response.response;
}

export default router;
