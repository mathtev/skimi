import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Field, Form, Formik, FormikState } from 'formik';
import React from 'react';
import { Word } from '../../../../graphql/word/types';
import CustomField from '../../../../components/CustomField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formRoot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    formButton: {
      marginBottom: 0,
      marginRight: 0,
    },

    formIcon: {
      width: '20px',
      height: '20px',
    },
  })
);

interface EditWordFormProps {
  word?: Word;
  deleteWord?: (wordId: number) => void;
  handleSubmit: (formData: FormValues, id?: number) => Promise<void>;
}

export interface FormValues {
  name: string;
}

const EditWordForm: React.FC<EditWordFormProps> = ({
  word,
  handleSubmit,
  deleteWord,
}) => {
  const classes = useStyles();

  return (
    <>
      <Formik
        validateOnChange={true}
        enableReinitialize={true}
        initialValues={{
          name: word?.name || '',
        }}
        onSubmit={async (
          formData: FormValues,
          { setSubmitting, resetForm }
        ) => {
          setSubmitting(true);
          await handleSubmit(formData, word?.id);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, errors, isSubmitting }: FormikState<FormValues>) => (
          <Form className={classes.formRoot}>
            <Field
              name="name"
              type="input"
              placeholder="Enter word"
              as={CustomField}
            />
            <IconButton
              className={classes.formButton}
              style={{ marginLeft: '20px' }}
              disabled={isSubmitting}
              type="submit"
            >
              <EditIcon className={classes.formIcon} />
            </IconButton>
            {deleteWord && word && (
              <IconButton
                className={classes.formButton}
                disabled={isSubmitting}
                onClick={() => deleteWord(word.id)}
              >
                <DeleteIcon className={classes.formIcon} />
              </IconButton>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditWordForm;
