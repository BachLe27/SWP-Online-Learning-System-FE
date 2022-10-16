import React, { useEffect, useState } from 'react'
import { Table, Accordion, Button } from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import expertApi from '../../../_actions/expertApi';
import { toastAtom } from '../../../_state';
import AddLessonModal from './AddLessonModal';


const Chapter = ({ eventKey, chapter }) => {
   const toast = useRecoilState(toastAtom);

   const [lessons, setLessons] = useState([]);

   const loadLesson = async () => {
      try {
         let lessonData = await (await expertApi.getLesson(chapter.id)).data;
         lessonData = lessonData.sort((a, b) => {
            return (a.created_at < b.created_at) ? 1 : ((a.created_at > b.created_at) ? -1 : 0);
         });
         setLessons(lessonData);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
   }, [lessons]);

   useEffect(() => {
      loadLesson();
   }, [toast])

   useEffect(() => {
      loadLesson();
   }, []);

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
                        lessons.map((lesson, index) => {
                           return <>
                              <tr>
                                 <td className='col-10'>
                                    <span className='fw-semibold'>Lesson {index + 1}: </span> {lesson.title} </td>
                                 <td>
                                    <Button variant="outline-dark">
                                       <i class="fa-solid fa-pen"></i>
                                    </Button>
                                 </td>
                                 <td>
                                    <Button variant="outline-dark">
                                       <i class="fa-solid fa-trash"></i>
                                    </Button>
                                 </td>
                              </tr>
                           </>
                        })
                     }

                  </tbody>
               </Table>

               <div className="d-flex justify-content-end">
                  <AddLessonModal chapterId={chapter.id} />
               </div>

            </Accordion.Body>
         </Accordion.Item>

         <div className='d-flex justify-content-end'>
            <Button variant="outline-dark" className="mb-2 mx-2">
               <i class="fa-solid fa-pen"></i>
            </Button>
            <Button variant="outline-dark" className="mb-2">
               <i class="fa-solid fa-trash"></i>
            </Button>
         </div>
      </div>
   )
}

export default Chapter