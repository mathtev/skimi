import { TextField } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';
import React from 'react';

type VariantType = 'standard' | 'filled' | 'outlined' | undefined;
type FieldAttr = { label: string; variant: VariantType };

const CustomSelect: React.FC<FieldAttributes<{}> & FieldAttr> = ({
  label,
  variant,
  children,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...field}
      error={!!errorText}
      select
      size="small"
      label={label}
      variant={variant}
      InputLabelProps={{
        style: { color: '#858585' },
      }}
      style={{ minWidth: '90px', color: '#000' }}
      defaultValue=""
    >
      {children}
      {/* prevent error which is showing for no reason */}
      <span></span>
    </TextField>
  );
};

export default CustomSelect;
