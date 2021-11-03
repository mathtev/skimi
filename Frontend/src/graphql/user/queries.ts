import { gql } from "@apollo/client";

export const LOGIN = gql`
  query login($username: String!, $password: string!) {
    login(username: $username, password: $password) {
      id
      email
      login
    }
  }
`;

