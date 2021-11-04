import { gql } from "@apollo/client";

export const GET_ALL_TRANSLATIONS = gql`
  query getTranslations {
    translations {
      id
      levelId
      level {
        id
        difficulty
        code
      }
      wordFrom {
        id
        name
        languageId
      }
      wordTo {
        id
        name
        languageId
      }
    }
  }
`;

