import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import Navbar from '../../../components/Navbar'
import ToastNoti from '../../../components/ToastNoti'

const MyPurchase = () => {

   const [history, setHistory] = useState();

   const getHistory = async () => {
      try {

      } catch (error) {

      }
   }

   return (
      <>
         <Navbar />
         <div className='mt-7'>
            <div className='container'>
               <Table striped hover size="md">
                  <thead>
                     <tr>

                        <th>#</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Price($)</th>
                        <th>Buy date</th>
                        <th>Expired date</th>
                        <th>Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>1</td>
                        <td>One Month Package</td>
                        <td>30 days</td>
                        <td>99</td>
                        <td>11/06/2022</td>
                        <td>12/06/2022</td>
                        <td>Active</td>
                     </tr>
                  </tbody>
               </Table>
            </div>
         </div>
         <ToastNoti />
      </>
   )
}

export default MyPurchase