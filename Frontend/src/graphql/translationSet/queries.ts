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

export const TRANSLATION_SET_GROUP = gql`
query translationSetList {
  translationSetList {
    id
    skill
    translation {
      id
      enWordId
      deWordId
      level {
        id
        difficulty
      }
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
    set {
      id
      name
      createdAt
    }
  }
}
`;


