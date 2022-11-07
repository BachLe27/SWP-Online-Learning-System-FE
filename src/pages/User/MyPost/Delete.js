import React, { useState } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userApi from '../../../_actions/userApi';
import { authAtom, toastAtom } from '../../../_state';

const Delete = ({ postId }) => {

   const token = useRecoilValue(authAtom);
   const [modalShow, setModalShow] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const navigate = useNavigate();
   const setToast = useSetRecoilState(toastAtom);

   const onHide = () => {
      setModalShow(false);
   }

   const onSubmit = async () => {
      setIsSubmitting(true);
      try {
         const deletePost = await userApi.deletePost(token, postId);

         setIsSubmitting(false);
         setToast({
            show: true,
            status: 'danger',
            msg: 'Post Deleted'
         })
         setModalShow(false);
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <>
         <Dropdown.Item onClick={() => setModalShow(true)} eventKey="delete">Delete</Dropdown.Item>

         <Modal show={modalShow} onHide={onHide} size="md">
            <Modal.Header closeButton>
               <Modal.Title>Delete Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p className='m-0 fw-bold'>
                  This post will be delete?
               </p>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={onHide}>Cancel</Button>
               <Button variant="danger" onClick={onSubmit} >
                  {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>} Delete
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   )
}

export default Delete