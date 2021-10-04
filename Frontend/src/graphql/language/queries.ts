import { gql } from "@apollo/client";

export const GET_ALL_LANGUAGES = gql`
  query languages {
    languages {
      id
      name
      code
    }
  }
`;
