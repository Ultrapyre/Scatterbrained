import React, { useState } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';
//useParams pulls the ID from the URL for the website's use.
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
//Import the GET_ONE_TASK query from utils
import { GET_ONE_TASK } from '../utils/queries'
//Add the TaskForm for updating
import TaskForm from '../components/TaskForm';
import { REMOVE_TASK } from '../utils/mutations';
//Import Auth to check if user is logged in.
import Auth from '../utils/auth'

const SingleTask = () => {
    //Toggles the Modal for updating the task.
    const [showModal, setShowModal] = useState(false);
    //Pull in data for a single task, with the taskId parameter as a prerequisite.
    const { taskId } = useParams()
    const { loading , data } = useQuery(GET_ONE_TASK, {
        variables: {taskId: taskId}
    })
    //A mutation for removing the saved task in question.
    const [removeTask] = useMutation(REMOVE_TASK)
    //Either the task variable is empty, or filled with the data from the query.
    const task = data?.task || {}

    //Boots the user back to the homepage if they aren't logged in.
    if(!Auth.loggedIn()){
        window.location.assign('/')
    }

    const handleRemoveTask = async (taskId) => {
        try {
            await removeTask({variables: {taskId}})
            window.location.assign('/tasks')   
        } 
        catch (err) {
            console.error(err);
        }
    }

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
            <Card.Footer>
                <Button onClick={()=>setShowModal(true)}>Update Task</Button>
                <Button onClick={()=>handleRemoveTask(taskId)}>Delete Task</Button>
            </Card.Footer>

            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1>Update Task</h1>
                    </Modal.Title>
                </Modal.Header>    
                <Modal.Body>
                    <TaskForm taskId={taskId} handleModalClose={()=>setShowModal(false)}/>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default SingleTask