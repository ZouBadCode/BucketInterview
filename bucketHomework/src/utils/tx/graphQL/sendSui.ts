
import { gqlMutate } from "../../../lib/gql";

export const EXECUTE_TX = `
  mutation ExecuteTransaction(
    $transactionDataBcs: Base64!,
    $signatures: [Base64!]!
  ) {
    executeTransaction(
      transactionDataBcs: $transactionDataBcs,
      signatures: $signatures
    ) {
      effects {
        digest
      }
    }
  }
`;


export async function executeTx_gql(txBcs: string, sig: string, network: string) {
    const { data, error } = await gqlMutate(EXECUTE_TX, {
        transactionDataBcs: txBcs,
        signatures: [sig],
    }, network);

    if (error) {
        throw new Error(`GraphQL TX Error: ${JSON.stringify(error)}`);
    }

    return data;
}
