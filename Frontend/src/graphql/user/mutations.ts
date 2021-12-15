import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      login
    }
  }
`;

export const REGISTER = gql`
  mutation register($input: UserInput!) {
    register(userInput: $input) {
      id
      email
      login
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

