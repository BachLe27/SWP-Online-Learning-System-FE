import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Loading from '../../../components/Loading';
import expertApi from '../../../_actions/expertApi'
import { authAtom } from '../../../_state';
import StartQuiz from './StartQuiz';

const QuizOverview = ({ lesson }) => {

   const [quiz, setQuiz] = useState();
   const param = useParams();
   const token = useRecoilValue(authAtom);


   const loadQuiz = async () => {
      try {
         const quizData = await (await expertApi.getQuiz(token, lesson.id)).data;
         console.log(quizData);
         setQuiz(quizData);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadQuiz();
   }, [])

   useEffect(() => {

   }, [quiz])

   // useEffect(() => {
   //    loadQuiz();
   // }, [param.lessonId])

   return (
      <div className='container'>
         <div className=''>
            <p>{lesson.description}</p>
            <StartQuiz lessonId={lesson.id} />
         </div>
         {
            quiz ? <div className='border p-3 mt-3 d-flex'>
               <div className='col-7'>
                  <p className='fw-semibold'>Number of Questions: <span>{quiz.questions.length}</span> </p>
                  <p className='fw-semibold mb-0'>To Pass: <span className='text-danger'>{quiz.to_pass * 100}%</span></p>
               </div>
               <div className='border-start ps-3 col-5'>
                  <p className='fw-bold'>Your Grade</p>
                  <p className='fw-bold mb-0'>-</p>
               </div>
            </div> : <Loading />
         }

      </div>
   )
}

export default QuizOverview