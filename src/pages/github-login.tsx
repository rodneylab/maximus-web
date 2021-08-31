import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MeDocument, MeQuery, useGithubLoginMutation } from '../generated/graphql';
import { withApollo } from '../utilities/withApollo';

const GithubLogin = () => {
  const router = useRouter();
  const [login] = useGithubLoginMutation();

  async function githubLogin(values) {
    const response = await login({
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.githubLogin.user,
          },
        });
        cache.evict({ fieldName: 'posts:{}' });
      },
    });
    if (response.data?.githubLogin.errors) {
      console.log('Errors: ', response.data.githubLogin.errors);
    } else {
      router.push('/');
    }
  }

  useEffect(() => {
    if (typeof router.query.access_token === 'string') {
      const {
        access_token: accessToken,
        provider_token: providerToken,
        refresh_token: refreshToken,
      } = router.query;
      const values = { accessToken, providerToken, refreshToken };
      githubLogin(values);
    }
  }, [router]);

  return <>Github Login</>;
};

export default withApollo({ ssr: false })(GithubLogin);
