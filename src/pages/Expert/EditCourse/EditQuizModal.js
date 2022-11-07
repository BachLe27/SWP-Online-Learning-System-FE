import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import ToastNoti from '../../../components/ToastNoti';
import expertApi from '../../../_actions/expertApi';
import { authAtom, toastAtom } from '../../../_state';


const EditQuizModal = ({ lesson }) => {
   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);
   const [numberQuestion, setNumberQuestion] = useState();
   const [genNum, setGenNum] = useState();
   const [questionData, setQuestionData] = useState();

   const onSubmit = async (data) => {
      //console.log(chapterId);

      let lessonData = (({ description, duration, title }) => ({ description, duration, title }))(data)
      lessonData.content = '';
      //console.log(lessonData);

      let quizData = (({ to_pass }) => ({ to_pass }))(data);

      quizData.to_pass = (quizData.to_pass / numberQuestion).toFixed(2);
      //console.log(quizData);

      let questionData = (({ questions }) => ({ questions }))(data);

      questionData.questions.forEach(q => {
         q.answers[0].is_correct = (q.answers.is_correct == "A");
         q.answers[1].is_correct = (q.answers.is_correct == "B");
         q.answers[2].is_correct = (q.answers.is_correct == "C");
         q.answers[3].is_correct = (q.answers.is_correct == "D");
      })

      //console.log(questionData);
      try {
         const id = lesson.id;
         const addLesson = await expertApi.createLesson(token, id, lessonData);

         const lessonId = addLesson.data.detail;
         const addQuiz = await expertApi.createQuiz(token, id, quizData);
         console.log(addQuiz.data.detail);

         questionData.questions.forEach(async (q) => {
            const addQuestion = await expertApi.createQuestion(token, id, q);
            console.log(addQuestion);
         })
         setToast({
            show: true,
            status: 'primary',
            msg: 'Add Lesson Success'
         })

         reset();
         setModalShow(false);
      } catch (error) {
         console.log(error);
      }
   }

   const handleChange = (e) => {
      if (e.target.value < 0 || e.target.value > 30) return;
      setNumberQuestion(e.target.value);
   }

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset
   } = useForm({
      mode: 'onSubmit',
   });

   const genQuestion = (len) => {
      let num = (numberQuestion ? numberQuestion : len);
      let x = []
      for (let i = 1; i <= num; i++) {
         x.push(i);
      }
      setGenNum(x);
   }

   const onHide = () => {
      setModalShow(false);
      //setGenNum(0);
      //setNumberQuestion(0);
      reset();
   }

   const loadData = async () => {
      try {
         const quizData = await (await expertApi.getQuiz(token, lesson.id)).data;
         //console.log(quizData);
         setQuestionData(quizData);
         setNumberQuestion(quizData.questions.length);
         genQuestion(quizData.questions.length);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {

   }, [genNum]);

   useEffect(() => {
      loadData();
   }, [])


   return (
      <>
         <Button Button variant="warning" className="me-2" onClick={() => setModalShow(true)}> <i class="fa-solid fa-pen"></i></Button >
         <Modal show={modalShow} onHide={onHide} backdrop="static" fullscreen={true} >
            <Modal.Header closeButton>
               <Modal.Title className="fw-bold">New Quiz {lesson.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center" scrollable={true}>
               <Form id="editQuizForm" onSubmit={handleSubmit(onSubmit)} className="col-7">
                  <Form.Group className="mb-3" controlId="lessonTitle">
                     <Form.Label className="fw-semibold">Title</Form.Label>
                     <Form.Control
                        {...register("title", {
                           required: true
                        })}
                        type="text"
                        placeholder="Enter title"
                        className={`${errors.title ? "is-invalid" : ""}`}
                        defaultValue={lesson.title}
                     />
                     <Form.Control.Feedback type="invalid">
                        Title is required
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="lesonDuration">
                     <Form.Label className="fw-semibold">Duration (minutes)</Form.Label>
                     <Form.Control
                        {...register("duration", {
                           required: true
                        })}
                        type="number"
                        placeholder="Enter duration time"
                        className={`${errors.duration ? "is-invalid" : ""}`}
                        defaultValue={lesson.duration}
                     />
                     <Form.Control.Feedback type="invalid">
                        Duration is required
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="lessonDescription">
                     <Form.Label className="fw-semibold">Description</Form.Label>
                     <Form.Control
                        {...register("description", {
                           required: true
                        })}
                        as="textarea"
                        placeholder="Description about quiz..."
                        className={`${errors.description ? "is-invalid" : ""}`}
                        defaultValue={lesson.description}
                     />
                     <Form.Control.Feedback type="invalid">
                        Lesson description is required
                     </Form.Control.Feedback>
                  </Form.Group>

                  <div className="border p-3 shadow mt-4">
                     <h4 className="fw-bold">Create Question</h4>
                     <Form.Group className="mb-3" controlId="numberQues">
                        <Form.Label className="fw-semibold">Number Of Question</Form.Label>
                        <Form.Control
                           type="number"
                           {...register("numberOfQuestion", {
                              required: true,
                              min: 1,
                              max: 30
                           })}
                           min="1"
                           max="30"
                           onChange={handleChange}
                           value={numberQuestion}
                           placeholder="Number of question..."
                           className={`${errors.numberOfQuestion ? "is-invalid" : ""}`}
                        />
                        <Form.Control.Feedback type="invalid">
                           Enter a valid number
                        </Form.Control.Feedback>
                     </Form.Group>
                     <div className="d-flex justify-content-end">
                        <Button onClick={genQuestion}>Confirm</Button>
                     </div>

                     <div className='mt-3'>
                        {
                           genNum ? <>
                              <Form.Group className="mb-3" controlId="numberQues">
                                 <Form.Label className="fw-semibold">To Pass (Number of Correct)</Form.Label>
                                 <Form.Control
                                    type="number"
                                    {...register("to_pass", {
                                       required: true,
                                       min: 1,
                                       max: { numberQuestion }
                                    })}
                                    min="1"
                                    max={numberQuestion}
                                    placeholder="To pass..."
                                    defaultValue={questionData ? questionData.to_pass * numberQuestion : 0}
                                    className={`${errors.numberOfQuestion ? "is-invalid" : ""}`}
                                 />
                                 <Form.Control.Feedback type="invalid">
                                    Enter a valid number
                                 </Form.Control.Feedback>
                              </Form.Group>
                              <p className="text-primary fw-semibold">Question List</p>
                           </> : <></>
                        }


                        {
                           genNum ? genNum.map((item, index) => {
                              return <div key={item.id}>
                                 <div className="border rounded mt-3 p-2">
                                    <span className='fw-bold'>Question {index + 1}.</span>
                                    <Form.Control
                                       as="textarea"
                                       {...register(`questions.${index}.content`, {
                                          required: true
                                       })}
                                       defaultValue={index < questionData.questions.length ? questionData.questions[index].content : ''}
                                    />

                                    <div className="d-flex justify-content-between mt-3">
                                       <span className='fw-bold'>Answer options:</span>
                                       <span className="fw-bold">Is Correct</span>
                                    </div>

                                    <div>
                                       <div>
                                          <div className='d-flex align-items-center mt-2'>
                                             <span className="me-2">A.</span>
                                             <Form.Control
                                                {...register(`questions.${index}.answers.${0}.content`, {
                                                   required: true
                                                })}
                                                defaultValue={index < questionData.questions.length ? questionData.questions[index].answers[0].content : ''}
                                             />
                                             <Form.Check
                                                {...register(`questions.${index}.answers.is_correct`, {
                                                   required: true
                                                })}
                                                value="A"
                                                className="mx-4 fs-4" type="radio"
                                                defaultChecked={questionData.questions[index].answers[0].is_correct}
                                             />
                                          </div>
                                          <div className='d-flex align-items-center mt-2'>
                                             <span className="me-2">B.</span>
                                             <Form.Control
                                                {...register(`questions.${index}.answers.${1}.content`, {
                                                   required: true
                                                })}
                                                defaultValue={index < questionData.questions.length ? questionData.questions[index].answers[1].content : ''}
                                             />
                                             <Form.Check
                                                {...register(`questions.${index}.answers.is_correct`, {
                                                   required: true
                                                })}
                                                value="B"
                                                className="mx-4 fs-4" type="radio"
                                                defaultChecked={questionData.questions[index].answers[1].is_correct}
                                             />
                                          </div>
                                          <div className='d-flex align-items-center mt-2'>
                                             <span className="me-2">C.</span>
                                             <Form.Control
                                                {...register(`questions.${index}.answers.${2}.content`, {
                                                   required: true
                                                })}
                                                defaultValue={index < questionData.questions.length ? questionData.questions[index].answers[2].content : ''}
                                             />
                                             <Form.Check
                                                {...register(`questions.${index}.answers.is_correct`, {
                                                   required: true
                                                })}
                                                value="C"
                                                className="mx-4 fs-4" type="radio"
                                                defaultChecked={questionData.questions[index].answers[2].is_correct}
                                             />
                                          </div>
                                          <div className='d-flex align-items-center mt-2'>
                                             <span className="me-2">D.</span>
                                             <Form.Control
                                                {...register(`questions.${index}.answers.${3}.content`, {
                                                   required: true
                                                })}
                                                defaultValue={index < questionData.questions.length ? questionData.questions[index].answers[3].content : ''}
                                             />
                                             <Form.Check
                                                {...register(`questions.${index}.answers.is_correct`, {
                                                   required: true
                                                })}
                                                value="D"
                                                className="mx-4 fs-4" type="radio"
                                                defaultChecked={questionData.questions[index].answers[3].is_correct}
                                             />
                                          </div>
                                       </div>

                                    </div>
                                 </div>
                              </div>
                           }) : <></>
                        }
                     </div>
                  </div>

               </Form>
            </Modal.Body>

            <Modal.Footer>
               <Button variant="secondary" onClick={onHide}>Close</Button>
               <Button variant="primary" type="submit" form="editQuizForm" >
                  {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>} Add new quiz
               </Button>
            </Modal.Footer>
         </Modal>
         <ToastNoti />
      </>

   )
}

export default EditQuizModal