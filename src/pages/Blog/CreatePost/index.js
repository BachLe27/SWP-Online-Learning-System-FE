import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap';
import Footer from '../../../components/Footer';
import { useForm } from 'react-hook-form';


const CreatePost = () => {

   const mdParser = new MarkdownIt(/* Markdown-it options */);
   const [content, setContent] = useState('');
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
      data.content = content;
      try {
         console.log(data);
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

   return (
      <>
         <Navbar />
         <div className='mt-6 px-5'>
            <div className="mb-4">
               <h3 className='fw-bold m-0'>Create post</h3>

            </div>

            <Form className='mb-3' onSubmit={handleSubmit(onSubmit)}>
               <Form.Group className="">
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
               <p className="fw-bold my-2">Content:</p>
               <MdEditor
                  style={{ height: '500px' }}
                  renderHTML={text => mdParser.render(text)}
                  onChange={handleEditorChange}
                  canView={{ fullScreen: false, hideMenu: true }}
                  placeholder="Write your content..."
               // onImageUpload={onImageUpload}
               />
               <div className="my-4 d-flex justify-content-end">
                  <Button type="submit">
                     {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                     </div>} Publish
                  </Button>
               </div>
            </Form>

         </div >
         <Footer />
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