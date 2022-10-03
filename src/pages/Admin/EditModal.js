
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';

const EditModal = ({ user }) => {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   console.log(user);

   return (
      <Modal id={`edit-${user.id}`}>
         <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <p>{user.id}</p>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
               Save Changes
            </Button>
         </Modal.Footer>
      </Modal>
   );
}

export default EditModal;