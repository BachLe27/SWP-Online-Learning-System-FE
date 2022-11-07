import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const QuizNav = ({ lesson }) => {

   const navigate = useNavigate();
   var today = new Date().toISOString().slice(0, 10);
   const [date, setDate] = useState(today);
   return (
      <nav id="quiz-nav" class="py-2 d-flex fixed-top bg-white shadow-sm">
         <div class="align-self-center ms-5">
            <button class="btn text-primary fw-bold" onClick={() => { navigate(-1) }}>
               <i class="fas fa-arrow-left"></i> Back
            </button>
         </div>
         <div class="ms-3 flex-grow-1">
            <p class="fw-bold m-0">{lesson ? lesson.title : ""}</p>
            <small class="m-0 text-muted">Graded quiz • {lesson ? lesson.duration : ""} min</small>
         </div>
         <div class="align-self-center me-5">
            <span class="fw-bold mx-2">Taken date</span>
            <small>{date}</small>
         </div>
      </nav>
   )
}

export default QuizNav