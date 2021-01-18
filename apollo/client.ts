import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
    }),
    cache: new InMemoryCache(),
  });
}

export function useApollo() {
  const client = useMemo(() => createApolloClient(), []);
  return client;
}
