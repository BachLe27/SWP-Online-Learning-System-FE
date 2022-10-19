import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import StaffNav from './StaffNav'
import staffImg from './staff.jpg'

const Staff = () => {
   return (
      <>
         <Navbar />
         <div className="mt-6 container-fluid vh-75 row">
            <div className="col-2">
               <StaffNav activeLink="/staff" />
            </div>

            <div className="col-10 border-start">
               <div className='col-md-6 ms-5'>
                  <img className='img-fluid border mb-3' src={staffImg} alt="" />

                  <p>Your account currently is a <span className='fw-bold'>Staff.</span> You have permission to <Link to="/staff/categories">Manage categories</Link> of courses, view <Link>Statistics</Link>, and <Link> Manage slider</Link></p>
               </div>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default Staff