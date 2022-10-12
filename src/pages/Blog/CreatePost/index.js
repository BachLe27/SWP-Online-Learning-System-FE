// import React from 'react'
// import Navbar from '../../../components/Navbar'
// import * as ReactDOM from 'react-dom';
// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
// import 'react-markdown-editor-lite/lib/index.css';
// import { Form, FormGroup, FormLabel } from 'react-bootstrap';


// const CreatePost = () => {


//    const mdParser = new MarkdownIt(/* Markdown-it options */);

//    // function onImageUpload(file) {
//    //    return new Promise(resolve => {
//    //       const reader = new FileReader();
//    //       reader.onload = data => {
//    //          resolve(data.target.result);
//    //       };
//    //       reader.readAsDataURL(file);
//    //    });
//    // }

//    // Finish!
//    function handleEditorChange({ html, text }) {
//       console.log(html, text);
//    }

//    return (
//       <>
//          <Navbar />
//          <div className='mt-6'>
//             <h3 className='fw-bold'>Create post</h3>

//             <Form className='mb-3 col-6'>
//                <Form.Group>
//                   <Form.Label>Title for post</Form.Label>
//                   <Form.Control placeholder='Heading' className='border-none shadow-none'></Form.Control>
//                </Form.Group>
//             </Form>
//             <MdEditor
//                style={{ height: '500px' }}
//                renderHTML={text => mdParser.render(text)}
//                onChange={handleEditorChange}
//                canView={{ fullScreen: false, hideMenu: true }}
//             // onImageUpload={onImageUpload}
//             />
//          </div>
//       </>
//    )
// }

// export default CreatePost

import React from 'react'

const index = () => {
   return (
      <div>index</div>
   )
}

export default index