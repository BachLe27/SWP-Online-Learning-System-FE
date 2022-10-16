import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import expertApi from '../../../_actions/expertApi';
import Loading from '../../../components/Loading';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, toastAtom } from '../../../_state';
import ToastNoti from '../../../components/ToastNoti';


const AddChapterModal = ({ courseId }) => {

   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);

   const onSubmit = async (data) => {
      try {
         const id = courseId;
         const addChapter = await expertApi.createChapter(token, id, data);
         // console.log(addChapter);
         // set
         setToast({
            show: true,
            status: 'primary',
            msg: 'Add Chapter Success'
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
         <Button onClick={() => setModalShow(true)}> <i class="fa-solid fa-plus"></i> Add Chapter</Button>

         <Modal show={modalShow} onHide={onHide} size="lg">
            <Modal.Header closeButton>
               <Modal.Title>New Chapter</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               <Form id="addChapterForm" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="chapterTitle">
                     <Form.Label>Chapter Title</Form.Label>
                     <Form.Control
                        {...register("title", {
                           required: true
                        })}
                        className={`${errors.title ? "is-invalid" : ""}`}
                        type="text"
                        placeholder="Enter title"
                     />
                     <Form.Control.Feedback type="invalid">
                        Chapter title is required
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="chapterDescription">
                     <Form.Label>Description</Form.Label>
                     <Form.Control
                        {...register("description", {
                           required: true
                        })}
                        className={`${errors.description ? "is-invalid" : ""}`}
                        as="textarea"
                        placeholder="Description about chapter..."
                     />
                     <Form.Control.Feedback type="invalid">
                        Chapter description is required
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

export default AddChapterModal