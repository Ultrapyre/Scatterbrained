import React, {useState} from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
//Import the GET_ME query from queries.
import { GET_TASKS } from '../utils/queries'
//Import the Task list.
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm';
//Import Auth to check if user is logged in.
import Auth from '../utils/auth'

const AllTasks = () => {
    //Shows and hides the Modal for adding a new Task.
    const [showModal, setShowModal] = useState(false);
    //Pull all the user's tasks from the database.
    const {loading, data} = useQuery(GET_TASKS)

    const tasks = data?.tasks || []

    //Boots the user back to the homepage if they aren't logged in.
    if(!Auth.loggedIn()){
        window.location.assign('/')
    }

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
                    <TaskForm onSubmit={()=>setShowModal(false)}/>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default AllTasks