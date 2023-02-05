import React, { useState } from 'react';
//A series of components for putting the navbar together,
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
//Lets the Router on the main App toggle between pages
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
//Adds the login/signup forms for the Modal to use.
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';

const AppNavbar = () => {

    //Toggles the login form to show or not show on the site.
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Navbar>
                <Container fluid>
                    <Navbar.Brand as={Link} to='/'>
                    Home
                    </Navbar.Brand>
                    {/* A toggle that opens and closes */}
                    <Navbar.Toggle aria-controls='navbar' />
                    <Navbar.Collapse id='navbar'>
                        <Nav className='ml-auto'>
                            
                            {/* Displays the login/logout button depending on login status*/}
                            {Auth.loggedIn() ? (
                            <>
                            <Nav.Link as={Link} to='/tasks'>My Tasks</Nav.Link> 
                            <Nav.Link as={Link} to='/profile'>My Profile</Nav.Link> 
                            <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                            </>
                            ) : (
                            <>
                            <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                            </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Makes a window pop in and out when clicking on the Login/Signup Nav.Link */}
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='signup-modal'>
                {/* tab container to do either signup or login component */}
                <Tab.Container defaultActiveKey='login'>
                <Modal.Header closeButton   >
                    <Modal.Title id='signup-modal'>
                    <Nav variant='pills'>
                        <Nav.Item>
                        <Nav.Link eventKey='login'>Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tab.Content>
                    <Tab.Pane eventKey='login'>
                        <LoginForm handleModalClose={() => setShowModal(false)} />
                    </Tab.Pane>
                    <Tab.Pane eventKey='signup'>
                        <SignUpForm handleModalClose={() => setShowModal(false)} />
                    </Tab.Pane>
                    </Tab.Content>
                </Modal.Body>
                </Tab.Container>
            </Modal>
        </>
    )
}

export default AppNavbar;