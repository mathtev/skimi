import { gql } from "@apollo/client";

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

