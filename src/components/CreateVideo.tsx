import { Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useCreateVideoMutation } from '../generated/graphql';
import InputField from './InputField';

type CreateVideoProps = {
  slug: string;
};

const CreateVideo: React.FC<CreateVideoProps> = ({ slug }) => {
  const [createVideo] = useCreateVideoMutation();
  const [errors, setErrors] = useState('');
  const handleSubmit = async (values) => {
    const { errors: createVideoErrors } = await createVideo({
      variables: { identifiers: { slug, ...values } },
      update: (cache) => {
        cache.evict({ fieldName: 'posts:{}' });
      },
    });
    if (createVideoErrors) {
      // setErrors(createPostErrors);
      // router.push('/');
      console.log('Error creating post: ', { createVideoErrors });
    }
  };
  return (
    <>
      <Formik initialValues={{ key: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField name="key" placeholder="video-key" label="Key" />
            <Button type="submit" isLoading={isSubmitting}>
              Add Video
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { CreateVideo as default };
