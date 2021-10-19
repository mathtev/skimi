import { gql } from "@apollo/client";

export const GET_ALL_WORDS = gql`
  query words($language_id: Int) {
    words(language_id: $language_id) {
      id
      name
      language_id
      translations {
        id
        level_id
        en_word_id
        de_word_id
        word {
          id
          name
          language_id
        }
      }
    }
  }
`;

