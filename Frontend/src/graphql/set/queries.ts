import { gql } from "@apollo/client";

export const GET_ALL_SETS = gql`
  query getAllSets {
    sets {
      id
      name
      created_at
      translations {
        id
        level_id
        en_word_id
        de_word_id
        word_to {
          id
          name
          language_id
        }
        word_from {
          id
          name
          language_id
        }
      }
    }
  }
`;

