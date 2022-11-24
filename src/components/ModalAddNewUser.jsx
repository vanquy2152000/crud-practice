import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { postCreateUser } from '../services/UserService';

const ModalAddNewUser = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleSaveUser = async () => {
    const res = await postCreateUser(name, job);

    if (res && res.id) {
      handleClose();
      setName('');
      setJob('');
      handleUpdateTable({ first_name: name, id: res.id });
      toast.success('A User is created success')
    } else {
      toast.error('A User is not created');
    }
  }

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalAddNewUser


