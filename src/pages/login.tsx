import { Box, Button, Flex, Icon, Link } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import { NavBar } from '../components/NavBar';
import { Github } from '../components/SocialIcon';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utilities/form';
import { withApollo } from '../utilities/withApollo';

export async function signInWithGithub() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_KEY as string,
  );

  const { user, session, error } = await supabase.auth.signIn({
    provider: 'github',
  });
  console.log(`user: ${user}`);
  console.log(`session: ${session}`);
  console.log(`error: ${error}`);
  return { user, session, error };
}

const GithubIcon = () => <Github style={{ height: 18, width: 18 }} />;

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
        router.push('/dashboard');
      }
    }
  };

  return (
    <>
      <NavBar />
      <Box>
        <Button type="submit" onClick={signInWithGithub}>
          <Icon as={GithubIcon} />
          Continue with GitHub
        </Button>
      </Box>
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
