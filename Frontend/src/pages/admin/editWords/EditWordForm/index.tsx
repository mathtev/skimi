import {
  makeStyles,
  Theme,
  createStyles,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Field, Form, Formik, FormikState } from 'formik';
import React from 'react';
import { Level } from '../../../../graphql/level/types';
import { Translation } from '../../../../graphql/translation/types';
import { Word } from '../../../../graphql/word/types';
import CustomField from './CustomField';
import CustomSelect from './CustomSelect';

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
    },
  })
);

interface EditWordFormProps {
  word?: Word;
  translation?: Translation;
  languageFrom?: string;
  languageTo?: string;
  levels?: Level[];
  handleSubmit: (
    formData: FormValues,
    word1?: Word,
    word2?: Word
  ) => Promise<void>;
}

export interface FormValues {
  word1: string;
  word2: string;
  levelId: string;
}

const EditWordForm: React.FC<EditWordFormProps> = ({
  word,
  translation,
  languageFrom,
  languageTo,
  levels,
  handleSubmit,
}) => {
  const classes = useStyles();

  return (
    <>
      <Formik
        validateOnChange={true}
        initialValues={{
          word1: word?.name || '',
          word2: translation?.word.name || '',
          levelId: word?.level_id ? `${word?.level_id}` : '',
        }}
        onSubmit={async (formData: FormValues, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await handleSubmit(formData, word, translation?.word);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, errors, isSubmitting }: FormikState<FormValues>) => (
          <Form className={classes.formRoot}>
            <Field
              label={languageFrom}
              name="word1"
              type="input"
              as={CustomField}
            />
            <Field
              label={languageTo}
              name="word2"
              type="input"
              as={CustomField}
            />
            <Field name="levelId" label="level" as={CustomSelect}>
              {levels?.map((level: Level) => (
                <MenuItem key={level.id} value={`${level.id}`}>
                  {level.code}
                </MenuItem>
              ))}
            </Field>

            <IconButton
              className={classes.editButton}
              disabled={isSubmitting}
              type="submit"
            >
              <EditIcon className={classes.editIcon} />
            </IconButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditWordForm;
