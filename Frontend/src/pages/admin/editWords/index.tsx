import { useMutation, useQuery } from '@apollo/client';
import { CREATE_WORD } from './mutations';
import { GET_ALL_WORDS } from './queries';
import { Word, Words } from './types';

const word = {
  name: 'bad',
  language_id: 1,
  level_id: 1,
};

const EditWords = () => {
  const { data, loading, refetch } = useQuery<Words>(GET_ALL_WORDS);

  const [createWordMutation] = useMutation(
    CREATE_WORD,
    {
      onCompleted(data) {
        refetch();
      }
    }
  );

  const addWord = () => {
    createWordMutation({ variables: { word: word } });
  };

  return (
    <div>
      {data?.words.map((word: Word) => (
        <p>{word.name}</p>
      ))}
      <button onClick={() => addWord()}>aaa</button>
    </div>
  );
};

export default EditWords;
