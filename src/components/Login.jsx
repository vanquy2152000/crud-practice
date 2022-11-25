import React, { useContext, useEffect, useState } from 'react';
import './Login.scss'
import { toast } from 'react-toastify';
import { login } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const { loginContext } = useContext(UserContext)

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [passwork, setPasswork] = useState('')
    const [isShowPasswork, setIsShowPasswork] = useState(false)
    const [loadingAPI, setLoadingAPI] = useState(false);

    const handleLogin = async () => {
        if (!email || !passwork) {
            toast.error("Email/Passwork is required!");
            return;
        }
        setLoadingAPI(true);

        let res = await login(email.trim(), passwork);

        if (res && res.token) {
            loginContext(email, res.token)
            navigate('/')
            toast.success("Log in is success")
        } else {
            // error
            if (res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoadingAPI(false);
    }

    const handleEnterPress = (event) => {
        console.log(event)
        if (event.key === 'Enter') {

            handleLogin()
        }
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
                    type={isShowPasswork === true ? "text" : "password"}
                    placeholder="Password..."
                    onChange={(e) => setPasswork(e.target.value)}
                    onKeyDown={handleEnterPress}
                />
                <i className={isShowPasswork === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPasswork(!isShowPasswork)}
                />
            </div>

            <button
                className={email && passwork ? "active" : ""}
                disabled={email && passwork ? false : true}
                onClick={() => handleLogin()}
            >
                {loadingAPI && <i className="fas fa-spinner fa-spin"></i>}
                &nbsp;Login
            </button>
            <div className="back">
                <i className="fa-solid fa-angles-left" /> Go back
            </div>
        </div>
    )
}

export default Login