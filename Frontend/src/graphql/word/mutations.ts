import { gql } from "@apollo/client";

export const CREATE_WORD = gql`
  mutation createWord($word: WordInput!) {
    createWord(word: $word){
      id
      name
    }
  }
`;