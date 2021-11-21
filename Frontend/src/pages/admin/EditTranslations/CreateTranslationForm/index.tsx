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
import {
  Translation,
  Translations,
} from '../../../../graphql/translation/types';
import { Word } from '../../../../graphql/word/types';
import CustomSelect from '../../../../components/CustomSelect';
import { ApolloQueryResult } from '@apollo/client';
import CustomAsyncSelect, {
  SelectOption,
} from '../../../../components/CustomAsyncSelect';
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
  handleSubmit: (wordFromId: number, wordToId: number, formData: FormValues) => Promise<void>
}

export interface FormValues {
  levelId: string;
}

const CreateTranslationForm: React.FC<CreateTranslationFormProps> = ({
  languageFrom,
  languageTo,
  levels,
  handleSubmit,
}) => {
  const classes = useStyles();
  const { searchWords } = useSearchWordsQuery();
  const [selectedWordFrom, setSelectedWordFrom] =
    React.useState<SelectOption>();
  const [selectedWordTo, setSelectedWordTo] = React.useState<SelectOption>();

  console.log(selectedWordFrom)
  return (
    <>
      <Formik
        validateOnChange={true}
        enableReinitialize={true}
        initialValues={{
          levelId: '',
        }}
        onSubmit={async (
          formData: FormValues,
          { setSubmitting, resetForm }
        ) => {
          setSubmitting(true);
          if (selectedWordFrom && selectedWordTo)
            await handleSubmit(
              selectedWordFrom.value,
              selectedWordTo.value,
              formData
            );
          setSubmitting(false);
          resetForm();
          setSelectedWordFrom(undefined);
          setSelectedWordTo(undefined);
        }}
      >
        {({ values, errors, isSubmitting }: FormikState<FormValues>) => (
          <Form className={classes.formRoot}>
            <CustomAsyncSelect
              key={selectedWordFrom?.value}
              name="selectWordFrom"
              getData={searchWords}
              languageId={languageFrom.id}
              selectedValue={selectedWordFrom}
              handleSelectChange={setSelectedWordFrom}
            />
            <CustomAsyncSelect
              key={selectedWordTo?.value}
              name="selectWordTo"
              getData={searchWords}
              languageId={languageTo.id}
              selectedValue={selectedWordTo}
              handleSelectChange={setSelectedWordTo}
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
