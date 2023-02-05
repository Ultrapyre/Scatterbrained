import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';
import { GET_ME } from '../utils/queries'

const Home = () => {

    const { loading, data } = useQuery(GET_ME)
    
    const user = data?.me || {}

    return (
        <Container fluid className='bg-light'>
            <Row md={6}>
                <Col md={6}>
                    <h1>Scatterbrained</h1>
                    <h2>Planning made (slightly) simpler!</h2>
                </Col> 
                {Auth.loggedIn() && (
                <Col md={6}>
                    <h2>Welcome back, {user.username}!</h2>
                </Col>
                )}  
            </Row>
        </Container>
    )
}

export default Home