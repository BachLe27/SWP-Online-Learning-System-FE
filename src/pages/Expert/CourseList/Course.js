import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Modal, Button } from 'react-bootstrap'


const ConfirmPublicModal = ({ course, ...props }) => {
   const onSubmit = () => {

   }

   return (
      <Modal {...props} size="lg">
         <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
         </Modal.Header>

         <Modal.Body>
            <Form id={`confirmPublic${course.id}`}>

            </Form>
         </Modal.Body>

         <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>Close</Button>
            <Button variant="primary" type="submit" form={`confirmPublic${course.id}`} >Add</Button>
         </Modal.Footer>
      </Modal >
   )
}

const Course = ({ course, key }) => {
   const [modalShow, setModalShow] = useState(false);

   return (
      <div>
         <div className="d-flex border border-3 shadow-sm rounded justify-content-between mb-3 p-3">

            <div className="d-flex py-2 ps-2">
               <div className="thumbnail">
                  <img src="https://picsum.photos/250/180" alt="" />
               </div>

               <div className="ms-3">
                  <h4 className='fw-bold'>{course.title}</h4>
                  <p>{course.description.substring(0, 200) + '...'}</p>
                  <p className='m-1'> <span>0 chapter(s)</span> · <span>{course.level}</span> ·  <span>{course.is_public ? "Published" : "Private"}</span></p>
                  {/* <p className='m-1'> <span className='fw-semibold'>10 students</span></p>
                  <p className='m-1'> <span className='fw-semibold'>Rate: 4.3 </span>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <span> (100)</span>
                  </p> */}
                  <p className='m-1'> <span className='fw-semibold'>Create at:</span> {course.created_at.substring(0, 10)}</p>
                  <p className='m-1'> <span className='fw-semibold'>Category:</span>  IT, Bussiness</p>
               </div>
            </div>

            <div className="d-flex align-items-center justify-content-end col-3">
               <Link className='' to={`/expert/course/edit/${course.id}`}>Edit</Link>
               <Button onClick={() => setModalShow(true)} className='mx-2' variant='info'>{course.is_public ? "Hide" : "Public"}</Button>
               <ConfirmPublicModal course={course} show={modalShow} onHide={() => setModalShow(false)} />
               <Button variant='danger'>Delete</Button>
            </div>
         </div>
      </div>
   )
}

export default Course