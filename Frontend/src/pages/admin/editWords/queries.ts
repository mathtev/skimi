import { gql } from "@apollo/client";

export const GET_ALL_WORDS = gql`
  query {
    getAllWords {
      id
      name
    }
  }
`;
