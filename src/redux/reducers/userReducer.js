import { FETCH_USER_SUCCESS, FETCH_USER_ERROR, FETCH_USER_LOGIN, USER_LOGOUT, USER_REFRESH } from '../actions/userAction';


const INITIAL_STATE = {

    account: {
        email: '',
        auth: null,
        token: ''
    },
    isLoading: false,
    isError: false
};

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_USER_LOGIN:

            return {

                ...state,
                isLoading: true,
                isError: false

            };

        case FETCH_USER_SUCCESS:
            console.log("check action : ", action)

            return {
                ...state,
                account: {
                    email: action.data.email,
                    token: action.data.token,
                    auth: true
                },
                isLoading: false,
                isError: false

            };
        case FETCH_USER_ERROR:

            return {
                ...state,
                account: {
                    auth: false
                },
                isLoading: false,
                isError: true
            };

        default: return state;

        case USER_LOGOUT:
            localStorage.removeItem("token")
            localStorage.removeItem("email")

            return {
                account: {
                    email: '',
                    token: '',
                    auth: false
                }
            }
        case USER_REFRESH:
            return {
                ...state,
                account: {
                    email: localStorage.getItem('email'),
                    token: localStorage.getItem('token'),
                    auth: true
                }
            }
    }

};

export default reducer;