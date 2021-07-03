import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React from 'react';

const FileInput = () => {
  const handleSubmit = async (values, actions) => {
    const data = new FormData();
    data.append('captions', values.captions[0], values.captions[0].name);
    try {
      const response = await axios({
        url: process.env.NEXT_PUBLIC_UPLOAD_URI as string,
        method: 'POST',
        data,
      });

      console.log('response: ', response);
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
    <Formik initialValues={{ captions: 'Captions file' }} onSubmit={handleSubmit}>
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <Field name="captions">
            {({ field, form }) => (
              <FormControl id="captions">
                <FormLabel>Choose a cc file</FormLabel>
                <Input
                  id="captions"
                  type="file"
                  multiple
                  formEncType="multipart/form-data"
                  name="captions"
                  onChange={(event) => {
                    setFieldValue('captions', event.target.files);
                  }}
                  accept="text/vtt"
                />
                <FormErrorMessage>{form.errors.captions}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button isLoading={isSubmitting} type="submit">
            Upload
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export { FileInput as default };
