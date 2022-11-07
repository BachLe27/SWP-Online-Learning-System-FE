import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Loading from '../../../components/Loading'
import Navbar from '../../../components/Navbar'
import userApi from '../../../_actions/userApi'

const Active = () => {

   const [searchParams, setSearchParams] = useSearchParams();
   const [success, setSuccess] = useState(false);
   const [errMsg, setErrMsg] = useState('');

   const active = async () => {
      // console.log(searchParams.get('token'));
      const token = searchParams.get('token');
      try {
         const activate = await userApi.activate(token);
         setSuccess(true);
      } catch (error) {
         console.log(error);
         setErrMsg('Invalid token!');
      }
   }

   useEffect(() => {
      active();
   }, [])

   useEffect(() => {

   }, [success]);

   return (
      <>
         <Navbar />
         <div className='mt-6 container'>
            <h3 className='fw-bold'>Activate account</h3>
            {
               success == true ? <>
                  <Alert>Active succes</Alert>
                  <Button as={Link} to="/login">Login</Button>
               </> :
                  errMsg ?
                     <Alert variant='danger'> {errMsg} </Alert> : <Loading />
            }
         </div>
      </>
   )
}

export default Active