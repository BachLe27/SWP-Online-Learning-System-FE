import MarkdownIt from 'markdown-it';
import React, { useState } from 'react'
import { Alert, Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import userApi from '../../../_actions/userApi';
import { authAtom, toastAtom } from '../../../_state';
import MdEditor from 'react-markdown-editor-lite';
import { useEffect } from 'react';
import Loading from '../../../components/Loading';

const Edit = ({ postId }) => {
   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);
   const navigate = useNavigate();
   const mdParser = new MarkdownIt(/* Markdown-it options */);
   const [content, setContent] = useState('');
   const [error, setError] = useState('');
   const [img, setImg] = useState();
   const [post, setPost] = useState();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset
   } = useForm({
      mode: 'onTouch',
   });

   const onHide = () => {
      setModalShow(false);
   }

   const handleUploadImage = async (e) => {
      console.log(e.target.files[0]);

      try {
         const image = e.target.files[0];
         const uploadId = await (await userApi.upload(token, image)).data.detail;
         setImg(uploadId);
      } catch (error) {
         console.log(error);
      }
   }

   function handleEditorChange({ html, text }) {
      setContent(text);
   }

   const onSubmit = async (data) => {
      if (content == '') {
         setError('Content must not empty!');
         return;
      }

      data.content = content;
      data.cover = img;
      try {
         // console.log(data);
         const updatePost = await userApi.updatePost(token, postId, data);
         setToast({
            show: true,
            status: 'primary',
            msg: 'Update post success!'
         })
         setModalShow(false);
      } catch (error) {
         console.log(error);
      }
   };

   const loadContent = async () => {
      const id = postId;
      try {
         const postData = await (await userApi.getPostContent(id)).data;
         setPost(postData);
         setImg(postData.cover);
         setContent(postData.content);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadContent();
   }, [])

   return (
      <>
         <Dropdown.Item onClick={() => setModalShow(true)} eventKey="edit">Edit</Dropdown.Item>


         <Modal show={modalShow} onHide={onHide} size="lg" backdrop="static" fullscreen={true}>
            <Modal.Header closeButton>
               <Modal.Title>Edit post</Modal.Title>
            </Modal.Header>
            {
               post ? <Modal.Body>
                  <Form id="editPost" className='mb-3' onSubmit={handleSubmit(onSubmit)}>
                     <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Title:</Form.Label>
                        <Form.Control
                           {...register("title", {
                              required: true
                           })}
                           placeholder='Title for your post...'
                           className='border-none shadow-none'
                           isInvalid={errors.title}
                           defaultValue={post.title}
                        />
                        <Form.Control.Feedback type="invalid">
                           Title is required
                        </Form.Control.Feedback>
                     </Form.Group>

                     <Form.Group className="mb-3" controlId="courseImg">
                        <Form.Label className="fw-semibold">Cover Image</Form.Label>
                        <Form.Control
                           {...register("cover")}
                           onChange={handleUploadImage}
                           type="file"
                           accept=".jpg, .png, .jpeg"
                        />
                     </Form.Group>

                     <Form.Label className="fw-semibold me-4">Preview Image:</Form.Label>
                     {
                        img && <>
                           <img width="200px" height="200px" className='border' src={`http://localhost:8000/upload/${img}`} alt="" />
                        </>
                     }

                     <p className="fw-bold my-2">Content:</p>
                     {
                        error ? <Alert variant='danger' dismissible onClose={() => setError(null)}>
                           <span>{error}</span>
                        </Alert> : <></>
                     }
                     <MdEditor
                        style={{ height: '400px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                        canView={{ fullScreen: false, hideMenu: true }}
                        placeholder="Write your content..."
                        value={content}
                     // onImageUpload={onImageUpload}
                     />

                  </Form>
               </Modal.Body> : <Loading />
            }

            <Modal.Footer>
               <Button variant="secondary" onClick={() => {
                  setModalShow(false);
                  reset();
               }}>Close</Button>
               <Button className="fw-bold px-3 rounded-1 shadow" type="submit" form="editPost" >
                  {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>} Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   )
}

export default Edit