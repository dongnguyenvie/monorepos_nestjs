import { InMemoryCache, ApolloClient, HttpLink, ApolloLink, split } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { ACCESS_TOKEN_KEY } from 'utils/constants'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  operation.setContext({
    headers: {
      Authorization: `Bearer ${token}` || null,
    },
  })
  return forward(operation)
})
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'localhost',
  // credentials: 'include',
})

const wsLink = new WebSocketLink({
  uri: (process.env.NODE_ENV === 'production' ? 'wss:' : 'ws:') + process.env.REACT_APP_GRAPHQL_ENDPOINT || 'localhost',
  options: {
    reconnect: true,
  },
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`))

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const link = ApolloLink.from([errorLink, middlewareLink, splitLink])

export const apolloClient = new ApolloClient({
  link,
  defaultOptions: {},
  // ...other arguments...
  cache: new InMemoryCache(),
})
