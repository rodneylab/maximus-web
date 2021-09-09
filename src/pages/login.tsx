import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import GithubLogin from '../components/GithubLogin';
import InputField from '../components/InputField';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utilities/form';
import { withApollo } from '../utilities/withApollo';

const Login = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  const handleSubmit = async (values, { setErrors }) => {
    const response = await login({
      variables: values,
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.login.user,
          },
        });
        cache.evict({ fieldName: 'posts:{}' });
      },
    });
    if (response.data?.login.errors) {
      setErrors(toErrorMap(response.data.login.errors));
    } else if (response.data?.login.user) {
      if (typeof router.query.next === 'string') {
        router.push(router.query.next);
      } else {
        router.push('/dashboard/');
      }
    }
  };

  return (
    <>
      <Box>Log in to maximus to continue.</Box>
      <GithubLogin />
      <Formik initialValues={{ username: '', password: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <p>Have a password? Continue with your email address.</p>
            <InputField name="username" placeholder="username" label="Username" isRequired />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
                isRequired
              />
            </Box>
            <Flex mt="2">
              <NextLink href="/forgot-password">
                <Link href="/forgot-password">Forgotten your password?</Link>
              </NextLink>
            </Flex>
            <Box>
              <Button mt={4} type="submit" disabled={isSubmitting}>
                Login with email
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default withApollo({ ssr: false })(Login);
