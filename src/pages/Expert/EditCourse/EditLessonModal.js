import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, toastAtom } from '../../../_state';
import ToastNoti from '../../../components/ToastNoti';
import expertApi from '../../../_actions/expertApi';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const EditLessonModal = ({ lesson }) => {

   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);
   const [content, setContent] = useState(lesson.content);
   const mdParser = new MarkdownIt();
   // function onImageUpload(file) {
   //    return new Promise(resolve => {
   //       const reader = new FileReader();
   //       reader.onload = data => {
   //          resolve(data.target.result);
   //       };
   //       reader.readAsDataURL(file);
   //    });
   // }
   const loadLesson = async () => {

   }


   // Finish!
   function handleEditorChange({ html, text }) {
      // console.log(html, text);
      setContent(text);
   }

   const onSubmit = async (data) => {
      try {
         data.content = content;
         const updateLesson = await expertApi.updateLesson(token, lesson.id, data);
         console.log(updateLesson);

         setToast({
            show: true,
            status: 'primary',
            msg: 'Update Lesson Success'
         })

         reset();
         setModalShow(false);
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

   const onHide = () => {
      setModalShow(false)
   }

   return (
      <>
         <Button variant="warning" onClick={() => setModalShow(true)}>
            <i class="fa-solid fa-pen"></i>
         </Button>
         <Modal show={modalShow} onHide={onHide} fullscreen={true} backdrop="static" >
            <Modal.Header closeButton>
               <Modal.Title className="fw-bold">Edit Lesson</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               <Form id="EditLessonForm" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="lessonTitle">

                     <Form.Label className="fw-semibold">Lesson Title</Form.Label>
                     <Form.Control
                        {...register("title", {
                           required: true
                        })}
                        type="text"
                        placeholder="Enter title"
                        defaultValue={lesson.title}
                        className={`${errors.title ? "is-invalid" : ""}`}
                     />
                     <Form.Control.Feedback type="invalid">
                        Lesson title is required
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="lesonDuration">
                     <Form.Label className="fw-semibold">Lesson Duration (minutes)</Form.Label>
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
                        Lesson duration is required
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="lessonDescription">
                     <Form.Label className="fw-semibold">Description</Form.Label>
                     <Form.Control
                        {...register("description", {
                           required: true
                        })}
                        as="textarea"
                        placeholder="Description about chapter..."
                        className={`${errors.description ? "is-invalid" : ""}`}
                        defaultValue={lesson.description}
                     />
                     <Form.Control.Feedback type="invalid">
                        Lesson description is required
                     </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="lessonContent">
                     <Form.Label className="fw-semibold">Lesson Content</Form.Label>
                     <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                        canView={{ fullScreen: false, hideMenu: true }}
                        placeholder="Write your content..."
                        value={content}
                     // onImageUpload={onImageUpload}
                     />
                  </Form.Group>
               </Form>
            </Modal.Body>

            <Modal.Footer>
               <Button variant="secondary" onClick={onHide}>Close</Button>
               <Button variant="warning" type="submit" form="EditLessonForm" >
                  {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>} Update Lesson
               </Button>
            </Modal.Footer>
         </Modal>
         <ToastNoti />
      </>
   )
}

export default EditLessonModal

