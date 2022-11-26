import logoReact from '../assets/images/logoReact.png'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../redux/actions/userAction'
import { useEffect } from 'react';

const Header = (prop) => {
    const user = useSelector(state => state.user.account)
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleLogOut = () => {
        dispatch(handleLogoutRedux())
    }

    useEffect(() => {
        if (user && user.auth === false && window.location.pathname !== '/login') {
            navigate('/')
            toast.success("Log out is success!")
        }
    }, [user])

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
                        {(user && user.auth || window.location.pathname === '/') &&
                            <>
                                <Nav className="me-auto">
                                    <NavLink to="/" className="nav-link">Home</NavLink>
                                    <NavLink to="/users" className="nav-link">Manage Users</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.email && <span className="nav-link">Welcome <b>{user.email}</b></span>}
                                    <NavDropdown title="Setting">
                                        {user && user.auth === true
                                            ?
                                            <NavDropdown.Item onClick={() => handleLogOut()}>Log Out</NavDropdown.Item>
                                            :
                                            <NavLink className="dropdown-item" to="/login">Log In</NavLink>
                                        }
                                    </NavDropdown>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header