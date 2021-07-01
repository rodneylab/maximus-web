import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { usePostQuery } from '../generated/graphql';
import Videos from './Videos';

dayjs.extend(relativeTime);
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
  const createdDate = dayjs(createdAt);
  const createdDateString = createdDate.fromNow();
  return (
    <>
      <h3>{title}</h3>
      <p>{slug}</p>
      <p>Created: {createdDateString}</p>
      <h4>Videos</h4>
      <Videos slug={slug} videos={videos} />
    </>
  );
};

export { Post as default };
