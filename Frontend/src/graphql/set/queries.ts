import { gql, useQuery } from '@apollo/client';
import { SetResponse } from './types';

export const GET_ALL_SETS = gql`
  query sets {
    sets {
      id
      name
      createdAt
      progress
      translationSetList {
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
          sentences {
            id
            textFrom
            textTo
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

export const GET_SET = gql`
  query set($id: Int!) {
    set(id: $id) {
      id
      name
      createdAt
      progress
      translationSetList {
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
          sentences {
            id
            textFrom
            textTo
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
        sentences {
          id
          textFrom
          textTo
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

