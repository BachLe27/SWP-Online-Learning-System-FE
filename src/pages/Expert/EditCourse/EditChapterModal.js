import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import expertApi from '../../../_actions/expertApi';
import Loading from '../../../components/Loading';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, toastAtom } from '../../../_state';
import ToastNoti from '../../../components/ToastNoti';
import userApi from '../../../_actions/userApi';


const EditChapterModal = ({ chapterId }) => {

   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);
   const [data, setData] = useState();

   const loadChapter = async () => {
      try {
         const chapterData = await (await userApi.getChapterData(chapterId)).data;
         setData(chapterData);
      } catch (error) {
         console.log(error);
      }
   }

   const onSubmit = async (data) => {
      try {
         // const id = courseId;
         console.log(chapterId);
         const update = await expertApi.updateChapter(token, chapterId, data);
         console.log(update);
         // set

         setToast({
            show: true,
            status: 'primary',
            msg: 'Update Chapter Success'
         })
         setModalShow(false);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadChapter();
   }, [modalShow])

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset
   } = useForm({
      mode: 'onTouch',
   });

   const onHide = () => {
      setModalShow(false)
   }

   return (
      <>
         <Button onClick={() => setModalShow(true)} variant="warning" className="mb-2 mx-2">
            <i class="fa-solid fa-pen"></i>
         </Button>

         <Modal show={modalShow} onHide={onHide} size="lg">
            <Modal.Header closeButton>
               <Modal.Title>New Chapter</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               {
                  data ? <Form id={`editChapter${chapterId}`} onSubmit={handleSubmit(onSubmit)}>

                     <Form.Group className="mb-3" controlId="chapterTitle">
                        <Form.Label className="fw-bold">Chapter Title</Form.Label>
                        <Form.Control
                           {...register("title", {
                              required: true
                           })}
                           className={`${errors.title ? "is-invalid" : ""}`}
                           type="text"
                           placeholder="Enter title"
                           defaultValue={data.title}
                        />
                        <Form.Control.Feedback type="invalid">
                           Chapter title is required
                        </Form.Control.Feedback>
                     </Form.Group>

                     <Form.Group className="mb-3" controlId="chapterDescription">
                        <Form.Label className="fw-bold">Description</Form.Label>
                        <Form.Control
                           {...register("description", {
                              required: true
                           })}
                           className={`${errors.description ? "is-invalid" : ""}`}
                           as="textarea"
                           placeholder="Description about chapter..."
                           defaultValue={data.description}
                        />
                        <Form.Control.Feedback type="invalid">
                           Chapter description is required
                        </Form.Control.Feedback>
                     </Form.Group>
                  </Form> : <Loading />
               }

            </Modal.Body>

            <Modal.Footer>
               <Button variant="secondary" onClick={onHide}>Close</Button>
               <Button variant="primary" type="submit" form={`editChapter${chapterId}`} >
                  {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>} Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
         <ToastNoti />
      </>
   )
}

export default EditChapterModal