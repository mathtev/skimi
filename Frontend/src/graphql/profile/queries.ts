import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      id
      name
      user {
        id
        email
        login
      }
      sets {
        id
        name
      }
    }
  }
`;

