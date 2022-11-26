import React, { useContext, useEffect, useState } from 'react';
import './Login.scss'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { handleLoginRedux } from '../redux/actions/userAction.js'
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)

    const isLoading = useSelector(state => state.user.isLoading)
    const account = useSelector(state => state.user.account)

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required!");
            return;
        }

        dispatch(handleLoginRedux(email, password))
    }

    useEffect(() => {
        if (account && account.auth === true) {
            navigate('/')
        }
    }, [account])

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin()
        }
    }
    const handleGoBack = () => {
        navigate('/')
    }


    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title">Log in</div>
            <div className="text">Email or username (eve.holt@reqres.in)</div>
            <input
                type="text"
                placeholder="Email or Username..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="input-2">
                <input
                    type={isShowPassword === true ? "text" : "password"}
                    placeholder="Password..."
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleEnterPress}
                />
                <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                />
            </div>

            <button
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >
                {isLoading && <i className="fas fa-spinner fa-spin"></i>}
                &nbsp;Login
            </button>
            <div className="back" onClick={() => handleGoBack()}>
                <i className="fa-solid fa-angles-left" /> Go back
            </div>
        </div>
    )
}

export default Login