import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil'
import { authAtom, userAtom } from '../../../_state'
import DeleteComment from './DeleteComment';
import EditComment from './EditComment';

const Comment = ({ comment }) => {

   const user = useRecoilValue(userAtom);

   const toggle = React.forwardRef(({ children, onClick }, ref) => (
      <Link className='me-2 fs-5 text-dark user-select-auto' onClick={(e) => {
         e.preventDefault();
         onClick(e);
      }}> <i class="fa-solid fa-ellipsis-vertical"></i> </Link>
   ));

   return (
      <div class="comment-item mb-3 border bg-white-50 border-secondary rounded-3 p-3">

         <div class="d-flex border-bottom py-2 justify-content-between">
            <div className='d-flex'>
               <img
                  width="50px"
                  height="50px"
                  class="rounded-circle shadow border-secondary"
                  src={comment.author.avatar ? `http://localhost:8000/upload/${comment.author.avatar}` : "https://picsum.photos/50/50"}
                  alt=""
               />

               <div class="d-flex flex-column ms-2 align-self-center">
                  <span class="fw-bold">{comment.author.full_name}</span>
                  <span class="small text-secondary">{comment.created_at}</span>
               </div>
            </div>

            {
               user.id == comment.author.id && <div>
                  <Dropdown>
                     <Dropdown.Toggle as={toggle}></Dropdown.Toggle>
                     <Dropdown.Menu>
                        <DeleteComment commentId={comment.id} />
                        <EditComment commentId={comment.id} content={comment.content} />
                     </Dropdown.Menu>
                  </Dropdown>

               </div>
            }
         </div>

         <div class="rounded-2 ps-2 pt-2">
            <span className='fw-semibold'>{comment.content}</span>
         </div>
      </div>
   )
}

export default Comment