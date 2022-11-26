import axios from "./customize-axios"


const fetchAllUsers = (page) => {
    return axios.get(`api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return axios.post('api/users', { name, job })
}

const putUpdateUser = (name, job, page) => {
    return axios.put(`api/users/:${page}`, { name, job })
}

const deleteUser = (id) => {
    return axios.delete(`api/users/:${id}`)
}

const loginUser = (email, password) => {
    return axios.post("api/login", { email, password })
}

export { fetchAllUsers, postCreateUser, putUpdateUser, deleteUser, loginUser }