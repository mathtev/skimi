import { TextField } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';
import React from 'react'

const CustomField: React.FC<FieldAttributes<{}> & { label: string }> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      placeholder={props.placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      label={label}
    />
  );
};

export default CustomField
