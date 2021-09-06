import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { PaginatedPosts } from '../generated/graphql';
import { createWithApollo } from './createWithApollo';

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_URI as string,
  credentials: 'include',
});

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    headers: {
      cookie: (typeof window === 'undefined' ? ctx?.req?.headers.cookie : undefined) || '',
    },
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: [],
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts,
              ): PaginatedPosts {
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
