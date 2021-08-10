import { gql } from "@apollo/client";

export const GET_ALL_LESSONS = gql`
  query {
    getAllLessons {
      id
      title
      description
    }
  }
`;
