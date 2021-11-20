import { gql, useQuery } from '@apollo/client';
import useImperativeQuery from '../../utils/useLazyQueryMod';
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

export const SEARCH_WORDS = gql`
  query searchWords($languageId: Int!, $searchTerm: String) {
    searchWords(languageId: $languageId, searchTerm: $searchTerm) {
      id
      name
      languageId
    }
  }
`;

export const useWordsQuery = (languageId?: number) => {
  const { data, loading, refetch } = useQuery<Words>(GET_ALL_WORDS, {
    variables: { languageId },
  });

  return { data, loading, refetch };
};

export const useSearchWordsQuery = () => {
  // prettier-ignore
  const searchWordsLazy = useImperativeQuery(SEARCH_WORDS);

  const searchWords = (languageId: number, searchTerm?: string) => {
    return searchWordsLazy({
      variables: { languageId, searchTerm },
    }).then((result) => {return result.data.searchWords});
  };

  return { searchWords };
};
