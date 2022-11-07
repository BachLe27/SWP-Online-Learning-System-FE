import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Alert, Button, Form, FormGroup, FormLabel } from 'react-bootstrap';
import Footer from '../../../components/Footer';
import { useForm } from 'react-hook-form';
import userApi from '../../../_actions/userApi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authAtom, toastAtom } from '../../../_state';
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {

   const mdParser = new MarkdownIt(/* Markdown-it options */);
   const [content, setContent] = useState('');
   const setToast = useSetRecoilState(toastAtom);
   const token = useRecoilValue(authAtom);
   const [error, setError] = useState('');
   const navigate = useNavigate();
   const [img, setImg] = useState();
   // function onImageUpload(file) {
   //    return new Promise(resolve => {
   //       const reader = new FileReader();
   //       reader.onload = data => {
   //          resolve(data.target.result);
   //       };
   //       reader.readAsDataURL(file);
   //    });
   // }
   const onSubmit = async (data) => {
      if (content == '') {
         setError('Content must not empty!');
         return;
      }

      data.content = content;
      data.cover = img;
      try {
         // console.log(data);
         const createPost = await userApi.createPost(token, data);
         setToast({
            show: true,
            status: 'primary',
            msg: 'Your writing posted!'
         })
         navigate('/blog');
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
      mode: 'onTouch',
   });

   // Finish!
   function handleEditorChange({ html, text }) {
      setContent(text);
   }

   const handleUploadImage = async (e) => {
      console.log(e.target.files[0]);

      try {
         const image = e.target.files[0];
         const uploadId = await (await userApi.upload(token, image)).data.detail;
         console.log(uploadId);
         setImg(uploadId);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {

   }, [error])

   return (
      <>
         <Navbar />
         <div className='mt-6 px-5'>
            <div className="mb-4">
               <h3 className='fw-bold m-0 text-dark'>Share your knowledge with us.</h3>
            </div>

            <Form className='mb-3' onSubmit={handleSubmit(onSubmit)}>
               <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Title:</Form.Label>
                  <Form.Control
                     {...register("title", {
                        required: true
                     })}
                     placeholder='Title for your post...'
                     className='border-none shadow-none'
                     isInvalid={errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                     Title is required
                  </Form.Control.Feedback>
               </Form.Group>

               <Form.Group className="mb-3" controlId="courseImg">
                  <Form.Label className="fw-semibold">Cover Image</Form.Label>
                  <Form.Control
                     {...register("cover", {
                        required: true
                     })}
                     onChange={handleUploadImage}
                     type="file"
                     accept=".jpg, .png, .jpeg"
                  />
               </Form.Group>

               <Form.Label className="fw-semibold">Preview Image:</Form.Label>
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
               // onImageUpload={onImageUpload}
               />
               <div className="my-4 d-flex justify-content-end">
                  <Button className="rounded-1 px-4 fw-bold py-2 shadow" type="submit">
                     {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                     </div>} Post Now!
                  </Button>
               </div>
            </Form>
         </div >
         {/* <Footer /> */}
      </>
   )
}

export default CreatePost

// import React from 'react'

// const index = () => {
//    return (
//       <div>index</div>
//    )
// }

// export default index