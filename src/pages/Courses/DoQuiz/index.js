import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
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
   const [submission, setSubmission] = useState();
   const navigate = useNavigate();
   const loadQuiz = async () => {
      try {
         const quizData = await (await expertApi.getQuiz(token, id)).data;
         const lessonData = await (await expertApi.getLessonById(token, id)).data;
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
         const sendSubmission = await (await userApi.submitQuiz(token, lesson.id, answers)).data;
         console.log(sendSubmission);
         setSubmission(sendSubmission);
         window.scrollTo(0, 0);
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
                     submission && <Alert className='rounded-0 shadow' variant={submission.is_passed ? "success" : "danger"}>
                        <h5 className='fw-bold'>
                           {submission.is_passed ? "Congratulations! You passed!" : "Not passed. Please try again!"}
                        </h5>
                        <div class="">
                           <span class="fw-semibold">Grade received</span> <span> {submission.correct_count / submission.total_count * 100}%</span>
                        </div>
                        <div class="">
                           <span class="fw-semibold">To pass</span> <span> {submission.to_pass * 100}% or higher</span>
                        </div>
                     </Alert>
                  }

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
                                    disabled={submission ? true : false}
                                    {...register(`${q.id}`, {
                                       required: true
                                    })}

                                    type="radio"
                                    value={q.answers[0].id}
                                    label={<span>  {`${q.answers[0].content}`}</span>}
                                 />

                                 <Form.Check
                                    disabled={submission ? true : false}
                                    {...register(`${q.id}`, {
                                       required: true
                                    })}
                                    type="radio"
                                    value={q.answers[1].id}
                                    label={<span>  {`${q.answers[1].content}`}</span>}
                                 />

                                 <Form.Check
                                    disabled={submission ? true : false}
                                    {...register(`${q.id}`, {
                                       required: true
                                    })}
                                    type="radio"
                                    value={q.answers[2].id}
                                    label={<span> {`${q.answers[2].content}`}</span>}
                                 />

                                 <Form.Check
                                    disabled={submission ? true : false}
                                    {...register(`${q.id}`, {
                                       required: true
                                    })}
                                    type="radio"
                                    value={q.answers[3].id}
                                    label={<span> {`${q.answers[3].content}`}</span>}
                                 />
                                 {
                                    submission ? submission.questions[index].is_correct ?
                                       <h5 className="text-white bg-success py-1 mt-2 px-2">Correct Answer</h5> :
                                       <h5 className="text-white bg-danger py-1 mt-2 px-2">Wrong Answer</h5>
                                       : <></>
                                 }
                              </div>
                           </div>
                        </div>
                     })
                        : <Loading />
                  }
               </Form>
               {
                  quiz ? <div class="quiz-submit my-5 d-flex justify-content-center">
                     {
                        !submission ? <Button className="rounded-1 px-5 py-1 fw-bold" type="submit" form="quizForm">
                           {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                              <span class="visually-hidden">Loading...</span>
                           </div>} Submit
                        </Button> : <Button onClick={() => { navigate(0) }} className="rounded-1 px-5 py-1 fw-bold"> <i class="fa-solid fa-arrow-rotate-right"></i> Try Again!</Button>
                     }

                  </div> : <></>
               }

            </div>
         </div>
      </>
   )
}

export default DoQuiz