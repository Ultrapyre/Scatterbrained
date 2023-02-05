import { gql } from '@apollo/client';

export const GET_ME = gql`
    query getMe{
        me {
            _id
            username
            email
            friends
            friendCount
            savedTasks
            taskCount
          }
    }
`
export const GET_ONE_TASK = gql`
    query getOneTask{
        task(taskId: $taskId) {
            _id
            title
            username
            taskText
            createdAt
            participants {
            _id
            username
            }
            participantCount
        }
    }
`

export const GET_TASKS = gql`
    query getTasks{
        tasks{
            _id
            title
            createdAt
        }
    }
`