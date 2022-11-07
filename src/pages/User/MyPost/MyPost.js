import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Loading from '../../../components/Loading';
import Navbar from '../../../components/Navbar'
import ToastNoti from '../../../components/ToastNoti';
import sortByDateAsc from '../../../libs/sortByDateAsc';
import userApi from '../../../_actions/userApi';
import { authAtom, toastAtom } from '../../../_state';
import Post from './Post';

const MyPost = () => {

   const [posts, setPosts] = useState();
   const token = useRecoilValue(authAtom);
   const toast = useRecoilValue(toastAtom);

   const loadPost = async () => {
      try {
         let postData = await (await userApi.getCreatedPosts(token)).data;
         postData = sortByDateAsc(postData);
         setPosts(postData);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadPost();
   }, [])

   useEffect(() => {
      loadPost();
   }, [toast])

   return (
      <>
         <Navbar />
         <div className='mt-6 col-12 d-flex align-items-center flex-column'>
            <div className='mb-4'>
               <h2 className='fw-bold border-bottom'>Your Post</h2>
            </div>
            <div className='col-md-10'>
               {
                  posts && posts.length > 0 ? posts.map((post, index) => {
                     return <Post post={post} key={index} />
                  }) : <h3>You don't have any post yet.</h3>
               }
            </div>
         </div>
         <ToastNoti />
      </>
   )
}

export default MyPost