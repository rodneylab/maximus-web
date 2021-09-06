import React from 'react';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { withApollo } from '../utilities/withApollo';

const Index = () => {
  const { data, error, loading } = usePostsQuery({
    variables: {
      limit: 10,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <>
        <p>query failed</p>
        <p>{error?.message}</p>
      </>
    );
  }

  return <Layout>{loading && !data ? <>loading...</> : <h1>M A X I M U S</h1>}</Layout>;
};

export default withApollo({ ssr: true })(Index);
