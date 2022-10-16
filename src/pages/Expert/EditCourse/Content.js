import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import Chapter from './Chapter';
import expertApi from '../../../_actions/expertApi';
import Loading from '../../../components/Loading';
import { useRecoilValue } from 'recoil';
import { toastAtom } from '../../../_state';
import AddChapterModal from './AddChapterModal';


const Content = ({ course }) => {

   const toast = useRecoilValue(toastAtom);

   const loadChapters = async () => {
      try {
         const id = course.id;
         const chapterData = await (await expertApi.getCourseChapter(id)).data;
         chapterData.sort((a, b) => {
            return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0);
         });
         setChapters(chapterData);
         console.log(chapterData);
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

   const [chapters, setChapters] = useState(null);

   return (
      <div className="mt-3 vh-75">
         <h3 className="text-primary border-bottom">Chapters</h3>
         <div className="mt-3">

            {
               chapters ? <Accordion alwaysOpen>
                  {
                     chapters.length > 0 ?
                        chapters.map((chapter, index) => {
                           return <Chapter eventKey={index} chapter={chapter} />
                        }) : <p>Your course does not have any content.</p>
                  }
               </Accordion> : <Loading />
            }

            <div className="d-flex justify-content-center mt-3">
               <AddChapterModal courseId={course.id} />
            </div>

         </div>
      </div>
   )
}

export default Content