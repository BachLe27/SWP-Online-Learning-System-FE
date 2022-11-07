import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import userApi from '../../../_actions/userApi'
import Feedback from './Feedback'

const EnrolledCourse = ({ course }) => {

   const [detail, setDetail] = useState();

   const loadDetails = async () => {
      try {
         const overviewData = await (await userApi.getCourseOverView(course.id)).data;
         setDetail(overviewData);
      } catch (error) {

      }
   }

   useEffect(() => {
      loadDetails();
   }, [])

   return (
      detail ?
         <div>
            <div className='d-flex mb-4 border p-2'>
               <div class="">
                  <img
                     class="rounded-1 border border-secondary"
                     width="150px"
                     src={`http://localhost:8000/upload/${course.image}`}
                     alt=""
                  />
               </div>
               <div className='borderborder-bottom ms-3'>
                  <div>
                     <h4 className='fw-bold'>{course.title}</h4>
                     <p><i class="fa-solid fa-chalkboard-user"></i> {course.author.full_name}</p>
                     <p>{course.level} • <span>{detail.chapters_count} chapter(s)</span> • <span> {(detail.duration / 60.0).toFixed(2)} hour</span></p>

                     <span>
                        <Button as={Link} to={`/course/${course.id}/learn`} className="fw-bold rounded-1 shadow me-2">Go to course</Button>
                        {/* <Button variant='danger' className="fw-bold rounded-1 me-2">Unenroll</Button> */}
                        <Feedback course={course} />
                     </span>
                  </div>
               </div>
            </div>
         </div> : <></>
   )
}

export default EnrolledCourse