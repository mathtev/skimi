import { gql } from "@apollo/client";

export const CREATE_TRANSLATION = gql`
  mutation createTranslation($translation: TranslationInput!) {
    createTranslation(translation: $translation){
      id
      en_word_id
      de_word_id
    }
  }
`;

export const DELETE_TRANSLATION = gql`
  mutation deleteTranslation($id: Int!) {
    deleteTranslation(id: $id){
      id
      en_word_id
      de_word_id
    }
  }
`;