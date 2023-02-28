import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { createApolloProvider } from '@vue/apollo-option'

// HTTP connection to the API
const uri = "http://localhost:8000/graphql";
// const uri = "https://api.simbolomm.com/graphql"
const httpLink = createHttpLink({
    uri
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach((error) => {
            const { message, locations, path, extensions } = error
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`, error
            )
            const isIncopatibleVersionError = message?.includes("Incompatible version")
            const isTokenExpiredError = extensions?.code === "TokenExpiredError"
            if (isIncopatibleVersionError) {
                alert("Please clear your browser cache");
            } else if (isTokenExpiredError) {
                console.log("Token is expired")
            }
        });
    }
    if (networkError) {
        console.error('[Network error]: ', networkError);
    }
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache
})

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
});

export default apolloClient