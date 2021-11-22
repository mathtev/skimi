import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Field, Form, Formik, FormikState } from 'formik';
import React from 'react';
import CustomField from '../../../../../components/CustomField';
import { Translation } from '../../../../../graphql/translation/types';
import { useMutation } from '@apollo/client';
import { CREATE_SENTENCE } from '../../../../../graphql/sentence/mutations';

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

interface AddSentenceFormProps {
  translation: Translation;
  refetchTranslations: any;
}

export interface FormValues {
  sentenceFrom: string;
  sentenceTo: string;
}

const AddSentenceForm: React.FC<AddSentenceFormProps> = ({ translation, refetchTranslations }) => {
  const classes = useStyles();
  const [createSentenceMutation] = useMutation(CREATE_SENTENCE);

  const addSentence = (
    textFrom: string,
    textTo: string,
    translationId: number
  ) => {
    const sentence = { textFrom, textTo, translationId };
    return createSentenceMutation({
      variables: { sentence },
    }).then(() => refetchTranslations());
  };

  return (
    <>
      <Formik
        validateOnChange={true}
        enableReinitialize={true}
        initialValues={{
          sentenceFrom: '',
          sentenceTo: '',
        }}
        onSubmit={async (
          formData: FormValues,
          { setSubmitting, resetForm }
        ) => {
          setSubmitting(true);
          await addSentence(
            formData.sentenceFrom,
            formData.sentenceTo,
            translation.id
          );
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, errors, isSubmitting }: FormikState<FormValues>) => (
          <Form className={classes.formRoot}>
            <Field
              name="sentenceFrom"
              type="input"
              placeholder="Enter sentence..."
              as={CustomField}
            />
            <Field
              name="sentenceTo"
              type="input"
              placeholder="Enter sentence..."
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddSentenceForm;
