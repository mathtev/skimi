import { Select, TextField } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';
import React from 'react';

const CustomSelect: React.FC<FieldAttributes<{}> & { label: string }> = ({
  label,
  children,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField {...field} select label={label} style={{minWidth: '50px'}}>
      {children}
    </TextField>
  );
};

export default CustomSelect;
