import React, { useEffect, useState } from 'react'
import { Table, Accordion, Button, Badge } from 'react-bootstrap'
import { useRecoilState, useRecoilValue } from 'recoil';
import Loading from '../../../components/Loading';
import ToastNoti from '../../../components/ToastNoti';
import sortByDate from '../../../libs/sortByDate';
import expertApi from '../../../_actions/expertApi';
import { toastAtom } from '../../../_state';
import AddLessonModal from './AddLessonModal';
import AddQuizModal from './AddQuizModal';
import DeleteChapterModal from './DeleteChapterModal';
import DeleteLessonModal from './DeleteLessonModal';
import EditChapterModal from './EditChapterModal';
import EditLessonModal from './EditLessonModal';
import EditQuizModal from './EditQuizModal';


const Chapter = ({ eventKey, chapter }) => {
   const toast = useRecoilValue(toastAtom);

   // console.log(chapter.id);
   const [lessons, setLessons] = useState();

   const loadLesson = async () => {
      try {
         // setLessons();
         let lessonData = await (await expertApi.getLesson(chapter.id)).data;
         lessonData = sortByDate(lessonData);
         setLessons(lessonData);

      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadLesson();
   }, [])

   useEffect(() => {
      loadLesson();
   }, [toast])

   return (
      <div className="d-flex align-items-center">

         <Accordion.Item eventKey={eventKey} className="mb-3 border border-dark w-100">
            <Accordion.Header>
               <div className='d-flex justify-content-between w-100'>
                  <p className='fw-bold m-0'>Chapter {eventKey + 1}: {chapter.title}</p>
               </div>

            </Accordion.Header>
            <Accordion.Body>
               <Table bordered hover size="sm">
                  <tbody>
                     {
                        lessons ?
                           lessons.map((lesson, index) => {
                              return <>
                                 <tr>
                                    <td className='col-10'>
                                       <span className='fw-semibold'>
                                          Lesson {index + 1}: {lesson.has_quiz ? <Badge bg="primary">Quiz </Badge> : ""} {lesson.title}
                                       </span>
                                    </td>

                                    <td>
                                       {lesson.has_quiz ? <EditQuizModal key={index} lesson={lesson} /> : <EditLessonModal lesson={lesson} />}
                                    </td>
                                    <td>
                                       <DeleteLessonModal key={index} lessonId={lesson.id} />
                                    </td>
                                 </tr>
                              </>
                           }) : <Loading></Loading>
                     }

                  </tbody>
               </Table>

               <div className="d-flex justify-content-end">
                  <AddQuizModal chapterId={chapter.id} />
                  <AddLessonModal chapterId={chapter.id} />
               </div>

            </Accordion.Body>
         </Accordion.Item>

         <div className='d-flex justify-content-end'>

            <EditChapterModal chapterId={chapter.id} />
            <DeleteChapterModal chapterId={chapter.id} />
         </div>
         <ToastNoti />
      </div>
   )
}

export default Chapter