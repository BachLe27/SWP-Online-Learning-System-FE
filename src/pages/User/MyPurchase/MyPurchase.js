import React, { useState } from 'react'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useRecoilValue } from 'recoil'
import Navbar from '../../../components/Navbar'
import ToastNoti from '../../../components/ToastNoti'
import userApi from '../../../_actions/userApi'
import { authAtom, userAtom } from '../../../_state'

const MyPurchase = () => {

   const [history, setHistory] = useState();
   const token = useRecoilValue(authAtom);
   const user = useRecoilValue(userAtom);
   const getHistory = async () => {
      try {
         let purchased = (await userApi.purchased(token)).data;
         // console.log(purchased);
         let x = [];
         purchased.forEach(bill => {
            if (user.id == bill.user_id) {
               x.push(bill);
            }
         });
         console.log(x);
         setHistory(x);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getHistory();
   }, [])

   return (
      <>
         <Navbar />
         <div className='mt-7'>
            <div className='container'>
               {
                  history && history.length > 0 ?
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
                           {history.map((b, index) => {
                              return <tr>
                                 <td>{index + 1}</td>
                                 <td>One Month Package</td>
                                 <td>30 days</td>
                                 <td>{b.purchase_price}</td>
                                 <td>{b.created_at.substr(0, 10)}</td>
                                 <td>{b.end_date.substr(0, 10)}</td>
                                 <td>Active</td>
                              </tr>
                           })}

                        </tbody>
                     </Table> : <h3 className='text-primary'>You haven't bought any package.</h3>
               }

            </div>
         </div>
         <ToastNoti />
      </>
   )
}

export default MyPurchase