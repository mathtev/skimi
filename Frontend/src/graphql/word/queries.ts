import { gql } from "@apollo/client";

export const GET_ALL_WORDS = gql`
  query words {
    words {
      id
      name
      language_id
      level_id
    }
  }
`;

