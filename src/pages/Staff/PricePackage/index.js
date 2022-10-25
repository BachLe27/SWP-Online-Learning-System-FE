import React from 'react'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import Navbar from '../../../components/Navbar'
import StaffNav from '../StaffNav'
import AddPackage from './AddPackage'

const PricePackage = () => {
   return (
      <>
         <Navbar />
         <div className="mt-6 container-fluid vh-75 row">
            <div className="col-2">
               <StaffNav activeLink="/staff/package" />
            </div>

            <div className="border-start ps-4 w-75">
               <div className='my-3 d-flex justify-content-between align-items-center'>
                  <div className='d-flex'>
                     <h3 className='fw-bold'>Price package</h3>

                     <OverlayTrigger
                        placement="top"
                        overlay={
                           <Tooltip id="tooltip-top">
                              Courses will classify into categories.
                           </Tooltip>
                        }
                     >
                        <i className="ms-2 fa-solid fa-circle-info"></i>
                     </OverlayTrigger>
                  </div>
                  <AddPackage />
               </div>

               <Table striped bordered hover size="sm">
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Price($)</th>
                        <th>Active</th>
                        <th className='col-2 text-center'>Edit</th>
                     </tr>
                  </thead>
                  <tbody>

                  </tbody>
               </Table>
            </div>
         </div>
      </>
   )
}

export default PricePackage