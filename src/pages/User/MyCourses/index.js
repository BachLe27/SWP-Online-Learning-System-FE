import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import ToastNoti from '../../../components/ToastNoti'
import userApi from '../../../_actions/userApi'
import { authAtom, toastAtom, userAtom } from '../../../_state'
import EnrolledCourse from './EnrolledCourse'
import InProgressCourse from './InProgressCourse'

const MyCourses = () => {

   const token = useRecoilValue(authAtom);
   const toast = useRecoilValue(toastAtom);
   const [courses, setCourses] = useState();
   const user = useRecoilValue(userAtom);
   const [img, setImg] = useState(user.avatar || 'https://picsum.photos/500/500');

   const profileStyle = {
      background: "url('https://picsum.photos/2000/500') no-repeat",
      backgroundSize: "100% 100%",
      height: "300px",
      width: "100%",
   }

   const loadEnrolledCourse = async () => {
      try {
         const enrolled = await (await userApi.getEnrolledCourse(token)).data;
         setCourses(enrolled);
         // console.log(enrolled);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadEnrolledCourse();
   }, [])

   useEffect(() => {
      loadEnrolledCourse();
   }, [toast]);

   return (
      <>
         <Navbar />
         <div id="my-courses-main" class="container mt-5">
            <div class="profile-info w-100 position-relative">
               <div style={profileStyle}>
               </div>
               <div class="profile-photo w-100 d-flex flex-column align-items-center">
                  <img class="rounded-circle border border-dark border-3 img-fluid" height="150px" width="150px" src={img != 'https://picsum.photos/500/500' ? `http://localhost:8000/upload/${img}` : img} alt="" />
                  <p class="fs-3 fw-bold pt-3 mb-0 border-bottom border-2 border-dark">
                     {user.full_name}
                  </p>
                  <p class="pb-3 mt-1">
                     {user.role}
                  </p>
               </div>
            </div>

            <div class="my-courses row" style={{ marginTop: "12rem" }}>
               <div className='mb-3 border-bottom'>
                  <h3 className='fw-bold'>Enrolled course</h3>
               </div>

               <div>
                  {
                     courses ? courses.map((course, index) => {
                        return <EnrolledCourse key={index} course={course} />
                     }) : <p>You haven't rolled any course.</p>
                  }
               </div>
            </div>
         </div>
         <Footer />
         <ToastNoti />
      </>
   )
}

export default MyCourses