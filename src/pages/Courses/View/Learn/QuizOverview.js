import React from 'react'
import { Button } from 'react-bootstrap'

const QuizOverview = ({ lesson }) => {

   return (
      <div className='container'>
         <div className=''>
            <p>{lesson.description}</p>
            <Button>Start quiz</Button>
         </div>

         <div className='border p-3 mt-3 d-flex'>
            <div className='col-7'>
               <p className='fw-semibold'>Number of Questions: <span>20</span> </p>
               <p className='fw-semibold mb-0'>To Pass: <span className='text-danger'>80%</span></p>
            </div>
            <div className='border-start ps-3 col-5'>
               <p className='fw-bold'>Your Grade</p>
               <p className='fw-bold mb-0'>-</p>
            </div>
         </div>
      </div>
   )
}

export default QuizOverview