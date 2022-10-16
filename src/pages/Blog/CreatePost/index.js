import React from 'react'
import Navbar from '../../../components/Navbar'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap';
import Footer from '../../../components/Footer';


const CreatePost = () => {


   const mdParser = new MarkdownIt(/* Markdown-it options */);

   // function onImageUpload(file) {
   //    return new Promise(resolve => {
   //       const reader = new FileReader();
   //       reader.onload = data => {
   //          resolve(data.target.result);
   //       };
   //       reader.readAsDataURL(file);
   //    });
   // }

   // Finish!
   function handleEditorChange({ html, text }) {
      console.log(html, text);
   }

   return (
      <>
         <Navbar />
         <div className='mt-6 px-5'>
            <div className="mb-4">
               <h3 className='fw-bold m-0'>Create post</h3>

            </div>

            <Form className='mb-3'>
               <Form.Group className="">
                  <Form.Label className="fw-bold">Title:</Form.Label>
                  <Form.Control placeholder='Title for your post...' className='border-none shadow-none'></Form.Control>
               </Form.Group>
            </Form>
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
               <Button>Publish</Button>
            </div>
         </div>
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