import React, { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Loading from '../../../components/Loading'
import Navbar from '../../../components/Navbar'
import staffApi from '../../../_actions/staffApi'
import { authAtom, toastAtom } from '../../../_state'
import StaffNav from '../StaffNav'
import AddPackage from './AddPackage'
import EditPackage from './EditPackage'

const PricePackage = () => {

   const token = useRecoilValue(authAtom);
   const [packages, setPackages] = useState();
   const toast = useRecoilValue(toastAtom);

   const loadPackage = async () => {
      try {
         const packageData = await (await staffApi.getPackages(token)).data;
         setPackages(packageData);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadPackage();
   }, [])

   useEffect(() => {
      loadPackage();
   }, [toast])

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
                     <tr className='text-center'>
                        <th>#</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Price($)</th>
                        <th>Active</th>
                        <th className='col-2 text-center'>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {packages ? packages.map((p, index) => {
                        return <tr className='text-center'>
                           <td>{index + 1}</td>
                           <td>{p.description}</td>
                           <td>{p.duration}</td>
                           <td>{p.price}</td>
                           <td>{p.is_active ? <i class="fa-regular fa-circle-check text-success"></i> : <i class="fa-regular fa-circle-xmark text-danger"></i>}</td>
                           <td> <EditPackage pack={p} /> / <Link>Delete</Link></td>
                        </tr>
                     }) : <Loading />}
                  </tbody>
               </Table>
            </div>
         </div>
      </>
   )
}

export default PricePackage