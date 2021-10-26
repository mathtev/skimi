import { gql } from "@apollo/client";

export const GET_ALL_TRANSLATIONS = gql`
  query getTranslations {
    translations {
      id
      level_id
      level {
        id
        difficulty
        code
      }
      word_from {
        id
        name
        language_id
      }
      word_to {
        id
        name
        language_id
      }
    }
  }
`;

