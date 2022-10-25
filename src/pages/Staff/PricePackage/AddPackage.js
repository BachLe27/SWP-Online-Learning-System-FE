import React, { useState } from 'react'
import { Button, Form, FormSelect, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, toastAtom } from '../../../_state';

const AddPackage = () => {

   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);

   const onHide = () => {
      setModalShow(false);
   }

   const onSubmit = async () => {

   }

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset
   } = useForm({
      mode: 'onSubmit',
   });

   return (
      <>
         <Button onClick={() => setModalShow(true)}>New Package</Button>
         <Modal show={modalShow} onHide={onHide} size="lg">
            <Modal.Header closeButton>
               <Modal.Title>New Package </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form id="addChapterForm" onSubmit={handleSubmit(onSubmit)} className="px-3">
                  <Form.Group className="mb-3" controlId="packageDescription">
                     <Form.Label className='fw-semibold'>Description</Form.Label>
                     <Form.Control
                        {...register("description", {
                           required: true
                        })}
                        className={`${errors.description ? "is-invalid" : ""}`}
                        type="text"
                        placeholder="Enter title"
                     />
                     <Form.Control.Feedback type="invalid">
                        Description is required
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="packageDuration">
                     <Form.Label className='fw-semibold'>Duration</Form.Label>
                     <Form.Control
                        {...register("duration", {
                           required: true
                        })}
                        className={`${errors.duration ? "is-invalid" : ""}`}
                        type="date"
                     />
                     <Form.Control.Feedback type="invalid">
                        Duration is required
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="packagePrice">
                     <Form.Label className='fw-semibold'>Price ($)</Form.Label>
                     <Form.Control
                        {...register("price", {
                           required: true
                        })}
                        className={`${errors.price ? "is-invalid" : ""}`}
                        type="number"
                     />
                     <Form.Control.Feedback type="invalid">
                        Price is required
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="packageStatus">
                     <Form.Label className='fw-semibold'>Status</Form.Label>
                     <FormSelect
                        {...register("is_active", {
                           required: true
                        })}
                        className={`${errors.is_active ? "is-invalid" : ""}`}
                        type="number"
                     >
                        <option value="true">Active</option>
                        <option value="false">Not Active</option>
                     </FormSelect>
                     <Form.Control.Feedback type="invalid">
                        Active status is required
                     </Form.Control.Feedback>
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={onHide}>Close</Button>
               <Button>
                  Add Package
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   )
}

export default AddPackage