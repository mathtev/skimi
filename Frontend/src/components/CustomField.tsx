import { TextField } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';
import React from 'react'

type fieldAttr = {label: string, type: string}

const CustomField: React.FC<FieldAttributes<{}> & fieldAttr> = ({
  label,
  type,
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
      type={type}
    />
  );
};

export default CustomField
