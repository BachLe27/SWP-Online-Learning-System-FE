import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import Chapter from './Chapter';
import expertApi from '../../../_actions/expertApi';
import Loading from '../../../components/Loading';
import { useRecoilValue } from 'recoil';
import { toastAtom } from '../../../_state';
import AddChapterModal from './AddChapterModal';
import sortByDate from '../../../libs/sortByDate';
import ToastNoti from '../../../components/ToastNoti';
import { useNavigate } from 'react-router-dom';


const Content = ({ course }) => {

   const toast = useRecoilValue(toastAtom);
   const [chapters, setChapters] = useState(null);
   const navigate = useNavigate();
   const loadChapters = async () => {
      try {
         const id = course.id;
         let chapterData = await (await expertApi.getCourseChapter(id)).data;
         chapterData = sortByDate(chapterData);
         setChapters(chapterData);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadChapters();
   }, [])

   useEffect(() => {
      loadChapters();
   }, [toast]);

   return (
      <div className="mt-3 vh-75">
         <h3 className="text-primary border-bottom">Chapters</h3>
         <div className="mt-3">

            {
               chapters ? <Accordion alwaysOpen>
                  {
                     chapters.length > 0 ?
                        chapters.map((chapter, index) => {
                           return <Chapter eventKey={index} chapter={chapter} key={index} />
                        }) : <p>Your course does not have any content.</p>
                  }
               </Accordion> : <Loading />
            }

            <div className="d-flex justify-content-center mt-3">
               <AddChapterModal courseId={course.id} />
            </div>
         </div>
         <ToastNoti />
      </div>
   )
}

export default Content