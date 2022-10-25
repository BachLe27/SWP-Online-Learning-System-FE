import React from 'react'
import { useNavigate } from 'react-router-dom'

const Course = ({ course }) => {

   const navigate = useNavigate();

   return (
      <>
         <div
            onClick={() => { navigate(`/courses/detail/${course.id}`) }}
            class="course-item col-lg-3 col-md-6 my-4 border p-3"
         >
            <div width="200px" className='rounded-3 border border-secondary text-center'>
               <img
                  class="border-secondary p-2"
                  width="80%"
                  height="200px"
                  src={`http://localhost:8000/upload/${course.image}`} alt=""
               />
            </div>
            <div class="fw-bold course-name pt-2">
               <h5 className="fw-bold">{course.title}</h5>
            </div>
            <div>
               <p className="m-0 text-muted"> John Doe </p>
               <p class="course-count m-0">
                  <i class="fa-solid fa-users"></i> 1234 students
               </p>
            </div>

         </div>
      </>
   )
}

export default Course