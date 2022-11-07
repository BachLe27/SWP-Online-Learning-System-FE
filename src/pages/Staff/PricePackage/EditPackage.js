import React, { useState } from 'react'
import { Button, Form, FormSelect, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import ToastNoti from '../../../components/ToastNoti';
import staffApi from '../../../_actions/staffApi';
import { authAtom, toastAtom } from '../../../_state';

const EditPackage = ({ pack }) => {
   console.log(pack);
   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);

   const onHide = () => {
      setModalShow(false);
   }

   const onSubmit = async (data) => {
      console.log(data);
      try {
         const updatePackage = await staffApi.updatePackage(token, pack.id, data);
         setToast({
            show: true,
            status: 'primary',
            msg: 'Update Package Success'
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
      mode: 'onSubmit',
   });

   return (
      <>
         <Link onClick={() => setModalShow(true)}>Edit</Link>
         <Modal show={modalShow} onHide={onHide} size="lg">
            <Modal.Header closeButton>
               <Modal.Title>Update Package </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form id="editPackage" onSubmit={handleSubmit(onSubmit)} className="px-3">
                  <Form.Group className="mb-3" controlId="packageDescription">
                     <Form.Label className='fw-semibold'>Description</Form.Label>
                     <Form.Control
                        {...register("description", {
                           required: true
                        })}
                        className={`${errors.description ? "is-invalid" : ""}`}
                        type="text"
                        placeholder="Enter description"
                        defaultValue={pack.description}
                     />
                     <Form.Control.Feedback type="invalid">
                        Description is required
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="packageDuration">
                     <Form.Label className='fw-semibold'>Duration (days)</Form.Label>
                     <Form.Control
                        {...register("duration", {
                           required: true
                        })}
                        className={`${errors.duration ? "is-invalid" : ""}`}
                        type="number"
                        defaultValue={pack.duration}
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
                        defaultValue={pack.price}
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
                     >
                        <option selected={pack.is_active == true} value="true">Active</option>
                        <option selected={!pack.is_active == true} value="false">Not Active</option>
                     </FormSelect>
                     <Form.Control.Feedback type="invalid">
                        Active status is required
                     </Form.Control.Feedback>
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={onHide}>Close</Button>
               <Button className="px-3 shadow fw-bold rounded-1" variant="warning" type="submit" form="editPackage">
                  Update
               </Button>
            </Modal.Footer>
         </Modal>
         <ToastNoti />
      </>
   )
}

export default EditPackage