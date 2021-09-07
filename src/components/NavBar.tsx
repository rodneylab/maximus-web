import { useApolloClient } from '@apollo/client';
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useMeQuery } from '../generated/graphql';
import { isServer } from '../utilities/next';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  // const [logout, { loading: logoutFetching}] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const { data, loading } = useMeQuery({ skip: isServer() });

  let body = null;
  if (!loading) {
    if (!data?.me) {
      // user not logged in
      body = (
        <>
          <NextLink href="/login">
            <Link href="/login" mr={2}>
              login
            </Link>
          </NextLink>
          <NextLink href="/register">
            <Link href="/register" mr={2}>
              register
            </Link>
          </NextLink>
        </>
      );
    } else {
      // user is logged in
      body = (
        <Flex align="center">
          <NextLink href="dashboard">
            <Button as={Link} mr={4}>
              dashboard
            </Button>
          </NextLink>
          <Box mr={2}>{data.me.username}</Box>
          <Button
            onClick={async () => {
              console.log('logout');
              await apolloClient.resetStore();
            }}
          >
            logout
          </Button>
        </Flex>
      );
    }
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4}>
      <Flex flex={1} margin="auto" maxW={800} align="center">
        <NextLink href="/">
          <Link href="/">
            <Heading>M A X I M U S</Heading>
          </Link>
        </NextLink>
        <Box ml="auto">{body}</Box>
      </Flex>
    </Flex>
  );
};

export { NavBar as default };
