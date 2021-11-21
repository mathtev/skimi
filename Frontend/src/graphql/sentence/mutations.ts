import { gql } from "@apollo/client";

export const CREATE_SENTENCE = gql`
  mutation createSentence($sentence: SentenceInput!) {
    createSentence(sentence: $sentence){
      id
      textFrom
      textTo
    }
  }
`;