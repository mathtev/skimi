import { gql } from "@apollo/client";

export const GET_ALL_WORDS = gql`
  query words($language_id: Int!) {
    words(language_id: $language_id) {
      id
      name
      language_id
      level_id
      translations {
        id
        word {
          id
          name
        }
      }
    }
  }
`;

