import { gqlQuery } from "../../../lib/gql";

export const GET_Coin_BALANCE_METADATA = `
  query GetCoinMetadata($coinType: String!){
    coinMetadata(coinType: $coinType) {
      decimals
    }
  }
`;

// get Sui Metadata using GraphQL
export async function getCoinMetadata_gql(coinType: String): Promise<String> {
  if (!coinType) {
    throw new Error("coinType is required to fetch SUI metadata");
  }
  const { data } = await gqlQuery<String>(
    GET_Coin_BALANCE_METADATA,
    { coinType }
  );
  if (!data) {
    throw new Error("Failed to fetch SUI metadata");
  }
  return data
}