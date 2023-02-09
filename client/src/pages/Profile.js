import React from 'react';
import { GET_ME } from '../utils/queries'
import { Container, Col, Row} from 'react-bootstrap';
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
        <Container fluid className='vh-100'>
            <Col className='m-5'>
                <Row className='p-3'>
                    <h2>Username: {user.username}</h2>
                </Row>
                <Row className='p-3'>
                    <h2>Email: {user.email}</h2>
                </Row>
                <Row className='p-3'>
                    <h2>Tasks pending: {user.taskCount}</h2>
                </Row>
            </Col>
        </Container>
    )
}

export default Profile