import React from 'react';
import { Container, Card } from 'react-bootstrap';
//useParams pulls the ID from the URL for the website's use.
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
//Import the GET_ONE_TASK query from utils
import { GET_ONE_TASK } from '../utils/queries'

const SingleTask = () => {
    //Pull in data for a single task, with the taskId parameter as a prerequisite.
    const { taskId } = useParams()
    const { loading , data } = useQuery(GET_ONE_TASK, {
        variables: {taskId: taskId}
    })
    //Either the task variable is empty, or filled with the data from the query.
    const task = data?.task || {}
    //If the data's still coming in, pull up a loading screen.
    if(loading){
        return <h1>Gimme a sec... loading task.</h1>
    }

    return (
        <Container fluid>
            <Card.Header>
                <h1>{task.title}</h1>
                <h3>Created by {task.username} on {task.createdAt}</h3>
            </Card.Header>
            <Card.Text>{task.taskText}</Card.Text>
        </Container>
    )
}

export default SingleTask