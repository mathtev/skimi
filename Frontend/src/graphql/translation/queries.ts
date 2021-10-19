import { gql } from "@apollo/client";

export const GET_TRANSLATIONS = gql`
  query getTranslationsForWord($id: Int!) {
    translationsForWord(id: $id) {
      id
      word1_id
      word2_id
      level_id
    }
  }
`;

