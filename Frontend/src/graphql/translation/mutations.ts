import { gql } from '@apollo/client';

export const CREATE_TRANSLATION = gql`
  mutation createTranslation(
    $levelId: Int!
    $nameFrom: String!
    $nameTo: String!
    $languageFromId: Int!
    $languageToId: Int!
  ) {
    createTranslation(
      levelId: $levelId
      nameFrom: $nameFrom
      nameTo: $nameTo
      languageFromId: $languageFromId
      languageToId: $languageToId
    ) {
      id
      enWordId
      deWordId
    }
  }
`;

export const DELETE_TRANSLATION = gql`
  mutation deleteTranslation($id: Int!) {
    deleteTranslation(id: $id) {
      id
      enWordId
      deWordId
    }
  }
`;
