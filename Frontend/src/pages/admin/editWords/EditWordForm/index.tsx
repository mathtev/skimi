import {
  makeStyles,
  Theme,
  createStyles,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Field, Form, Formik, FormikState } from 'formik';
import React from 'react';
import { Level } from '../../../../graphql/level/types';
import { Translation, Translations } from '../../../../graphql/translation/types';
import { Word, Words } from '../../../../graphql/word/types';
import CustomField from './CustomField';
import CustomSelect from './CustomSelect';
import { ApolloQueryResult } from '@apollo/client';

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
  translation?: Translation;
  languageFrom?: string;
  languageTo?: string;
  levels?: Level[];
  handleSubmit: (
    formData: FormValues,
    word1?: Word,
    word2?: Word
  ) => Promise<void>;
  deleteTranslation: (id: number) => Promise<ApolloQueryResult<Translations>>;
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
  deleteTranslation,
}) => {
  const classes = useStyles();

  return (
    <>
      <Formik
        validateOnChange={true}
        enableReinitialize={true}
        initialValues={{
          word1: word?.name || '',
          word2: translation?.word_to?.name || '',
          levelId: translation?.level_id ? `${translation.level_id}` : '',
        }}
        onSubmit={async (
          formData: FormValues,
          { setSubmitting, resetForm }
        ) => {
          setSubmitting(true);
          await handleSubmit(formData, word, translation?.word_to);
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
              className={classes.formButton}
              disabled={isSubmitting}
              type="submit"
            >
              <EditIcon className={classes.formIcon} />
            </IconButton>
            {translation && (
              <IconButton
                onClick={() => deleteTranslation(translation.id)}
                className={classes.formButton}
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
