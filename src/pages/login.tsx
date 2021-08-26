import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utilities/form';
import { withApollo } from '../utilities/withApollo';

const Login = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  async function handleSubmit(values, { setErrors }) {
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
        router.push('/');
      }
    }
  }

  return (
    <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <InputField name="email" placeholder="email" label="Email" />
          <Box mt={4}>
            <InputField name="password" placeholder="password" label="Password" type="password" />
          </Box>
          <Flex mt="2">
            <NextLink href="/forgot-password">
              <Link>Forgotten your password?</Link>
            </NextLink>
          </Flex>
          <Button mt={4} type="submit" isLoading={isSubmitting}>
            login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: false })(Login);
