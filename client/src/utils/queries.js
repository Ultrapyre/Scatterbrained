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
export const GET_TASK = gql`
    query getTask{
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