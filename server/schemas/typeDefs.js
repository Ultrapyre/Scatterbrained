const { gql } = require('apollo-server-express')

const TypeDefs = gql`
    input TaskData {
        title: String!
        username: String!
        taskText: String!
    }

    type User {
        _id: ID
        username: String
        email: String
        friends: [User]
        friendCount: Int
        savedTasks: [Task]
        taskCount: Int
    }

    type Task {
        _id: ID
        title: String!
        username: String!
        taskText: String!
        createdAt: String
        participants: [User]
        participantCount: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        task(taskId: ID!): Task
        tasks(username: String!): [Task]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addTask(task: TaskData!): Task
        updateTask(taskId: ID!, taskText: String!): Task
        removeTask(taskId: ID!): Task
    }
`

module.exports = TypeDefs;