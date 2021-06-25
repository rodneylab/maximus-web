import React from 'react';
import CreatePost from '../components/CreatePost';
import Layout from '../components/Layout';
import Post from '../components/Post';
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

  return (
    <Layout>
      {loading && !data ? (
        <>loading...</>
      ) : (
        <>
          <h1>M A X I M U S</h1>
          <h2>Posts</h2>
          <CreatePost />
          {data!.posts.posts.map((element) => (
            <li key={element.slug}>
              <h2>{element.title}</h2>
              <p>{element.slug}</p>
            </li>
          ))}
          <h2>Selected Post</h2>
          <Post slug={data!.posts.posts[0].slug} />
        </>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
