import React from 'react'
import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
import ToastNoti from '../../../components/ToastNoti';
import VerticalNav from '../VerticalNav';
import NewCourse from './NewCourse.js'

const CreateCourse = () => {

   return (
      <>
         <Navbar />
         <div className="mt-6 container-fluid vh-75 row">
            <div className="col-2">
               <VerticalNav activeLink="/expert/create" />
            </div>

            <div className="col-10 border-start">
               <NewCourse />
            </div>

            <ToastNoti />
         </div >

         <Footer />
      </>
   )
}

export default CreateCourse