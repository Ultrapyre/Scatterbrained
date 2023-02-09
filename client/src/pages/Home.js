import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';
import { GET_ME } from '../utils/queries'

const Home = () => {

    const { loading, data } = useQuery(GET_ME)
    
    const user = data?.me || {}

    return (
        <Container fluid>
            <Row className='m-3'>
                <Col>
                    <h1 className='p-3'>Scatterbrained</h1>
                    <h2 className='p-3'>Planning made (slightly) simpler!</h2>
                </Col> 
                {Auth.loggedIn() && (
                <Col>
                    <h2 className='p-3'>Welcome back, {user.username}!</h2>
                </Col>
                )}  
            </Row>
        </Container>
    )
}

export default Home