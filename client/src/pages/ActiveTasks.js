import React, {useQuery} from 'react';
//Import the GET_ME query from queries.
import { GET_ME } from '../utils/queries'
//Import the Task list.
import TaskList from '../components/TaskList'

const ActiveTasks = () => {

    //Pull all the user's tasks from the database.
    const {loading, data} = useQuery(GET_ME)
    let userData
    if(data){
        userData = data.me
    }

    return (
        <>
            {loading ? (
                <h2>Please wait, data's coming in...</h2>
            ) : (
                <TaskList
                    tasks = {userData.savedTasks}
                />
            )}
        </>
    )
}

export default ActiveTasks