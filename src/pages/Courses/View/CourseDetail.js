import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'

const CourseDetail = () => {
   return (
      <>
         <Navbar />
         <div id="course-detail-heading" class="container-fluid">
            <div className="container d-flex justify-content-between">
               <div class="align-self-center text-light">
                  <h4 class="my-3">Course description</h4>
                  <h2 class="mt-3 fw-bold">HTML CSS Basic: Basic of web development</h2>
                  <p className='m-0'>
                     Rating: <span>5.0</span> <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     <i class="fa-regular fa-star"></i>
                     ( <span>123</span> votes )
                  </p>
                  <p className='m-0'><span>123</span> Students</p>
                  <p className='m-0'>Created by <Link className='text-white'>Teacher</Link> </p>
               </div>
               <img className='' src="https://picsum.photos/600/500" height="100%" width="300px" alt="" />
            </div>
         </div>

         <div id="course-detail-main" class="container">
            <div class="mt-5">
               <button class="px-3 py-2 rounded-1 fw-bold btn btn-secondary me-2">Enroll</button>
               <button class="px-3 py-2 rounded-1 fw-bold btn btn-primary ms-2">Go to course</button>
            </div>

            <div class="row my-5 pb-5 border-bottom">
               <div class="col-md-8 course-about pe-5">
                  <h3 class="fw-bold">About this course</h3>
                  <p class="fs-5">
                     This course is a precursor to the Applied Project
                     Management Certificate. Project management has been
                     proven to be the most effective method of delivering
                     products within cost, schedule, and resource
                     constraints. This intensive and hands-on series of
                     courses gives you the skills to ensure your projects are
                     completed on time
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
               <h2 class="text-center ">Chapters in this Course</h2>
               <div class="chapter-item d-flex my-5">
                  <div class="me-4 d-flex flex-grow-1 justify-content-center">
                     <h3 class="align-self-center text-secondary">Chapter 1</h3>
                  </div>
                  <div class="ms-4 border-bottom w-75 pb-3">
                     <h4 class="fw-bold text-primary">Introduction to HTML5</h4>
                     <p>
                        Thanks to a growing number of software programs, it
                        seems as if anyone can make a webpage. But what if
                        you actually want to understand how the page was
                        created? There are great textbooks and online
                        resources for learning web design, but most of those
                        resources require some background knowledge. This
                        course is designed to help the novice who wants to
                        gain confidence and knowledge. We will explore the
                        theory (what actually happens when you click on a
                        link on a webpage?)
                     </p>
                  </div>
               </div>
               <div class="chapter-item d-flex my-5">
                  <div class="me-4 d-flex flex-grow-1 justify-content-center">
                     <h3 class="align-self-center text-secondary">Chapter 2</h3>
                  </div>
                  <div class="ms-4 border-bottom w-75 pb-3">
                     <h4 class="fw-bold text-primary">Introduction to CSS3</h4>
                     <p>
                        Thanks to a growing number of software programs, it
                        seems as if anyone can make a webpage. But what if
                        you actually want to understand how the page was
                        created? There are great textbooks and online
                        resources for learning web design, but most of those
                        resources require some background knowledge. This
                        course is designed to help the novice who wants to
                        gain confidence and knowledge. We will explore the
                        theory (what actually happens when you click on a
                        link on a webpage?)
                     </p>
                  </div>
               </div>
               <div class="chapter-item d-flex my-5">
                  <div class="me-4 d-flex flex-grow-1 justify-content-center">
                     <h3 class="align-self-center text-secondary">Chapter 3</h3>
                  </div>
                  <div class="ms-4 border-bottom w-75 pb-3">
                     <h4 class="fw-bold text-primary">Introduction to Javascript</h4>
                     <p>
                        Thanks to a growing number of software programs, it
                        seems as if anyone can make a webpage. But what if
                        you actually want to understand how the page was
                        created? There are great textbooks and online
                        resources for learning web design, but most of those
                        resources require some background knowledge. This
                        course is designed to help the novice who wants to
                        gain confidence and knowledge. We will explore the
                        theory (what actually happens when you click on a
                        link on a webpage?)
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <Footer />
      </>
   )
}

export default CourseDetail