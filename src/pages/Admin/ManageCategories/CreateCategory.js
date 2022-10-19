import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, toastAtom } from '../../../_state';
import ToastNoti from '../../../components/ToastNoti';
import staffApi from '../../../_actions/staffApi';

const CreateCategory = () => {

   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);

   const onSubmit = async (data) => {
      try {
         const addChapter = await staffApi.createCategory(token, data);
         // console.log(addChapter);
         // set
         setToast({
            show: true,
            status: 'primary',
            msg: 'Add Category Success :3'
         })
         reset();
         setModalShow(false);
      } catch (error) {
         console.log(error);
      }
   }

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset
   } = useForm({
      mode: 'onTouch',
   });

   const onHide = () => {
      setModalShow(false)
   }

   return (
      <>
         <Button onClick={() => setModalShow(true)}> <i class="fa-solid fa-plus"></i> New</Button>

         <Modal show={modalShow} onHide={onHide} size="md">
            <Modal.Header closeButton>
               <Modal.Title>New Category</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               <Form id="addChapterForm" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="chapterTitle">
                     <Form.Label className='fw-bold'>Category Name</Form.Label>
                     <Form.Control
                        {...register("name", {
                           required: true
                        })}
                        className={`${errors.name ? "is-invalid" : ""}`}
                        type="text"
                        placeholder="Enter category's name"
                     />
                     <Form.Control.Feedback type="invalid">
                        Chapter title is required
                     </Form.Control.Feedback>
                  </Form.Group>
               </Form>
            </Modal.Body>

            <Modal.Footer>
               <Button variant="secondary" onClick={onHide}>Close</Button>
               <Button variant="primary" type="submit" form="addChapterForm" >
                  {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>} Add
               </Button>
            </Modal.Footer>
         </Modal>
         <ToastNoti />
      </>
   )
}

export default CreateCategory