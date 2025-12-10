import { ApolloClient, InMemoryCache, HttpLink, gql, type DocumentNode, type OperationVariables } from '@apollo/client';

const clients: Record<string, ApolloClient> = {};

export const getGqlClient = (network: string) => {
    if (!clients[network]) {
        const httpLink = new HttpLink({
            uri: `https://graphql.${network}.sui.io/graphql`,
        });
        clients[network] = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'cache-and-network',
                },
                query: {
                    fetchPolicy: 'network-only',
                    errorPolicy: 'all',
                },
                mutate: {
                    errorPolicy: 'all',
                },
            },
        });
    }
    return clients[network];
}

// Default client for backward compatibility
export const gqlClient = getGqlClient('testnet');

/**
 * Execute a GraphQL query
 * @param query - GraphQL query string or DocumentNode
 * @param variables - Optional variables for the query
 * @param network - Network to query (default: testnet)
 * @returns Promise with the query result
 */
export async function gqlQuery<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  query: string | DocumentNode,
  variables?: TVariables,
  network: string = 'testnet'
) {
  const queryDoc = typeof query === 'string' ? gql(query) : query;
  
  return getGqlClient(network).query<TData, TVariables>({
    query: queryDoc,
    variables: variables as TVariables,
  });
}

/**
 * Execute a GraphQL mutation
 * @param mutation - GraphQL mutation string or DocumentNode
 * @param variables - Optional variables for the mutation
 * @param network - Network to mutate (default: testnet)
 * @returns Promise with the mutation result
 */
export async function gqlMutate<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  mutation: string | DocumentNode,
  variables?: TVariables,
  network: string = 'testnet'
) {
  const mutationDoc = typeof mutation === 'string' ? gql(mutation) : mutation;
  
  return getGqlClient(network).mutate<TData, TVariables>({
    mutation: mutationDoc,
    variables: variables as TVariables,
  });
}

export default gqlClient;