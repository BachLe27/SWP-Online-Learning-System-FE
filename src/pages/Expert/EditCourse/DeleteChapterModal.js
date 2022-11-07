import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useRecoilState, useRecoilValue } from 'recoil';
import expertApi from '../../../_actions/expertApi';
import { authAtom, toastAtom } from '../../../_state';

const DeleteChapterModal = ({ chapterId }) => {

   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);
   const [data, setData] = useState();
   const [isSubmitting, setIsSubmitting] = useState(false);

   const onSubmit = async () => {
      setIsSubmitting(true);
      try {
         const deleteChapter = await expertApi.deleteChapter(token, chapterId);
         console.log(deleteChapter);
         setIsSubmitting(false);
         setToast({
            show: true,
            status: 'danger',
            msg: 'Chapter Deleted'
         })
         setModalShow(false);
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
               <Modal.Title className='text-danger'>Delete Chapter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p className='m-0 fw-bold'>
                  This Chapter will be delete and all content of this chapter also delete. Are you sure?
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

export default DeleteChapterModal