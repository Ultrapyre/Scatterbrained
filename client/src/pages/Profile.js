import React from 'react';
import { GET_ME } from '../utils/queries'
import { Container, Row, Col} from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';

const Profile = () =>{
    
    //Boots the user back to the homepage if they aren't logged in.
    if(!Auth.loggedIn()){
        window.location.assign('/')
    }

    const {loading, data} = useQuery(GET_ME)

    const user = data?.me || {}

    if(loading){
        return (
        <Container fluid>
            <h1>Gimme a sec... data's coming in.</h1>
        </Container>
        )
    }

    return (
        <Container fluid>
            
        </Container>
    )
}

export default Profile