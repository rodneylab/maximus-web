import React from 'react';
import { usePostQuery } from '../generated/graphql';
import Videos from './Videos';

const Post = ({ slug }) => {
  const { data, error, loading } = usePostQuery({
    variables: {
      slug,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    return <p>Post: {error.message}</p>;
  }

  if (!data?.post) {
    return <>Could not find post</>;
  }

  const { title, createdAt, videos } = data.post;
  return (
    <>
      <h3>{title}</h3>
      <p>{slug}</p>
      <p>Created: {createdAt}</p>
      <h4>Videos</h4>
      <Videos slug={slug} videos={videos} />
    </>
  );
};

export { Post as default };
