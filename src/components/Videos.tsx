import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { useDeleteVideoMutation, useVideosQuery } from '../generated/graphql';
import CreateVideo from './CreateVideo';

const Videos = ({ slug, videos }) => {
  const [deleteVideoMutation] = useDeleteVideoMutation();
  const { data, error, loading } = useVideosQuery({
    variables: {
      slug,
    },
  });

  const handleDelete = async (id) => {
    await deleteVideoMutation({
      variables: {
        id: parseInt(id, 10),
      },
      update: (cache) => {
        cache.evict({ id: `Video:${id}` });
      },
    });
  };

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    return <>Videos: {error.message}</>;
  }

  if (!data?.videos) {
    return <>Could not find any videos for post with slug: {slug}</>;
  }

  return (
    <>
      <h4>Post Videos:</h4>
      <ul>
        {videos?.map((element) => {
          const { id, key, createdAt } = element;
          const createdDate = dayjs(createdAt);
          const createdDateString = createdDate.fromNow();
          return (
            <li key={id}>
              {element.key}
              <IconButton
                aria-label="Delete video"
                icon={<DeleteIcon />}
                onClick={() => {
                  handleDelete(id);
                }}
              />
              Created: {createdDateString}
            </li>
          );
        })}
      </ul>
      <CreateVideo slug={slug} />
    </>
  );
};

export { Videos as default };
