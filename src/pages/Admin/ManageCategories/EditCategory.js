import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil';
import ToastNoti from '../../../components/ToastNoti';
import staffApi from '../../../_actions/staffApi';
import { authAtom, toastAtom } from '../../../_state';

const EditCategory = ({ category }) => {

   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);

   const onSubmit = async (data) => {
      try {
         const addCategory = await staffApi.updateCategory(token, category.id, data);
         // console.log(addChapter);
         // set
         setToast({
            show: true,
            status: 'primary',
            msg: 'Updated Category'
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
         <Link onClick={() => setModalShow(true)}>Edit</Link>

         <Modal show={modalShow} onHide={onHide} size="md" centered>
            <Modal.Header closeButton>
               <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               <Form id="editCategoryForm" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="chapterTitle">
                     <Form.Label className='fw-bold'>Category Name</Form.Label>
                     <Form.Control
                        {...register("name", {
                           required: true
                        })}
                        className={`${errors.name ? "is-invalid" : ""}`}
                        type="text"
                        placeholder="Enter category's name"
                        defaultValue={category.name}
                     />
                     <Form.Control.Feedback type="invalid">
                        Category name is required
                     </Form.Control.Feedback>
                  </Form.Group>
               </Form>
            </Modal.Body>

            <Modal.Footer>
               <Button variant="secondary" onClick={onHide}>Close</Button>
               <Button className="rounded-1 px-4 shadow fw-bold" variant="warning" type="submit" form="editCategoryForm" >
                  {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>} Update
               </Button>
            </Modal.Footer>
         </Modal>
         <ToastNoti />
      </>
   )
}

export default EditCategory