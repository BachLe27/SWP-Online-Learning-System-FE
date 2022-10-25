import React, { useEffect, useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Footer from '../../../components/Footer'
import Loading from '../../../components/Loading'
import Navbar from '../../../components/Navbar'
import ToastNoti from '../../../components/ToastNoti'
import sortByDate from '../../../libs/sortByDate'
import expertApi from '../../../_actions/expertApi'
import userApi from '../../../_actions/userApi'
import { authAtom, toastAtom } from '../../../_state'
import EnrollButton from './EnrollButton'

const CourseDetail = () => {

   const param = useParams();

   const [course, setCourse] = useState(null);
   const [overview, setOverview] = useState();
   const [chapters, setChapters] = useState();
   const [isEnrolled, setIsEnrolled] = useState(false);
   const toast = useRecoilValue(toastAtom);
   const token = useRecoilValue(authAtom);

   const loadCourse = async () => {
      try {
         const id = param.courseId;
         const courseData = await userApi.getCourseDetail(id);

         let chaptersData = await (await userApi.getChapters(id)).data;
         chaptersData = sortByDate(chaptersData);

         const overviewData = await userApi.getCourseOverView(id);
         const enrolled = await (await userApi.getEnrolledCourse(token)).data;
         const x = enrolled.find(item => item.id == id);
         if (x) setIsEnrolled(true);

         setOverview(overviewData.data);
         setChapters(chaptersData);
         setCourse(courseData.data);
         console.log(enrolled);
      } catch (error) {
         console.log(error);
      }
   }


   useEffect(() => {
      loadCourse();
   }, [])

   useEffect(() => {

   }, [course, chapters, isEnrolled]);

   useEffect(() => {
      loadCourse();
   }, [toast])

   return (
      <>
         <Navbar />
         <div className='vh-75'>
            {
               course ?
                  <>
                     <div id="course-detail-heading" class="container-fluid pt-3 shadow-sm">

                        <div className="container d-flex justify-content-between">
                           <div class="align-self-center text-light">
                              <h4 class="my-3"><Badge bg="danger">Provide by Expert</Badge></h4>
                              <h2 class="mt-3 fw-bold">{course.title}</h2>
                              <p className='m-0'>
                                 Rating: <span>{overview.rating}</span> <i class="fa-regular fa-star"></i>
                                 <i class="fa-regular fa-star"></i>
                                 <i class="fa-regular fa-star"></i>
                                 <i class="fa-regular fa-star"></i>
                                 <i class="fa-regular fa-star"></i> (<span>{overview.rating_count}</span> reviews)
                              </p>
                              <p className='m-0'>
                                 <span>{overview.learners_count}</span> Students • <span>{overview.chapters_count}</span> Chapters • <span>{(overview.duration / 60.0).toFixed(2)}</span> hours
                              </p>
                              <p className='m-0'>Created by <Link className='text-white'>Teacher</Link> </p>
                           </div>
                           <img className='border shadow border-2 rounded p-2' src={`http://localhost:8000/upload/${course.image}`} height="200px" alt="" />
                        </div>
                     </div>

                     <div id="course-detail-main" class="container">
                        <div class="mt-5">
                           {
                              !isEnrolled ?
                                 <EnrollButton courseId={param.courseId} /> :
                                 <Button variant='secondary' className="shadow px-4 py-2 rounded-1 fw-bold me-2" disabled>Enrolled</Button>
                           }
                           {
                              isEnrolled ?
                                 <Button as={Link} preventScrollReset={true} to={`/course/${param.courseId}/learn`} className="shadow px-4 py-2 rounded-1 fw-bold ms-2">Go to course</Button> : <></>
                           }
                        </div>

                        <div class="row my-5 pb-5 border-bottom">
                           <div class="col-md-8 course-about pe-5">
                              <h3 class="fw-bold">About this course</h3>
                              <p class="fs-5">
                                 {course.description}
                              </p>
                           </div>
                           <div class="col-md-4 ps-5">
                              <div>
                                 <p class="fw-bold fs-5 m-0">
                                    <i class="fas fa-globe me-2"></i>
                                    100% online courses
                                 </p>
                                 <p>Start instantly and learn at your own schedule.</p>
                              </div>
                              <div>
                                 <p class="fw-bold fs-5 m-0">
                                    <i class="fas fa-clipboard-list me-2"></i>
                                    Flexible Schedule
                                 </p>
                                 <p>Set and maintain flexible deadlines.</p>
                              </div>
                              <div>
                                 <p class="fw-bold fs-5 m-0">
                                    <i class="fas fa-chart-simple me-2"></i>
                                    Beginner Level
                                 </p>
                                 <p>No prior experience required.</p>
                              </div>
                           </div>
                        </div>

                        <div class="course-chapters">
                           <h2 class="text-center fw-bold">Chapters in this Course</h2>
                           {
                              chapters ?
                                 chapters.map((chapter, index) => {
                                    return <>
                                       <div class="chapter-item d-flex my-5">
                                          <div class="me-4 d-flex flex-grow-1 justify-content-center">
                                             <h3 class="align-self-center text-secondary">Chapter {index + 1}</h3>
                                          </div>
                                          <div class="ms-4 border-bottom w-75 pb-3">
                                             <h4 class="fw-bold text-primary">{chapter.title}</h4>
                                             <p>
                                                {chapter.description.substr(0, 350)}...
                                             </p>
                                          </div>
                                       </div>
                                    </>
                                 }) : <Loading />
                           }

                        </div>
                     </div>
                  </> : <Loading />
            }
         </div>
         <ToastNoti />
         <Footer />
      </>
   )
}

export default CourseDetail