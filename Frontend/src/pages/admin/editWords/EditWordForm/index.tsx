import {
  makeStyles,
  Theme,
  createStyles,
  Button,
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
}

interface formValues {
  languageFrom?: string;
  languageTo?: string;
  levelId?: string;
}

const EditWordForm: React.FC<EditWordFormProps> = ({
  word,
  translation,
  languageFrom,
  languageTo,
  levels,
}) => {
  const classes = useStyles();

  return (
    <>
      <Formik
        validateOnChange={true}
        initialValues={{
          languageFrom: word?.name,
          languageTo: translation?.word.name,
          levelId: `${word?.level_id}`,
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
            <Field name="levelId" type="select" label="level" as={CustomSelect}>
              {levels?.map((level: Level) => (
                <MenuItem key={level.id} value={`${level.id}` || ''}>
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
