import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
import ToastNoti from '../../../components/ToastNoti';
import expertApi from '../../../_actions/expertApi';
import { authAtom } from '../../../_state';
import VerticalNav from '../VerticalNav';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import Loading from '../../../components/Loading';
import Overall from './Overall';
import Content from './Content';

const EditCourse = () => {

   const param = useParams();
   const token = useRecoilValue(authAtom);

   const [course, setCourse] = useState(null);

   const loadCourse = async () => {
      try {
         const id = param.courseId;
         const courseData = await expertApi.getCourseDetail(token, id);
         setCourse(courseData.data);
      } catch (error) {
         console.log(error);
      }

   }

   useEffect(() => {
      loadCourse();
   }, [])

   return (
      <>
         <Navbar />
         <div className="mt-6 container-fluid vh-75 row">
            <div className="col-2">
               <VerticalNav activeLink="/expert/course" />
            </div>

            <div className="col-10 border-start ps-5">
               <div className="">
                  <Breadcrumb>
                     <Breadcrumb.Item> <Link to="/expert/course/1"> Back </Link> </Breadcrumb.Item>
                     <Breadcrumb.Item active>Edit</Breadcrumb.Item>
                  </Breadcrumb>
               </div>
               <div className="col-9">
                  {
                     course ?
                        <>
                           <Overall course={course} />
                           <Content course={course} />
                        </>
                        : <Loading />
                  }

               </div>
            </div>

            <ToastNoti />
         </div >

         <Footer />
      </>
   )
}

export default EditCourse