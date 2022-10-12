import React from 'react'
import { useEffect } from 'react';
import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
import ToastNoti from '../../../components/ToastNoti';
import VerticalNav from '../VerticalNav';


const Feedback = () => {

   return (
      <>
         <Navbar />
         <div className="mt-6 container-fluid vh-75 row">
            <div className="col-2">
               <VerticalNav activeLink="/expert/feedback" />
            </div>

            <div className="col-10 border-start">
               <h1>Feedback</h1>
            </div>

            <ToastNoti />
         </div >

         <Footer />
      </>
   )
}

export default Feedback