import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { ErrorMessage, Field } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type FileInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  accept: string;
  label: string;
  name: string;
  onChange(): void;
};

const FileInputField: React.FC<FileInputFieldProps> = ({ accept, id, label, name, onChange }) => (
  <>
    <FormLabel>
      <label htmlFor={id}>{label}</label>
    </FormLabel>
    <Field name={name}>
      {() => (
        <FormControl id={id}>
          <Input
            id={id}
            type="file"
            multiple
            formEncType="multipart/form-data"
            name={name}
            onChange={onChange}
            accept={accept}
          />
        </FormControl>
      )}
    </Field>
    <FormErrorMessage>
      <ErrorMessage name={name} component="small" />
    </FormErrorMessage>
  </>
);

export { FileInputField as default };
