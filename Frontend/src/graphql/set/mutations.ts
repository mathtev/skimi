import { gql } from "@apollo/client";

export const CREATE_SET = gql`
  mutation createSet($set: SetInput!) {
    createSet(set: $set){
      id
      name
      created_at
    }
  }
`;
