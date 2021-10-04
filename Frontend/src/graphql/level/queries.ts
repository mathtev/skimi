import { gql } from "@apollo/client";

export const GET_ALL_LEVELS = gql`
  query levels {
    levels {
      id
      difficulty
      code
    }
  }
`;
