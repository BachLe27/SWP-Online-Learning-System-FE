import React, { useState } from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userApi from '../../../_actions/userApi';
import { authAtom, toastAtom } from '../../../_state';

const EditComment = ({ commentId, content }) => {

   const token = useRecoilValue(authAtom);
   const [modalShow, setModalShow] = useState(false);
   const setToast = useSetRecoilState(toastAtom);

   const onHide = () => {
      setModalShow(false);
      reset();
   }

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset
   } = useForm({
      mode: 'onTouch',
   });

   const onSubmit = async (data) => {
      try {
         const updateComment = await userApi.updateComment(token, commentId, data);
         setToast({
            show: true,
            status: 'primary',
            msg: 'Comment Edited'
         })
         setModalShow(false);
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <>
         <>
            <Dropdown.Item onClick={() => setModalShow(true)} eventKey="edit">Edit</Dropdown.Item>
            <Modal show={modalShow} onHide={onHide} size="lg">
               <Modal.Header closeButton>
                  <Modal.Title>Update Comment</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form id="editComment" onSubmit={handleSubmit(onSubmit)}>
                     <Form.Group className="mb-3" controlId="chapterTitle">
                        <Form.Label className='fw-bold'>Comment</Form.Label>
                        <Form.Control
                           {...register("content", {
                              required: true
                           })}
                           className={`${errors.content ? "is-invalid" : ""}`}
                           type="text"
                           placeholder="Enter category's name"
                           defaultValue={content}
                        />
                        <Form.Control.Feedback type="invalid">
                           Content is required
                        </Form.Control.Feedback>
                     </Form.Group>
                  </Form>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={onHide}>Cancel</Button>
                  <Button className="rounded-1 px-4 shadow fw-bold" type="submit" form="editComment" >
                     {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                     </div>} Update
                  </Button>
               </Modal.Footer>
            </Modal>
         </>
      </>
   )
}

export default EditComment