import { mainnetGRPC } from "../libs/client";
import { Router, Request, Response } from "express";
import { toJSONSafe } from "../utils/json_helper";
import { RpcError } from "@protobuf-ts/runtime-rpc";

const router = Router();

// POST /account/balance
// body: { address: string }
// response: { success: boolean, balances: Array<{ coinType: string, balance: string, coinInfo: any | null }> }
router.post(
  "/balance",
  async (req: Request, res: Response) => {
    try {
      const { address } = req.body as { address?: string };

      if (!address) {
        return res.status(400).json({
          success: false,
          message: "address is required",
        });
      }

      const balances = await getAllBalance(address);

      return res.json(
        toJSONSafe({
          success: true,
          balances,
        })
      );
    } catch (err) {
      console.error("[/account/balance] error:", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

// Helper function to get all balances by grpc
async function getAllBalance(address: string) {
  const response = await mainnetGRPC.stateService.listBalances({
    owner: address,
  });

  const balances = response.response.balances ?? [];

  const uniqueCoinTypes = Array.from(
    new Set(
      balances
        .map((b) => b.coinType ?? "")
        .filter((t) => t.length > 0)
    )
  );

  // coinType safeGetCoinInfo
  const coinInfoMap = new Map<string, any | null>();

  await Promise.all(
    uniqueCoinTypes.map(async (coinType) => {
      const info = await safeGetCoinInfo(coinType);
      coinInfoMap.set(coinType, info);
    })
  );

  //  balances coinInfo
  const balancesWithInfo = balances.map((b) => {
    const coinType = b.coinType ?? "";
    return {
      coinType,
      balance: b.balance ?? "",
      coinInfo: coinInfoMap.get(coinType) ?? null,
    };
  });

  return balancesWithInfo;
}

// Safe helper: Get coin info by grpc, but swallow NOT_FOUND
async function safeGetCoinInfo(coinType: string) {
  if (!coinType) return null;

  try {
    const response = await mainnetGRPC.stateService.getCoinInfo({
      coinType,
    });
    return response.response ?? null;
  } catch (e: any) {
    if (e instanceof RpcError && e.code === "NOT_FOUND") {
      console.warn("[getCoinInfo] CoinInfo not found for type:", coinType);
      return null;
    }

    console.error("[getCoinInfo] unexpected error for type:", coinType, e);
    throw e;
  }
}

export default router;
