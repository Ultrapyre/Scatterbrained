const { gql } = require('apollo-server-express')

const TypeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        friends: [ID]
        friendCount: Int
        savedTasks: [ID]
        taskCount: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
    }
`

module.exports = TypeDefs;