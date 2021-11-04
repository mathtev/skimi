import { gql } from "@apollo/client";

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

