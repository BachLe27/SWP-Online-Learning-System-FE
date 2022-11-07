import React, { useState } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userApi from '../../../_actions/userApi';
import { authAtom, toastAtom } from '../../../_state';

const DeleteComment = ({ commentId }) => {

  const token = useRecoilValue(authAtom);
  const [modalShow, setModalShow] = useState(false);

  const setToast = useSetRecoilState(toastAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onHide = () => {
    setModalShow(false);
  }

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const deleteComment = await userApi.deleteComment(token, commentId);

      setIsSubmitting(false);
      setToast({
        show: true,
        status: 'danger',
        msg: 'Comment Deleted'
      })
      setModalShow(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <>
        <Dropdown.Item onClick={() => setModalShow(true)} eventKey="delete">Delete</Dropdown.Item>
        <Modal show={modalShow} onHide={onHide} size="md" centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className='m-0 fw-bold'>
              This comment will be delete?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>Cancel</Button>
            <Button className="rounded-1 px-4 shadow fw-bold" variant="danger" onClick={onSubmit} >
              {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>} Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  )
}

export default DeleteComment