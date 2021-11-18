import { gql, useQuery } from '@apollo/client';
import { Words } from './types';

export const GET_ALL_WORDS = gql`
  query words($languageId: Int) {
    words(languageId: $languageId) {
      id
      name
      languageId
      translations {
        id
        levelId
        enWordId
        deWordId
        wordTo {
          id
          name
          languageId
        }
      }
    }
  }
`;

export const useWordsQuery = (languageId?: number) => {
  const { data, loading, refetch } = useQuery<Words>(GET_ALL_WORDS, {
    variables: { languageId },
  });
  return { data, loading, refetch };
};
