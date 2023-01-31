import { gql } from '@apollo/client';

//Send email and password values, expect a token and a user id.
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password) {
            token
            user {
              _id
            }
        }
    }
`
//Send username, email and password, expect a token and a user id.
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
              _id
            }
        }
    }
`