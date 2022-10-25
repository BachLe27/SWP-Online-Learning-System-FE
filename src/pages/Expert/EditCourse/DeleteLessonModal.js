import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useRecoilState, useRecoilValue } from 'recoil';
import expertApi from '../../../_actions/expertApi';
import { authAtom, toastAtom } from '../../../_state';

const DeleteLessonModal = ({ lessonId }) => {

   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const onSubmit = async () => {
      console.log(lessonId);

      setIsSubmitting(true);
      try {
         const deleteChapter = await expertApi.deleteLesson(token, lessonId);
         console.log(deleteChapter);
         setIsSubmitting(false);
         setModalShow(false);
         setToast({
            show: true,
            status: 'danger',
            msg: 'Lesson Deleted'
         })
      } catch (error) {
         console.log(error);
      }
   }

   const onHide = () => {
      setModalShow(false);
   }

   return (
      <>
         <Button variant="danger" className="mb-2" onClick={() => setModalShow(true)}>
            <i class="fa-solid fa-trash"></i>
         </Button>

         <Modal show={modalShow} onHide={onHide} size="md" centered>
            <Modal.Header closeButton>
               <Modal.Title className='text-danger'>Delete Lesson</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p className='m-0 fw-bold'>
                  This Lesson and all content of it will be delete. Are you sure?
               </p>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={onHide}>Close</Button>
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

export default DeleteLessonModal