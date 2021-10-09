import { useMutation, useQuery } from '@apollo/client';
import { useAppState } from '../../../hooks/useAppState';
import { CREATE_WORD } from '../../../graphql/word/mutations';
import { Word, Words } from '../../../graphql/word/types';
import { Levels } from '../../../graphql/level/types';
import { Languages } from '../../../graphql/language/types';
import { GET_ALL_WORDS } from '../../../graphql/word/queries';
import { GET_ALL_LEVELS } from '../../../graphql/level/queries';
import { GET_ALL_LANGUAGES } from '../../../graphql/language/queries';
import { CREATE_TRANSLATION } from '../../../graphql/translation/mutations';
import { useSettings } from '../../../hooks/useSettings';
import { Button, TextField } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Formik,
  Field,
  Form,
  useField,
  FormikState,
  FieldAttributes,
} from 'formik';

interface formValues {
  languageFrom: string;
  languageTo: string;
  level: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formRoot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 500,
      margin: theme.spacing(0, 'auto'),

      '& > *': {
        margin: theme.spacing('10px', '20px'),
      },
    },
  })
);

const CustomField: React.FC<FieldAttributes<{}> & {label: string}> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
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

const EditWords = () => {
  const classes = useStyles();
  const words = useQuery<Words>(GET_ALL_WORDS);
  const levels = useQuery<Levels>(GET_ALL_LEVELS);
  const languages = useQuery<Languages>(GET_ALL_LANGUAGES);

  const appSettings = useSettings();

  const [createWordMutation] = useMutation(CREATE_WORD, {
    onCompleted(data) {
      words.refetch();
    },
  });
  const [createTranslationMutation] = useMutation(CREATE_TRANSLATION, {
    onCompleted(data) {
      console.log(data);
    },
  });

  const languageFrom = languages.data?.languages.find(
    (language) =>
      language.name.toLowerCase() ===
      appSettings.settings?.learningLanguage.toLowerCase()
  );
  const languageTo = languages.data?.languages.find(
    (language) =>
      language.name.toLowerCase() ===
      appSettings.settings?.nativeLanguage.toLowerCase()
  );

  const addWord = () => {
    if (!languageTo) {
      return;
    }

    const word = {
      name: 'solid',
      language_id: languageTo.id,
      level_id: 3,
    };

    createWordMutation({
      variables: { word },
    });
  };

  return (
    <div>
      {words.data?.words.map((word: Word) => (
        
        <Formik
        key={word.id}
          validateOnChange={true}
          initialValues={{
            languageFrom: word.name,
            languageTo: '',
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
              <Field label={languageFrom?.name} name="languageFrom" type="input" as={CustomField} />
              <Field label={languageTo?.name} name="languageTo" type="input" as={CustomField} />
              <Button disabled={isSubmitting} type="submit">
                submit
              </Button>
            </Form>
          )}
        </Formik>
      ))}

      <button onClick={() => addWord()}>aaa</button>
    </div>
  );
};

export default EditWords;
