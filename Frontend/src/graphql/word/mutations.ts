import { gql } from "@apollo/client";

export const ADD_WORD = gql`
  mutation addWord($word: WordInput!) {
    addWord(word: $word){
      id
      name
    }
  }
`;