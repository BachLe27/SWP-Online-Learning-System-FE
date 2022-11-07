import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../../_state';

const StartQuiz = ({ lessonId }) => {

   const token = useRecoilValue(authAtom);
   const [modalShow, setModalShow] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const navigate = useNavigate();

   const onHide = () => {
      setModalShow(false);
   }

   const onSubmit = async () => {
      navigate(`/doquiz/${lessonId}`);
   }

   return (
      <>
         <>
            <Button
               onClick={() => setModalShow(true)}
               className="shadow text-white px-4 py-2 rounded-1 fw-bold me-2"
            >
               Do Quiz
            </Button>

            <Modal show={modalShow} onHide={onHide} size="md" centered>
               <Modal.Header closeButton>
                  <Modal.Title>Start quiz</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <p className='m-0 fw-bold'>
                     This quiz take grade. You want to start?
                  </p>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={onHide}>Close</Button>
                  <Button onClick={onSubmit} >
                     {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                     </div>} Start
                  </Button>
               </Modal.Footer>
            </Modal>
         </>
      </>
   )
}

export default StartQuiz