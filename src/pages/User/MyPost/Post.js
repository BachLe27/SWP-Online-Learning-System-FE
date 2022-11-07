import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Delete from './Delete';
import Edit from './Edit';

const Post = ({ post }) => {

   const navigate = useNavigate();
   const toggle = React.forwardRef(({ children, onClick }, ref) => (
      <Link className='me-2 fs-5 text-dark user-select-auto' onClick={(e) => {
         e.preventDefault();
         onClick(e);
      }}> <i class="fa-solid fa-ellipsis-vertical"></i> </Link>
   ));

   return (
      <div class="my-post-item mb-3 row border rounded-2 p-2" style={{ height: "200px" }}>
         <div class="post-img col-3 my-1 border d-flex justify-content-center" width="270px" height="190px">
            <img className="rounded-1" width="170px" height="170px" src={post.cover ? `http://localhost:8000/upload/${post.cover}` : `https://picsum.photos/270/190`} alt="" />
         </div>

         <div class="col-9 d-flex flex-column align-self-center px-4">
            <div className='d-flex justify-content-between'>
               <div>
                  <h4 class="fw-bold"> {post.title} </h4>
                  <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
               </div>

               <div>
                  <Dropdown>
                     <Dropdown.Toggle drop="start" as={toggle}></Dropdown.Toggle>
                     <Dropdown.Menu>
                        <Delete postId={post.id} />
                        <Edit postId={post.id} />
                     </Dropdown.Menu>
                  </Dropdown>

               </div>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
               <div className='d-flex align-items-center'>
                  <img src="https://picsum.photos/50/50" className='rounded-circle me-2' alt="" />
                  <p class="m-0"> <span className='fw-semibold'>{post.author.full_name || "ADMIN"}</span> • <span className='text-muted'>{post.created_at.substr(0, 10)}</span> </p>
               </div>

               <div className='d-flex justify-content-end'>
                  <span><i class="fa-regular fa-comments"></i> <span>0</span></span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Post