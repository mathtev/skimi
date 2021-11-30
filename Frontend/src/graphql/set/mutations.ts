import { gql } from "@apollo/client";

export const CREATE_SET = gql`
  mutation createSet($set: SetInput!) {
    createSet(set: $set){
      id
      name
      createdAt
    }
  }
`;

export const DELETE_SET = gql`
  mutation deleteSet($id: Int!) {
    deleteSet(id: $id){
      id
      name
      createdAt
    }
  }
`;
