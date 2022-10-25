import React, { useEffect, useState } from 'react'
import { Accordion, Badge, Breadcrumb, Button, Nav } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../../../components/Navbar'
import sortByDate from '../../../../libs/sortByDate'
import userApi from '../../../../_actions/userApi'
import Chapter from './Chapter'
import MarkdownIt from 'markdown-it';
import Loading from '../../../../components/Loading'
import ReactMarkdown from 'react-markdown'
import QuizOverview from './QuizOverview'

const Learn = () => {
   const param = useParams();
   const [chapters, setChapters] = useState();
   const [lesson, setLesson] = useState();

   const loadChapters = async () => {
      try {
         const id = param.courseId;
         let chaptersData = await (await userApi.getChapters(id)).data;
         chaptersData = sortByDate(chaptersData);
         setChapters(chaptersData);
         console.log(chaptersData);
      } catch (error) {
         console.log(error);
      }
   }

   const loadLesson = async () => {
      try {
         const id = param.lessonId;
         let lessonData = await (await userApi.getLesson(id)).data;
         setLesson(lessonData);
         console.log(lessonData);
      } catch (error) {
         console.log(error);
      }
   }


   useEffect(() => {
      loadChapters();
      if (param.lessonId) {
         loadLesson();
      }
   }, [])

   useEffect(() => {
      loadLesson();
   }, [param])


   useEffect(() => {

   }, [chapters, lesson]);


   return (
      <>

         <Navbar />

         <div className="container-fluid mt-6 row vh-75">

            <div className="col-md-3"></div>

            <div className='col-md-3 lesson_dropdown_list position-fixed'>
               <div className="">
                  <Breadcrumb>
                     <Breadcrumb.Item>
                        <Link to={`/courses/detail/${param.courseId}`}>
                           Course Detail
                        </Link>
                     </Breadcrumb.Item>
                     <Breadcrumb.Item active>Learning</Breadcrumb.Item>
                  </Breadcrumb>

                  <p className='fw-bold'>Course Content</p>

                  <Accordion defaultActiveKey="0" alwaysOpen>
                     <Nav variant='pills' className="flex-column">
                        {
                           chapters ?
                              chapters.map((chapter, index) => {
                                 return <Chapter key={index} num={index} chapter={chapter} courseId={param.courseId} />
                              }) : <></>
                        }
                     </Nav>
                  </Accordion>
               </div>
            </div>
            <div className='col-md-9 pe-3'>
               {
                  param.lessonId == null ? <h4 className='ms-4 fw-bold'>Choose an lesson to begin</h4> :
                     lesson ?
                        <>
                           <div className='border-bottom mb-4 ms-3'>
                              <div className='d-flex align-items-center'>
                                 {
                                    lesson.has_quiz ? <span className='me-2'>
                                       <Badge bg="info"> Quiz </Badge>
                                    </span> : <></>
                                 }

                                 <span className='fw-bold fs-2'>
                                    {lesson.title}
                                 </span>
                              </div>
                              <span className='text-muted'>{lesson.duration} minutes</span>
                           </div>
                           {
                              lesson.has_quiz ? <QuizOverview lesson={lesson} /> :
                                 <div className='mx-4 px-3'>
                                    <ReactMarkdown>{lesson.content}</ReactMarkdown>
                                 </div>
                           }

                        </>
                        : <Loading></Loading>
               }
            </div>


         </div>
      </>
   )
}

export default Learn