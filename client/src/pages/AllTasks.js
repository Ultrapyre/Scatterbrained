import React from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { useState, useQuery } from '@apollo/client';
//Import the GET_ME query from queries.
import { GET_TASKS } from '../utils/queries'
//Import the Task list.
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm';

const AllTasks = () => {
    //Shows and hides the Modal for adding a new Task.
    const [showModal, setShowModal] = useState(false);
    //Pull all the user's tasks from the database.
    const {loading, data} = useQuery(GET_TASKS)

    const tasks = data?.tasks || []

    if(loading){
        return (
            <h1>Grabbing data... gimme a sec!</h1>
        )
    }
    

    return (
        <Container fluid>
            <Button onClick={()=>setShowModal(true)}>Add a new Task</Button>
            <TaskList
                tasks = {tasks}
            />
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1>New Task</h1>
                    </Modal.Title>
                </Modal.Header>    
                <Modal.Body>
                    <TaskForm handleModalClose={()=>setShowModal(false)}/>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default AllTasks