import { useMutation, useQuery } from '@apollo/client';
import { CREATE_WORD } from '../../../graphql/word/mutations';
import { Word, Words } from '../../../graphql/word/types';
import { Levels } from '../../../graphql/level/types';
import { Languages } from '../../../graphql/language/types';
import { GET_ALL_WORDS } from '../../../graphql/word/queries';
import { GET_ALL_LEVELS } from '../../../graphql/level/queries';
import { GET_ALL_LANGUAGES } from '../../../graphql/language/queries';
import { CREATE_TRANSLATION } from '../../../graphql/translation/mutations';
import { useSettings } from '../../../hooks/useSettings';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';

import { Translation } from '../../../graphql/translation/types';
import EditWordForm from './EditWordForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0, 'auto'),
      width: '60%',
    },
    wordListTitle: {
      marginTop: 40
    }
  })
);

const EditWords = () => {
  const classes = useStyles();

  const words = useQuery<Words>(GET_ALL_WORDS, {
    variables: { language_id: 1 },
  });
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
    <div className={classes.root}>
      <Typography variant="h5">Add new word</Typography>
      <EditWordForm
        word=""
        translation=""
        languageFrom={languageFrom?.name}
        languageTo={languageTo?.name}
      />
      <Typography variant="h5" className={classes.wordListTitle}>Word list</Typography>
      {words.data?.words.map((word: Word) =>
        word?.translations.map((translation: Translation) => (
          <div key={word.id}>
            <EditWordForm
              word={word.name}
              translation={translation.word.name}
              languageFrom={languageFrom?.name}
              languageTo={languageTo?.name}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default EditWords;
