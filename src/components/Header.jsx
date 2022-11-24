import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import logoReact from '../assets/images/logoReact.png'

const Header = (prop) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logoReact}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap Logo"
                        />
                        <span>Tobi</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className="nav-link">Home</NavLink>
                            <NavLink to="/users" className="nav-link">Manage Users</NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Setting">
                                <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
                                <NavDropdown.Item href="/logout">Log Out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header