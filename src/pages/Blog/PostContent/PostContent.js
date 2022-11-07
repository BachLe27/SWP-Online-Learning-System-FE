import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil';
import Loading from '../../../components/Loading';
import Navbar from '../../../components/Navbar'
import ToastNoti from '../../../components/ToastNoti';
import sortByDateAsc from '../../../libs/sortByDateAsc';
import userApi from '../../../_actions/userApi';
import { authAtom, toastAtom } from '../../../_state';
import Comment from './Comment';


const PostContent = () => {

   let { id } = useParams();
   const [post, setPost] = useState();
   const [comments, setComments] = useState();
   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);

   const loadContent = async () => {
      try {
         const postData = await (await userApi.getPostContent(id)).data;
         let commentData = (await userApi.getComment(id)).data;
         setPost(postData);
         commentData = sortByDateAsc(commentData);
         setComments(commentData);
      } catch (error) {

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

   const onSubmit = async (data) => {
      console.log(data);
      try {
         const sendComment = await userApi.sendComment(token, id, data);
         setToast({
            show: true,
            status: 'primary',
            msg: 'Send comment success!'
         })
         reset();
      } catch (error) {
         console.log(error);
      }

   }

   useEffect(() => {
      loadContent();
   }, [])

   useEffect(() => {
      loadContent();
   }, [toast, isSubmitting])

   return (
      <>
         <Navbar />
         {
            post ? <div id="blog-detail-main" class="d-flex justify-content-center mt-6">
               <div class="col-md-7">

                  <div class="post mb-5">
                     <div class="post-title py-3 border-bottom">
                        <h2 class="fw-semibold"> {post.title} </h2>
                     </div>

                     <div class="d-flex mt-4">
                        <img
                           width="50px"
                           height="50px"
                           class="rounded-circle"
                           src={post.author.avatar ? `http://localhost:8000/upload/${post.author.avatar}` : "https://picsum.photos/50/50"}
                           alt=""
                        />
                        <div class="d-flex flex-column ms-3 align-self-center">
                           <span class="fw-semibold">{post.author.full_name}</span>
                           <span class="text-secondary">{post.created_at.substr(0, 10)}</span>
                        </div>
                     </div>

                     <div class="post-content mt-3">
                        <div class="fs-5 text-dark">
                           <ReactMarkdown>{post.content}</ReactMarkdown>
                        </div>
                     </div>
                  </div>

                  <h2 className='mt-6 fw-semibold'>Discussion</h2>
                  <div class="interaction border border-1 rounded-2 mb-5">
                     <div class="mx-3 py-3">
                        <div class="m-3 mb-3 fs-5 d-flex">
                           <div class="me-3">
                              <i class="far fa-comments"></i> <span class="">{comments.length}</span>
                           </div>
                           <div>
                              <i class="far fa-heart"></i> <span class=""> </span>
                           </div>
                        </div>

                        {
                           token ? <>
                              <Form class="py-3 border-bottom d-flex" onSubmit={handleSubmit(onSubmit)}>
                                 <Form.Group className="d-flex mt-4 col-12 mb-5">
                                    <FormControl
                                       {...register("content")}
                                       className="comment-input border-0 border-bottom rounded-0 form-control shadow-none"
                                       type="text"
                                       placeholder="Thinking about post..."
                                    />
                                    <Button variant="outline-dark" className="col-2 ms-3 rounded-1 fw-bold" type="submit" >
                                       {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                                          <span class="visually-hidden">Loading...</span>
                                       </div>} Send
                                    </Button>
                                 </Form.Group>
                              </Form>
                           </> : <></>
                        }

                        <div class="comments mt-4">
                           <h4>Recently Comment</h4>
                           {
                              comments.length > 0 ? comments.map((comment, index) => {
                                 return <Comment comment={comment} key={index} />
                              }) : <p>No comment yet.</p>
                           }
                        </div>
                     </div>
                  </div>
               </div>
               <ToastNoti />
            </div> : <Loading />
         }


      </>
   )
}

export default PostContent