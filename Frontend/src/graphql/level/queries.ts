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

export const GET_USER_LEVEL = gql`
  query getUserLevel {
    getUserLevel {
      id
      difficulty
      code
    }
  }
`;
