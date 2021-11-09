import { gql } from '@apollo/client';

export const GET_ALL_SETS = gql`
  query getAllSets {
    sets {
      id
      name
      createdAt
    }
  }
`;

export const GET_SET = gql`
  query getSet($id: Int!) {
    set(id: $id) {
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
