import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Loading from '../../../components/Loading'
import Navbar from '../../../components/Navbar'
import expertApi from '../../../_actions/expertApi'
import userApi from '../../../_actions/userApi'
import { authAtom } from '../../../_state'
import QuizNav from './QuizNav'

const DoQuiz = () => {

   const param = useParams();
   const id = param.lessonId;
   const token = useRecoilValue(authAtom);
   const [quiz, setQuiz] = useState();
   const [lesson, setLesson] = useState();

   const loadQuiz = async () => {
      try {
         const quizData = await (await expertApi.getQuiz(token, id)).data;
         const lessonData = await (await expertApi.getLessonById(id)).data;
         // console.log(quizData.questions);
         // console.log(quizData, lessonData);
         setQuiz(quizData);
         setLesson(lessonData);
      } catch (error) {
         console.log(error);
      }
   }

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset
   } = useForm({
      mode: 'onSubmit',
   });

   useEffect(() => {
      loadQuiz();
   }, [])

   useEffect(() => {

   }, [quiz, lesson]);

   const onSubmit = async (data) => {

      let answers = {
         questions: []
      }

      Object.entries(data).forEach(entry => {
         let [key, value] = entry;
         // console.log(key, value);
         answers.questions.push({
            id: key,
            answer_ids: [value]
         })
      });

      // console.log(answers);

      try {
         const submission = await userApi.submitQuiz(token, lesson.id, answers);
         console.log(submission);
      } catch (error) {
         console.log(error);
      }
   }


   return (
      <>
         <QuizNav lesson={lesson} />

         <div id="quiz-main" class="container mt-6">
            <div class="quiz-item mt-5">
               <Form id="quizForm" onSubmit={handleSubmit(onSubmit)}>
                  {
                     quiz ? <>
                        <h5 className='fw-bold'>Total: <span>{quiz.questions.length}</span> questions</h5>

                     </> : <></>
                  }
                  {
                     quiz ? quiz.questions.map((q, index) => {
                        return <div className="mt-4 border p-3 rounded-2" key={index}>
                           <div>
                              <h5 class="">
                                 <span class="fw-bold">{index + 1}. </span>
                                 {q.content}
                              </h5>
                              <div>
                                 <Form.Check
                                    {...register(`${q.id}`, {
                                       required: true
                                    })}
                                    type="radio"
                                    value={q.answers[0].id}
                                    label={<span>  {`${q.answers[0].content}`}</span>}
                                 />

                                 <Form.Check
                                    {...register(`${q.id}`, {
                                       required: true
                                    })}
                                    type="radio"
                                    value={q.answers[1].id}
                                    label={<span>  {`${q.answers[1].content}`}</span>}
                                 />

                                 <Form.Check
                                    {...register(`${q.id}`, {
                                       required: true
                                    })}
                                    type="radio"
                                    value={q.answers[2].id}
                                    label={<span> {`${q.answers[2].content}`}</span>}
                                 />

                                 <Form.Check
                                    {...register(`${q.id}`, {
                                       required: true
                                    })}
                                    type="radio"
                                    value={q.answers[3].id}
                                    label={<span> {`${q.answers[3].content}`}</span>}
                                 />
                              </div>
                           </div>
                        </div>
                     })
                        : <Loading />
                  }
               </Form>
               {
                  quiz ? <div class="quiz-submit my-5">
                     <Button className="rounded-1 px-4 fw-bold" type="submit" form="quizForm">
                        {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                           <span class="visually-hidden">Loading...</span>
                        </div>} Submit
                     </Button>
                  </div> : <></>
               }

            </div>
         </div>
      </>
   )
}

export default DoQuiz