import { gql } from "@apollo/client";

export const CREATE_TRANSLATION = gql`
  mutation createTranslation($translation: TranslationInput!) {
    createTranslation(translation: $translation){
      id
      word1_id
      word2_id
    }
  }
`;