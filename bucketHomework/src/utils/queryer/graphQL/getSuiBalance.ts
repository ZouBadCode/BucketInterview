import { gqlQuery } from "../../../lib/gql";

export const GET_SUI_BALANCE = `
  query GetSuiBalance($address: SuiAddress!) {
    address(address: $address) {
      balance(coinType: "0x2::sui::SUI") {
        totalBalance
      }
    }
  }
`;

// get Sui Balance using GraphQL
export async function getSuiBalance_gql(address: string): Promise<String> {
  if (!address) {
    throw new Error("Address is required to fetch SUI balance");
  }
  const { data } = await gqlQuery<String>(
    GET_SUI_BALANCE,
    { address }
  );

  if (!data) {
    throw new Error("Failed to fetch SUI balance");
  }

  return data
}