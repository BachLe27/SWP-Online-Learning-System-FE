import React, { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { useRecoilValue } from 'recoil'
import Footer from '../../../components/Footer'
import Loading from '../../../components/Loading'
import Navbar from '../../../components/Navbar'
import userApi from '../../../_actions/userApi'
import { toastAtom } from '../../../_state'
import StaffNav from '../StaffNav'
import CreateCategory from './CreateCategory'

const Categories = () => {
   const [categories, setCategories] = useState();
   const toast = useRecoilValue(toastAtom);

   const loadCategories = async () => {
      try {
         const categoriesData = await (await userApi.getCategories()).data;
         setCategories(categoriesData);

      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadCategories();
   }, [toast])

   useEffect(() => {
      loadCategories();
   }, []);


   return (
      <>
         <Navbar />
         <div className="mt-6 container-fluid vh-75 row">
            <div className="col-2">
               <StaffNav activeLink="/staff/categories" />
            </div>

            <div className=" border-start ps-4 w-50">
               <div className='my-3 d-flex justify-content-between align-items-center'>
                  <div className='d-flex'>
                     <h3 className='fw-bold'>Course Categories</h3>

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
                  <CreateCategory />
               </div>

               <Table striped bordered hover size="sm">
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th className='col-2 text-center'>Edit</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        categories ?
                           categories.map((category, index) => {
                              return <tr>
                                 <td>{index + 1}</td>
                                 <td>{category.name}</td>
                                 <td className='col-2 text-center'><Button variant='warning'><i class="fa-solid fa-pen"></i></Button></td>
                              </tr>
                           }) : <Loading />
                     }

                  </tbody>
               </Table>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default Categories