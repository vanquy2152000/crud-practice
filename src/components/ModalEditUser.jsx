import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../services/UserService';

const ModalEditUser = (props) => {
  const { show, handleClose, dataEditUser, handleEditUserFormModal } = props;
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleConfirmEditUser = async () => {
    const res = await putUpdateUser(name, job);
    if (res && res.updatedAt) {
      handleEditUserFormModal({ first_name: name, id: dataEditUser.id })
      handleClose();
      toast.success('A User is Updated Success')
    } else {
      toast.error('A User is not Updated')
    }
  }

  useEffect(() => {
    if (show) {
      setName(dataEditUser.first_name)
    }
  }, [dataEditUser])

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="email" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Job</label>
            <input type="text" className="form-control" value={job} onChange={(e) => setJob(e.target.value)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleConfirmEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalEditUser


