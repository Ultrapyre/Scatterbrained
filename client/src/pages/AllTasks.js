import React from 'react';
import { useQuery } from '@apollo/client';
//Import the GET_ME query from queries.
import { GET_TASKS } from '../utils/queries'
//Import the Task list.
import TaskList from '../components/TaskList'

const AllTasks = () => {

    //Pull all the user's tasks from the database.
    const {loading, data} = useQuery(GET_TASKS)

    const tasks = data?.tasks || []

    if(loading){
        return (
            <h1>Grabbing data... gimme a sec!</h1>
        )
    }
    

    return (
        <>
            <TaskList
            tasks = {tasks}
            />
        </>
    )
}

export default AllTasks