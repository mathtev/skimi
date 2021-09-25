import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_ALL_WORDS } from './queries';

interface Word {
  id: number;
  name: string;
  languageId: number;
  levelId: number;
}

const EditWords = () => {
  const { data, loading } = useQuery<Word[] | null>(GET_ALL_WORDS);
  let lol = [...data]
  data && console.log(data)
  return (
    <div>

    </div>
  );
};

export default EditWords;
