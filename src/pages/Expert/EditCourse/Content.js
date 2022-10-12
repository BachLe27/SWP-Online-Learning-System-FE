import React, { useEffect, useState } from 'react'
import { Accordion, Button } from 'react-bootstrap'
import Chapter from './Chapter';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import expertApi from '../../../_actions/expertApi';
import Loading from '../../../components/Loading';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../../_state';

const AddChapterModal = (props) => {

   const token = useRecoilValue(authAtom);

   const onSubmit = async (data) => {
      console.log(data);
      try {
         const id = props.courseId;
         const addChapter = await expertApi.createChapter(token, id, data);
         console.log(addChapter);

      } catch (error) {
         console.log(error);
      }
   }

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm({
      mode: 'onSubmit',
   });

   return (
      <Modal {...props} size="lg">
         <Modal.Header closeButton>
            <Modal.Title>New Chapter</Modal.Title>
         </Modal.Header>

         <Modal.Body>
            <Form id="addChapterForm" onSubmit={handleSubmit(onSubmit)}>
               <Form.Group className="mb-3" controlId="chapterTitle">
                  <Form.Label>Chapter Title</Form.Label>
                  <Form.Control
                     {...register("title", {
                        require: true
                     })}
                     type="text"
                     placeholder="Enter title"
                  />
               </Form.Group>

               <Form.Group className="mb-3" controlId="chapterDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                     {...register("description", {
                        require: true
                     })}
                     as="textarea"
                     placeholder="Description about chapter..."
                  />
               </Form.Group>
            </Form>
         </Modal.Body>

         <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>Close</Button>
            <Button variant="primary" type="submit" form="addChapterForm" >Add</Button>
         </Modal.Footer>
      </Modal>
   )
}

const Content = ({ course }) => {

   const loadChapters = async () => {
      try {
         const id = course.id;
         const chapterDate = await (await expertApi.getCourseChapter(id)).data;
         setChapters(chapterDate);
         console.log(chapterDate);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadChapters();
   }, [])

   const [modalShow, setModalShow] = useState(false);
   const [chapters, setChapters] = useState(null);

   return (
      <div className="mt-3 vh-75">
         <h3 className="text-primary border-bottom">Content</h3>
         <div className="mt-3">

            {
               chapters ? <Accordion alwaysOpen>
                  <Chapter eventKey={1} />
                  <Chapter eventKey={2} />
               </Accordion> : <Loading />
            }

            <div className="d-flex justify-content-center mt-3">
               <Button onClick={() => setModalShow(true)}>  <i class="fa-solid fa-plus"></i> Add Chapter</Button>
            </div>
            <AddChapterModal courseId={course.id} show={modalShow} onHide={() => setModalShow(false)} />
         </div>
      </div>
   )
}

export default Content