import { gql } from "@apollo/client";

export const ADD_WORD = gql`
  mutation addWord($word: WordInput!) {
    addWord(word: $word){
      id
      name
    }
  }
`;

export const DELETE_WORD = gql`
  mutation deleteWord($wordId: Int!) {
    deleteWord(wordId: $wordId){
      id
      name
    }
  }
`;