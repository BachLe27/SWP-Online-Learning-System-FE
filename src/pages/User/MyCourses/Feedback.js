import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import Rating from 'react-rating';
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil';
import userApi from '../../../_actions/userApi';
import { authAtom, toastAtom } from '../../../_state';

const Feedback = ({ course }) => {

   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);
   const [star, setStar] = useState();
   const [oldFeedback, setOldFeedback] = useState();
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { isSubmitting },
      reset
   } = useForm({
      mode: 'onTouch',
   });

   const onHide = () => {
      setModalShow(false);
   }

   const loadFeedback = async (data) => {
      try {
         const feedback = await userApi.getMyFeedback(token, course.id);
         // console.log(feedback);
         setOldFeedback(feedback.data);
         setStar(feedback.data.rating);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadFeedback();
   }, [])

   useEffect(() => {

   }, [toast]);

   const onSubmit = async (data) => {
      data.rating = star;
      try {
         let sendFeedback;

         if (oldFeedback) {
            sendFeedback = await userApi.resendFeedback(token, course.id, data);
         } else {
            sendFeedback = await userApi.sendFeedback(token, course.id, data);
         }

         setToast({
            show: true,
            status: 'primary',
            msg: 'Feedback sended'
         })

         setModalShow(false);
      } catch (error) {
         console.log(error);
      }
   }

   const rate = (value) => {
      setStar(value);
   }

   return (
      <>
         <Link onClick={() => setModalShow(true)} className="fw-bold">Rate this course</Link>
         <Modal show={modalShow} onHide={onHide} size="lg" backdrop="static">
            <Modal.Header closeButton>
               <Modal.Title>Feedback Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div class="text-start">
                  <h4>Your review</h4>
                  <div className='d-flex align-items-center'>
                     {
                        oldFeedback ? <Rating
                           onClick={rate}
                           className='fs-4 mb-3'
                           start={0}
                           stop={5}
                           step={1}
                           initialRating={star}
                           emptySymbol={<i class="fa-regular fa-star"></i>}
                           placeholderSymbol={<i class="text-warning fa-solid fa-star"></i>}
                           fullSymbol={<i class="text-warning fa-solid fa-star"></i>}
                        /> : <Rating
                           onClick={rate}
                           className='fs-4 mb-3'
                           start={0}
                           stop={5}
                           step={1}
                           initialRating={star}
                           emptySymbol={<i class="fa-regular fa-star"></i>}
                           placeholderSymbol={<i class="text-warning fa-solid fa-star"></i>}
                           fullSymbol={<i class="text-warning fa-solid fa-star"></i>}
                        />
                     }


                  </div>
               </div>
               <div>

                  <Form id="sendFeedback" onSubmit={handleSubmit(onSubmit)}>
                     <Form.Group className="mb-3" controlId="chapterTitle">
                        <Form.Label className='fs-5 fw-semibold'>Comment </Form.Label>
                        <Form.Control
                           {...register("comment")}
                           as="textarea"
                           placeholder="Write your review (optional)"
                           defaultValue={oldFeedback ? oldFeedback.comment : ""}
                           cols="30"
                           rows="5"
                        />

                     </Form.Group>
                  </Form>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => {
                  setModalShow(false);
                  reset();
               }}>Close</Button>
               <Button className="fw-bold px-3 rounded-1 shadow" type="submit" form="sendFeedback" >
                  {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>} Submit
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   )
}

export default Feedback