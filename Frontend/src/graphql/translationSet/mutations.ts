import { gql } from "@apollo/client";

export const UPDATE_TRANSLATION_SET = gql`
  mutation updateTranslationSet($id: Int!, $input: TranslationSetInput!) {
    updateTranslationSet(id: $id, input: $input){
      id
      skill
    }
  }
`;
