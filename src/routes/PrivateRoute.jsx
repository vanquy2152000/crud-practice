import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const PrivateRoute = (props) => {
    const user = useSelector(state => state.user.account)

    if (user && !user.auth) {
        return <>
            <Alert variant="danger" className="mt-3">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    You don't have permission to acess this route.
                </p>
                <NavLink className="back" to="/">
                    <i className="fa-solid fa-angles-left icon" /> Go back
                </NavLink>
            </Alert>
        </>
    }
    return (
        <>{props.children}</>
    )
}

export default PrivateRoute