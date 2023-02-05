import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Alert, Form , Button} from "react-bootstrap";
import Auth from "../utils/auth";
import { ADD_TASK, UPDATE_TASK } from "../utils/mutations";
import { GET_TASKS } from "../utils/queries";

const TaskForm = ({taskId}) => {
    //Either there is a taskId, or there isn't.
    const selectedTask = taskId || ''
    //State to control the form's input fields
    const [taskFormData, setTaskFormData] = useState({title: '', taskText: ''})
    //State to display an Alert if something breaks.
    const [showAlert, setShowAlert] = useState(false)
    const [validated] = useState(false);
    //Mutation to handle post request. Also updates the tasklist without a reload.
    const [addTask] = useMutation(ADD_TASK, {
        update(cache, {data: {addTask}}) {
            try {
                const { tasks } = cache.readQuery({ query: GET_TASKS})

                cache.writeQuery({
                    query: GET_TASKS,
                    data: { tasks: [addTask, ...tasks] }
                })
            } 
            catch (err) {
                console.error(err)
            }
        }
    })
    //Mutation to handle put request, updates the list.
    const [updateTask] = useMutation(UPDATE_TASK, {
        update(cache, {data: {updateTask}}) {
            try {
                const { tasks } = cache.readQuery({ query: GET_TASKS})

                cache.writeQuery({
                    query: GET_TASKS,
                    data: { tasks: [updateTask, ...tasks] }
                })
            } 
            catch (err) {
                console.error(err)
            }
        }
    })

    //When something is inputted, adjust the task form Data's contents.
    const handleInputChange = async (event) => {
        const {name , value} = event.target
        setTaskFormData({...taskFormData, [name]: value})
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        //If an ID is present, run the updateTask mutation instead. Otherwise run the addTask mutation.
        if(selectedTask){
            try {
                const username = Auth.getProfile().data.username
                await updateTask({
                    variables: {
                        taskId: selectedTask,
                        task: {...taskFormData, username}
                    }
                })
                window.location.assign(`/tasks/${taskId}`)
            } 
            catch (err) {
                console.error(err);
                setShowAlert(true);
            }
        }
        else{
            try {
                const username = Auth.getProfile().data.username
                await addTask({
                    variables: {task: {...taskFormData, username}}
                })
                window.location.assign('/tasks')
            } 
            catch (err) {
                console.error(err);
                setShowAlert(true);
            }
        }
        //Clears the form.
        setTaskFormData({title: '', taskText: ''})
    }

    return(
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Alert dismissible onClose={()=>setShowAlert(false)} show={showAlert} variant='danger'>
                Oh dear, something broke. Give some time for our code monkeys to fix this...
            </Alert>
            <Form.Group>
                <Form.Label htmlFor="title">Title:</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder='Add a fitting title!'
                    name='title'
                    onChange={handleInputChange}
                    value={taskFormData.title}
                    required
                />
                <Form.Control.Feedback type='invalid'>A title is required!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="taskText">Your Task:</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder='So what is the task you got?'
                    name='taskText'
                    onChange={handleInputChange}
                    value={taskFormData.taskText}
                    required
                />
                <Form.Control.Feedback type='invalid'>A description is required!</Form.Control.Feedback>
            </Form.Group>

            <Button
                disabled={!(taskFormData.title && taskFormData.taskText)}
                type='submit'
                variant='success'>
                    Submit Task
            </Button>
        </Form>
    )
}

export default TaskForm