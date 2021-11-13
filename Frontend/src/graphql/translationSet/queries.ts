import { gql } from '@apollo/client';

export const GET_TRANSLATION_SET = gql`
  query getTranslationSet($id: Int!) {
    translationSet(id: $id) {
      id
      name
      createdAt
      translations {
        id
        levelId
        enWordId
        deWordId
        wordTo {
          id
          name
          languageId
        }
        wordFrom {
          id
          name
          languageId
        }
      }
    }
  }
`;
