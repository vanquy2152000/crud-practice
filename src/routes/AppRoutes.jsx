import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import Home from '../components/Home';
import Login from '../components/Login';
import TableUser from '../components/TableUser';
import NotFound from './NotFound';

const AppRoutes = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users"
                    element={
                        <PrivateRoute>
                            <TableUser />
                        </PrivateRoute>
                    } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default AppRoutes