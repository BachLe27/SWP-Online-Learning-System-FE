import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import userApi from '../../../_actions/userApi';
import { authAtom, toastAtom, userAtom } from '../../../_state';

const EnrollButton = ({ courseId }) => {

   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const navigate = useNavigate();

   const user = useRecoilValue(userAtom);

   const onHide = () => {
      setModalShow(false);
   }

   const onSubmit = async () => {


      if (!token) {
         navigate('/login');
      }
      try {
         let purchased = (await userApi.purchased(token)).data;
         // console.log(purchased);
         let x = [];
         purchased.forEach(bill => {
            if (user.id == bill.user_id) {
               x.push(bill);
            }
         });

         if (!(x.length > 0)) {
            navigate("/purchase");
         } else {
            setIsSubmitting(true);
            const enroll = await (await userApi.enrollCourse(token, courseId)).data;

            setModalShow(false);
            setIsSubmitting(false);
            setToast({
               show: true,
               status: 'primary',
               msg: 'Enrol success'
            })
         }
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {

   }, [isSubmitting, modalShow]);


   return (
      <>
         <Button
            onClick={() => setModalShow(true)}
            variant='success'
            className="shadow text-white px-4 py-2 rounded-1 fw-bold me-2"
         >
            Enroll Course
         </Button>

         <Modal show={modalShow} onHide={onHide} size="md" centered>
            <Modal.Header closeButton>
               <Modal.Title>Enroll Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p className='m-0 fw-bold'>
                  You will be enrol to this course. Confirmation?
               </p>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={onHide}>Close</Button>
               <Button variant="success" onClick={onSubmit} >
                  {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>} Enroll
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   )
}

export default EnrollButton