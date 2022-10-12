import React, { useState } from 'react'
import { Table, Accordion, Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

const AddChapterModal = (props) => {
   return (
      <Modal.Dialog {...props}>
         <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
         </Modal.Header>

         <Modal.Body>
            <p>Modal body text goes here.</p>
         </Modal.Body>

         <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
         </Modal.Footer>
      </Modal.Dialog>
   )
}

const Chapter = ({ eventKey }) => {

   return (
      <div className="d-flex align-items-center">

         <Accordion.Item eventKey={eventKey} className="mb-3 border border-dark w-100">
            <Accordion.Header>
               <div className='d-flex justify-content-between w-100'>
                  <p className='fw-bold m-0'>Chapter 1: HTML, CSS</p>
               </div>

            </Accordion.Header>
            <Accordion.Body>
               <Table bordered hover size="sm">
                  <tbody>
                     <tr>
                        <td> <span className='fw-semibold'>Lesson 1: </span> Lorem ipsum dolor sit amet consectetur adipisicing elit. </td>
                        <td>
                           <Button variant="outline-dark">
                              <i class="fa-solid fa-pen"></i>
                           </Button>
                        </td>
                        <td>
                           <Button variant="outline-dark">
                              <i class="fa-solid fa-trash"></i>
                           </Button>
                        </td>
                     </tr>
                     <tr>
                        <td><span className='fw-semibold'>Lesson 2: </span> Lorem ipsum dolor sit amet consectetur adipisicing elit. </td>
                        <td>
                           <Button variant="outline-dark">
                              <i class="fa-solid fa-pen"></i>
                           </Button>
                        </td>
                        <td>
                           <Button variant="outline-dark">
                              <i class="fa-solid fa-trash"></i>
                           </Button>
                        </td>
                     </tr>
                  </tbody>
               </Table>
               <div className="d-flex justify-content-end">
                  <Button><i class="fa-solid fa-plus"></i> Add Lesson</Button>
               </div>
            </Accordion.Body>
         </Accordion.Item>
         <div className='d-flex justify-content-end'>
            <Button variant="outline-dark" className="mb-2 mx-2">
               <i class="fa-solid fa-pen"></i>
            </Button>
            <Button variant="outline-dark" className="mb-2">
               <i class="fa-solid fa-trash"></i>
            </Button>
         </div>
      </div>
   )
}

export default Chapter