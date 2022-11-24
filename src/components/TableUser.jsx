import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import ReactPaginate from 'react-paginate';
import { fetchAllUsers } from '../services/UserService';
import ModalAddNewUser from './ModalAddNewUser'
import ModalEditUser from './ModalEditUser';
import _, { debounce } from "lodash";
import ModalDeleteUser from './ModalDeleteUser';
import './TableUser.scss'

const TableUser = () => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNewUser, setIsShowModalAddNewUser] = useState(false)

    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false)
    const [dataEditUser, setDataEditUser] = useState({})

    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false)
    const [dataDeleteUser, setDataDeleteUser] = useState({})

    const [sortBy, setSortBy] = useState("asc")
    const [sortField, setSortField] = useState("id")

    const handleClose = () => {
        setIsShowModalAddNewUser(false)
        setIsShowModalEditUser(false);
        setIsShowModalDeleteUser(false);
    }

    useEffect(() => {
        getAllUsers(1)
    }, [])

    const getAllUsers = async (page) => {
        const res = await fetchAllUsers(page);

        if (res && res.data) {
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
            setListUsers(res.data)
        }

    }

    const handlePageClick = (event) => {
        console.log('check event', event)
        getAllUsers(+event.selected + 1)
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }

    const handleEditUser = (user) => {
        setDataEditUser(user)
        setIsShowModalEditUser(true)
    }

    const handleDeleteUser = (user) => {
        setDataDeleteUser(user)
        setIsShowModalDeleteUser(true)
    }

    const handleEditUserFormModal = (user) => {
        const cloneListUsers = _.cloneDeep(listUsers);
        const index = cloneListUsers.findIndex(item => item.id === user.id)
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    }

    const handleDeleteUserFormModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        console.log(cloneListUsers);
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
        setListUsers(cloneListUsers);
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
        console.log("check clone ", cloneListUsers);
        setListUsers(cloneListUsers);
    }

    const handleSearchUserByEmail = debounce((e) => {
        let term = e.target.value;

        console.log("check:", term);
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
            setListUsers(cloneListUsers);
        } else {
            getAllUsers(1);
        }

    }, 500)

    return (
        <>
            <div className="my-3 add-new d-flex justify-content-between">
                <span><b>List Users: </b></span>
                <button
                    className="btn btn-success"
                    onClick={() => setIsShowModalAddNewUser(true)}
                >Add New User</button>
            </div>
            <div className="col-4 my-3">
                <input className="form-control" type="text" placeholder="Search user by email..." onChange={(e) => handleSearchUserByEmail(e)} />
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className="d-flex align-items-center justify-content-between">
                                <span>ID</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort("desc", "id")} />
                                    <i className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort("asc", "id")} />
                                </span>
                            </div>
                        </th>
                        <th>Email</th>
                        <th>
                            <div className="d-flex align-items-center justify-content-between">
                                <span>First Name</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort("desc", "first_name")} />
                                    <i className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort("asc", "first_name")} />
                                </span>
                            </div>
                        </th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, i) => {
                            return (
                                <tr key={`user-${i}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning mx-2"
                                            onClick={() => handleEditUser(item)}
                                        >Edit</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteUser(item)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageCount={totalPages}
                pageRangeDisplayed={5}
                previousLabel="< Previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddNewUser
                show={isShowModalAddNewUser}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditUser
                show={isShowModalEditUser}
                handleClose={handleClose}
                dataEditUser={dataEditUser}
                handleEditUserFormModal={handleEditUserFormModal}
            />
            <ModalDeleteUser
                show={isShowModalDeleteUser}
                handleClose={handleClose}
                dataDeleteUser={dataDeleteUser}
                handleDeleteUserFormModal={handleDeleteUserFormModal}
            />
        </>
    )
}

export default TableUser