import { gqlQuery } from "../../../lib/gql";
import { type GetCoinMetadataQuery } from "../../../generated/graphql";
export const GET_Coin_BALANCE_METADATA = `
  query GetCoinMetadata($coinType: String!){
    coinMetadata(coinType: $coinType) {
      decimals
    }
  }
`;

// get Sui Metadata using GraphQL
export async function getCoinMetadata_gql(coinType: String, network: string): Promise<GetCoinMetadataQuery> {
  if (!coinType) {
    throw new Error("coinType is required to fetch SUI metadata");
  }
  const { data } = await gqlQuery<GetCoinMetadataQuery>(
    GET_Coin_BALANCE_METADATA,
    { coinType },
    network
  );
  if (!data) {
    throw new Error("Failed to fetch SUI metadata");
  }
  return data
}