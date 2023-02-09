import React from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

//This component accept an array of queried tasks and returns an entire list of them.
const TaskList = ({tasks}) => {

    if (!tasks.length) {
        return (
            <Container fluid>
                <h1>No tasks added yet! Go ahead and add a new one!</h1>
            </Container>
        )
    }

    return (
        <Container fluid>
            {tasks && tasks.map((task) => (
                <Card className='p-3 bg-secondary' key={task._id}>
                    <h1>{task.title}</h1>
                    <p>{task.createdAt}</p>
                    <Link className='btn bg-light' to={`/tasks/${task._id}`}>Details</Link>
                </Card>
            ))}
        </Container>
    )
}

export default TaskList