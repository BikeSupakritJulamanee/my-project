import React from 'react'

import { Container, Nav, Navbar } from 'react-bootstrap';

import './style/Nav-Bar.css'


function Nav_Bar() {
    return (
        <div>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#"> <div className='Brand' > ignore</div></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/searching">Search</Nav.Link>
                        <Nav.Link href="/message">Message</Nav.Link>
                        <Nav.Link href="/notifications">Notification</Nav.Link>
                        <Nav.Link href="/create_post">Create</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Nav_Bar