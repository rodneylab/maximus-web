import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import toErrorMap from '../utilities/form';
import { withApollo } from '../utilities/withApollo';

const Register = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  async function handleSubmit(values, { setErrors }) {
    const response = await register({
      variables: { options: values },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.register.user,
          },
        });
      },
    });
    if (response.data?.register.errors) {
      setErrors(toErrorMap(response.data.register.errors));
    } else if (response.data?.register.user) {
      router.push('/');
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
          <Button mt={4} type="submit" isLoading={isSubmitting}>
            register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: false })(Register);
