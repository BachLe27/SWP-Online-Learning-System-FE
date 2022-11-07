import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Course = ({ course }) => {

   const navigate = useNavigate();
   return (

      <>
         <div
            // as={Link} to={`/courses/detail/${course.id}`}
            //preventScrollReset={true}
            onClick={() => { navigate(`/courses/detail/${course.id}`) }}
            class="col-lg-3 col-md-6 my-4"
         >
            <div className='course-item border p-3 rounded-3'>
               <div width="200px" className='rounded-3 border border-secondary text-center'>
                  <img
                     class="border-secondary rounded-3"
                     width="80%"
                     height="200px"
                     src={`http://localhost:8000/upload/${course.image}`} alt=""
                  />
               </div>
               <div class="fw-bold course-name border-bottom border-2 pt-2 mb-2 ms-1">
                  <h5 className="fw-bold mb-1">{course.title}</h5>
               </div>
               <div className='ms-1'>
                  <p className="m-0 text-muted"> {course.author.full_name ? course.author.full_name : "ADMIN"} </p>
                  <p class="course-count m-0">
                     <i class="fa-solid fa-users"></i> 1234 students
                  </p>
               </div>
            </div>
         </div>
      </>
   )
}

export default Course