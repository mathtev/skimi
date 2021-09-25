import { useQuery } from '@apollo/client';
import { GET_ALL_WORDS } from './queries';
import { Word, Words } from './types';

const EditWords = () => {
  const { data, loading } = useQuery<Words>(GET_ALL_WORDS);
  return (
    <div>
      {data?.words.map((word: Word) => (
        <p>{word.name}</p>
      ))}
    </div>
  );
};

export default EditWords;
