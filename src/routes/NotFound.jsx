import React from 'react'
import { Alert } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './NotFound.scss'

const NotFound = () => {
    return (
        <>
            <Alert variant="danger" className="d-flex justify-content-center flex-column align-items-center">
                <Alert.Heading>404 - Not Found!</Alert.Heading>
                <NavLink className="back" to="/">
                    <i className="fa-solid fa-angles-left icon" /> Go back
                </NavLink>
            </Alert>
        </>
    )
}

export default NotFound