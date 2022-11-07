import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Modal, Button } from 'react-bootstrap'
import { useRecoilState, useRecoilValue } from 'recoil'
import { authAtom } from '../../../_state'
import expertApi from '../../../_actions/expertApi'
import userApi from '../../../_actions/userApi'

const Course = ({ course, key }) => {

   const [modalShow, setModalShow] = useState(false);
   const token = useRecoilValue(authAtom);
   const [updated, setUpdated] = useState(false);

   useEffect(() => {
   }, [updated]);

   const onSubmit = async (e) => {
      e.preventDefault();
      course.is_public = !course.is_public;
      setUpdated(false);
      try {
         const update = await expertApi.updateCourse(token, course.id, course);
         console.log(update);
         setUpdated(true);
      } catch (error) {
         console.log(error);
      }
   }


   return (
      <div>
         <div className="d-flex border border-3 shadow-sm rounded justify-content-between mb-3 p-3">

            <div className="d-flex py-2 ps-2">
               <div className="thumbnail">
                  <img
                     className='border'
                     src={`http://localhost:8000/upload/${course.image}`}
                     width="180px"
                     height="180px"
                     alt=""
                  />
               </div>

               <div className="ms-3">
                  <h4 className='fw-bold text-primary'>{course.title}</h4>
                  {/* <p>{course.description.substring(0, 200) + '...'}</p> */}
                  <p className='m-1 fw-bold'>Status: {course.is_public ? <span className='text-primary'>Published </span> : <span className='text-secondary'>Private</span>}</p>
                  <p className='m-1'> <span className="fw-semibold">Level:</span> <span>{course.level}</span> </p>
                  <p className='m-1'> <span className='fw-semibold'>Create at:</span> {course.created_at.substring(0, 10)}</p>
                  <p className='m-1'>
                     <span className='fw-semibold'>Category:</span> {course.category.name}
                  </p>
               </div>
            </div>

            <div className="d-flex align-items-center justify-content-end col-3">
               <Link className='' to={`/expert/course/edit/${course.id}`}>Edit</Link>
               <Button className='fw-bold shadow px-3 rounded-1 mx-2 text-white' onClick={() => setModalShow(true)}>{course.is_public ? "Hide" : "Public"}</Button>
               {/* <ConfirmPublicModal course={course}  /> */}
               <Modal show={modalShow} size="md" centered>
                  <Modal.Header closeButton>
                     <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                     <h5>Do you want {course.is_public ? "hide" : "public"} this course?</h5>
                     <Form onSubmit={onSubmit} id={`confirmPublic${course.id}`}>
                     </Form>
                  </Modal.Body>

                  <Modal.Footer>
                     <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
                     <Button className='fw-bold shadow px-3 rounded-1' variant="primary" onClick={() => setModalShow(false)} type="submit" form={`confirmPublic${course.id}`} >{course.is_public ? "Hide" : "Public"}</Button>
                  </Modal.Footer>
               </Modal >
               <Button className='fw-bold shadow px-3 rounded-1' variant="danger"><i class="fa-solid fa-trash"></i></Button>
            </div>
         </div>
      </div>
   )
}

export default Course