import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteUser } from '../services/UserService';

const ModalDeleteUser = (props) => {
  const { show, handleClose, dataDeleteUser, handleDeleteUserFormModal } = props;

  const handleConfirmDeleteUser = async (id) => {
    let res = await deleteUser(id);

    if (res && +res.statusCode === 204) {
      handleClose();
      toast.success('Delete success User')
      handleDeleteUserFormModal(dataDeleteUser);
    } else {
      toast.error('Error deleting User')
    }
    console.log("check res delete : ", res)
  }

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            This action can't be undone!
            Do want to delete this user :
            <br />
            <b>email = {dataDeleteUser.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleConfirmDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDeleteUser


