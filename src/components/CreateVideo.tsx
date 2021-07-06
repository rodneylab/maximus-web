import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useCreateVideoMutation } from '../generated/graphql';
import FileInputField from './FileInputField';
import InputField from './InputField';

type CreateVideoProps = {
  slug: string;
};

const CreateVideo: React.FC<CreateVideoProps> = ({ slug }) => {
  const [createVideo] = useCreateVideoMutation();
  const [errors, setErrors] = useState('');
  const handleSubmit = async (values, actions) => {
    const data = new FormData();
    data.append('captions', values.captions[0], values.captions[0].name);
    data.append('video', values.video[0], values.video[0].name);
    try {
      // upload captions and video files to storage
      const response = await axios({
        url: process.env.NEXT_PUBLIC_UPLOAD_URI as string,
        method: 'POST',
        data,
      });
      // console.log('captions response: ', response);
      const { url: captionsUrl } = response.data.captions;
      const { url: videoUrl } = response.data.video;

      // create video
      const { key } = values;
      const { errors: createVideoErrors } = await createVideo({
        variables: { parameters: { slug, key, captionsUrl, videoUrl } },
        update: (cache) => {
          cache.evict({ fieldName: 'posts:{}' });
        },
      });
      if (createVideoErrors) {
        setErrors(`Error creating post: ${createVideoErrors[0].message}`);
        createVideoErrors.forEach((error) => {
          console.log('Error creating post: ', error.message);
        });
      }

      actions.resetForm();
    } catch (error) {
      let message;
      if (error.response) {
        message = `Server responded with non 2xx code: ${error.response.data}`;
      } else if (error.request) {
        message = `No response received: ${error.request}`;
      } else {
        message = `Error setting up response: ${error.message}`;
      }
    }
  };
  return (
    <>
      <Formik initialValues={{ key: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <InputField name="key" placeholder="video-key" label="Key" />
            <FileInputField
              id="captions"
              name="captions"
              label="Choose a closed captions file"
              isRequired
              accept="text/vtt"
              onChange={(event) => {
                setFieldValue('captions', event.target.files);
              }}
            />
            <FileInputField
              id="video"
              name="video"
              label="Choose a video file"
              isRequired
              accept="video/mp4"
              onChange={(event) => {
                setFieldValue('video', event.target.files);
              }}
            />
            <Button type="submit" isLoading={isSubmitting}>
              Add Video
            </Button>
          </Form>
        )}
      </Formik>
      <p>{errors}</p>
    </>
  );
};

export { CreateVideo as default };
