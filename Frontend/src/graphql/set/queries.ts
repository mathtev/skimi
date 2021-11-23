import { gql, useQuery } from '@apollo/client';
import { SetResponse } from './types';

export const GET_ALL_SETS = gql`
  query getAllSets {
    sets {
      id
      name
      createdAt
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
        wordFrom {
          id
          name
          languageId
        }
      }
    }
  }
`;

export const GET_SET = gql`
  query getSet($id: Int!) {
    set(id: $id) {
      id
      name
      createdAt
      translationSetGroup {
        id
        skill
        translation {
          id
          levelId
          enWordId
          deWordId
          wordTo {
            id
            name
            languageId
          }
          wordFrom {
            id
            name
            languageId
          }
        }
      }
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
        wordFrom {
          id
          name
          languageId
        }
      }
    }
  }
`;

export const useSetQuery = (id: number) => {
  const {data, loading, refetch} = useQuery<SetResponse>(GET_SET, {
    variables: { id },
  });
  return {data, loading, refetch}
};

