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
import CustomSelect from '../../../../components/CustomSelect';
import CustomAsyncSelect from '../../../../components/CustomAsyncSelect';
import { useSearchWordsQuery } from '../../../../graphql/word/queries';
import { Language } from '../../../../graphql/language/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formRoot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',

      '& > *': {
        marginRight: 40,
        marginTop: 20,
      },

      '& > .customAsync': {
        flexGrow: '1',
        width: '100%',
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

interface CreateTranslationFormProps {
  languageFrom: Language;
  languageTo: Language;
  levels: Level[];
  // prettier-ignore
  handleSubmit: (formData: FormValues, wordFromId?: number, wordToId?: number) => Promise<void>
}

export interface FormValues {
  levelId: string;
  nameFrom: string;
  nameTo: string;
}

const CreateTranslationForm: React.FC<CreateTranslationFormProps> = ({
  languageFrom,
  languageTo,
  levels,
  handleSubmit,
}) => {
  const classes = useStyles();
  const { searchWords } = useSearchWordsQuery();
  const [selectedWordFrom, setSelectedWordFrom] = React.useState('');
  const [selectedWordTo, setSelectedWordTo] = React.useState('');

  return (
    <>
      <Formik
        validateOnChange={true}
        enableReinitialize={true}
        initialValues={{
          levelId: '',
          nameFrom: selectedWordFrom,
          nameTo: selectedWordTo,
        }}
        onSubmit={async (
          formData: FormValues,
          { setSubmitting, resetForm }
        ) => {
          setSubmitting(true);
          await handleSubmit(formData);
          setSelectedWordFrom('');
          setSelectedWordTo('');
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, errors, isSubmitting }: FormikState<FormValues>) => (
          <Form className={classes.formRoot}>
            <CustomAsyncSelect
              handleSelectChange={setSelectedWordFrom}
              selectedValue={selectedWordFrom}
              name="selectWordFrom"
              getData={searchWords}
              languageId={languageFrom.id}
            />
            <CustomAsyncSelect
              handleSelectChange={setSelectedWordTo}
              selectedValue={selectedWordTo}
              name="selectWordTo"
              getData={searchWords}
              languageId={languageTo.id}
            />
            <Field
              name="levelId"
              label="level"
              variant="outlined"
              as={CustomSelect}
            >
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateTranslationForm;
