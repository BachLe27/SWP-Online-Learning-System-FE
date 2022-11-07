import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil';
import ToastNoti from '../../../components/ToastNoti';
import staffApi from '../../../_actions/staffApi';
import { authAtom, toastAtom } from '../../../_state';

const DeleteCategory = ({ category }) => {

   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);


   const onSubmit = async () => {
      setIsSubmitting(true);
      try {
         const deleteCategory = await staffApi.deleteCategory(token, category.id);
         // console.log(addChapter);
         // set
         setToast({
            show: true,
            status: 'danger',
            msg: 'Category Deleted'
         })
         setIsSubmitting(false);
         setModalShow(false);
      } catch (error) {
         console.log(error);
      }
   }


   const onHide = () => {
      setModalShow(false)
   }

   return (
      <>
         <Link onClick={() => setModalShow(true)}>Delete</Link>

         <Modal show={modalShow} onHide={onHide} size="md" centered>
            <Modal.Header closeButton>
               <Modal.Title className='text-danger'>Delete Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p className='fw-bold'>
                  This category will be delete and all course in this category will be delete. Are you sure?
               </p>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={onHide}>Close</Button>
               <Button className="rounded-1 px-4 shadow fw-bold" variant="danger" onClick={onSubmit} form="editCategoryForm" >
                  {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>} Delete
               </Button>
            </Modal.Footer>
         </Modal>
         <ToastNoti />
      </>
   )
}

export default DeleteCategory