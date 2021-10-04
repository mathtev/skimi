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

const EditWords = () => {
  const words = useQuery<Words>(GET_ALL_WORDS);
  const levels = useQuery<Levels>(GET_ALL_LEVELS);
  const languages = useQuery<Languages>(GET_ALL_LANGUAGES);

  const [appState] = useAppState();

  const [createWordMutation] = useMutation(CREATE_WORD, {
    onCompleted(data) {
      words.refetch();
    },
  });
  const [createTranslationMutation] = useMutation(CREATE_TRANSLATION, {
    onCompleted(data) {
      console.log(data)
    },
  });

  const learningLanguage = languages.data?.languages.find(
    (language) =>
      language.name.toLowerCase() === appState.learningLanguage.toLowerCase()
  );
  const nativeLanguage = languages.data?.languages.find(
    (language) =>
      language.name.toLowerCase() === appState.nativeLanguage.toLowerCase()
  );

  const addWord = () => {

    if(!nativeLanguage){
      return;
    }

    const word = {
      name: 'solid',
      language_id: nativeLanguage.id,
      level_id: 3,
    };

    createWordMutation({
      variables: { word },
    });
  };

  return (
    <div>
      <p>
        {learningLanguage?.name}, {learningLanguage?.id}
      </p>
      {words.data?.words.map((word: Word) => (
        <p>{word.name}</p>
      ))}
      <button onClick={() => addWord()}>aaa</button>
    </div>
  );
};

export default EditWords;
