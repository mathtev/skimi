import { gql } from "@apollo/client";

export const CREATE_TRANSLATION = gql`
  mutation createTranslation($translation: TranslationInput!) {
    createTranslation(translation: $translation){
      id
      enWordId
      deWordId
    }
  }
`;

export const DELETE_TRANSLATION = gql`
  mutation deleteTranslation($id: Int!) {
    deleteTranslation(id: $id){
      id
      enWordId
      deWordId
    }
  }
`;