import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { useDeleteVideoMutation } from '../generated/graphql';

const Video = ({
  captionsStorageId,
  captionsStorageKey,
  createdAt,
  description,
  id,
  videoKey: key,
  playbackId,
  videoStorageId,
  videoStorageKey,
}) => {
  const [deleteVideoMutation] = useDeleteVideoMutation();

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

  const createdDate = dayjs(createdAt);
  const createdDateString = createdDate.fromNow();

  return (
    <>
      {key}
      <IconButton
        aria-label="Delete video"
        icon={<DeleteIcon />}
        onClick={() => {
          handleDelete(id);
        }}
      />
      <p>Description: {description}</p>
      <p>Playback id: {playbackId}</p>
      <p>Captions storage id: {captionsStorageId}</p>
      <p>Captions storage key: {captionsStorageKey}</p>
      <p>Video storage id: {videoStorageId}</p>
      <p>Video storage key: {videoStorageKey}</p>
      <p>Created: {createdDateString}</p>
    </>
  );
};

export { Video as default };
