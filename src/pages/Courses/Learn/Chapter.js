import React, { useEffect, useState } from 'react'
import { Accordion, Badge, Nav } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import sortByDate from '../../../libs/sortByDate';
import expertApi from '../../../_actions/expertApi';
import { authAtom } from '../../../_state';

const Chapter = ({ num, chapter, courseId }) => {

   const [lessons, setLessons] = useState();
   const token = useRecoilValue(authAtom);
   const param = useParams();

   const loadLesson = async () => {
      try {
         let lessonData = await (await expertApi.getLesson(token, chapter.id)).data;
         lessonData = sortByDate(lessonData);
         setLessons(lessonData);
         // console.log(chapter.id, lessonData);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadLesson();
   }, [])

   useEffect(() => {

   }, [lessons])


   return (
      <>
         <Accordion.Item eventKey={num}>
            <Accordion.Header>
               <span className="fw-bold">
                  Chapter {num + 1}: {chapter.title}
               </span>
            </Accordion.Header>
            <Accordion.Body>
               {
                  lessons ? lessons.map((lesson, index) => {
                     return <Nav.Link
                        preventScrollReset={true}
                        as={Link}
                        to={`/course/${courseId}/learn/${lesson.id}`}
                        eventKey={`${lesson.id}`}
                     >

                        {lesson.has_quiz ? <span><i class="fa-regular fa-square-check"></i> </span> :
                           lesson.video_url ? <span> <i class="fa-regular fa-circle-play"></i> </span> :
                              <span> <i class="fa-regular fa-file-lines"></i> </span>
                        }
                        {
                           lesson.title.length < 25 ? lesson.title : `${lesson.title.substr(0, 25)}...`
                        }
                     </Nav.Link>
                  }) : <></>
               }
            </Accordion.Body>
         </Accordion.Item>
      </>
   )
}

export default Chapter