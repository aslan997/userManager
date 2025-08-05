import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql", // Adjust if your backend runs elsewhere
  cache: new InMemoryCache(),
});

export default client;
