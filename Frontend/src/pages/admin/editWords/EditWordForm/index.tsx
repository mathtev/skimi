import { makeStyles, TextField, Theme, createStyles, Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Field, FieldAttributes, Form, Formik, FormikState, useField } from 'formik';
import React from 'react';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formRoot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',

      '& > *': {
        margin: theme.spacing('10px', '20px', '10px', '0'),
      },
    },
    editButton: {
      marginBottom: 0,
    },

    editIcon: {
      width: '20px',
      height: '20px',
    }
  })
);

interface EditWordFormProps {
  word: string;
  translation: string;
  languageFrom?: string;
  languageTo?: string;
}

interface formValues {
  languageFrom: string;
  languageTo: string;
  level: string;
}

const EditWordForm: React.FC<EditWordFormProps> = ({
  word,
  translation,
  languageFrom,
  languageTo,
}) => {
  const classes = useStyles();

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

  return (
    <>
      <Formik
        validateOnChange={true}
        initialValues={{
          languageFrom: word,
          languageTo: translation,
          level: '',
        }}
        //validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log('submit: ', data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }: FormikState<formValues>) => (
          <Form className={classes.formRoot}>
            <Field
              label={languageTo}
              name="languageFrom"
              type="input"
              as={CustomField}
            />
            <Field
              label={languageFrom}
              name="languageTo"
              type="input"
              as={CustomField}
            />
            <Button className={classes.editButton} disabled={isSubmitting} type="submit">
              <EditIcon className={classes.editIcon} />
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditWordForm;
