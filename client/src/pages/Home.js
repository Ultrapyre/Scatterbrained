import React, {useState} from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';
import { GET_ME } from '../utils/queries'

const Home = () => {

    const [activeTasks, setActiveTasks] = useState([]);

    const {loading, data} = useQuery(GET_ME)

    return (
        <>
        </>
    )
}

export default Home