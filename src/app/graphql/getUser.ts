import { gql } from "@apollo/client";

export const GET_USER_ARRAY = gql`
query MyQuery {
  Page(page: 1) {
    users {
        name
      about
      avatar {
        medium
      }
      createdAt
      updatedAt
    }
  }
}

`;
