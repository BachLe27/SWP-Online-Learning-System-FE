import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import userApi from '../../../_actions/userApi';

const PostOverview = ({ post }) => {

   const navigate = useNavigate();

   return (
      <div onClick={() => { navigate(`/post/${post.id}`) }} class="post-item mb-3 row border rounded-2 p-2" style={{ height: "200px" }}>
         <div class="post-img col-3 my-1 border d-flex justify-content-center" width="270px" height="190px">
            <img className="rounded-1" width="170px" height="170px" src={post.cover ? `http://localhost:8000/upload/${post.cover}` : `https://picsum.photos/270/190`} alt="" />
         </div>

         <div class="col-9 d-flex flex-column align-self-center px-4">
            <h4 class="fw-bold"> {post.title} </h4>
            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            <div className='d-flex justify-content-between align-items-center'>
               <div className='d-flex align-items-center'>
                  <img src={post.author.avatar ? `http://localhost:8000/upload/${post.author.avatar}` : "https://picsum.photos/50/50"} height="50px" width="50px" className='rounded-circle me-2' alt="" />
                  <p class="m-0"> <span className='fw-semibold'>{post.author.full_name || "ADMIN"}</span> • <span className='text-muted'>{post.created_at.substr(0, 10)}</span> </p>
               </div>

               <div className='d-flex justify-content-end'>
                  <span><i class="fa-regular fa-comments"></i> <span>{post.comment_count}</span></span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PostOverview