import React, { useEffect, useState } from 'react'
import { Button, Tab, Tabs } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../../../components/Footer'
import Loading from '../../../components/Loading'
import Navbar from '../../../components/Navbar'
import ToastNoti from '../../../components/ToastNoti'
import sortByComment from '../../../libs/sortByComment'
import sortByDateAsc from '../../../libs/sortByDateAsc'
import userApi from '../../../_actions/userApi'
import PostOverview from './PostOverview'


const Blog = () => {

   const [posts, setPosts] = useState();
   const [key, setKey] = useState('newest');
   const [hots, setHots] = useState([]);

   const loadPost = async () => {
      try {
         let postData = await (await userApi.getPosts()).data;
         let newest = sortByDateAsc(postData);
         setPosts(newest);
      } catch (error) {
         console.log(error);
      }
   }

   const loadHots = async () => {
      try {
         let postData = await (await userApi.getPosts()).data;
         let hot = sortByComment(postData);
         setHots(hot);
      } catch (error) {
         console.log(error);
      }
   }


   useEffect(() => {
      loadPost();
      loadHots();
   }, [])


   return (

      <>
         <Navbar />
         <div id="blog-main" class="container mt-7 mb-5">

            <div className="blog-cover-photo mb-3 d-flex justify-content-center align-items-center flex-column">
               {/* <img width="100%" src="https://picsum.photos/800/300" alt="" /> */}
               <div className="d-flex align-items-center">
                  <h3 className='fw-bold text-primary mt-2'>Share your knowledge with us.</h3>
                  <Button as={Link} to="/write" className='ms-2 fw-bold'><i class="fa-solid fa-pen-nib"></i> Write now!</Button>
               </div>
               <p>Find out discussion here.</p>
            </div>

            <div className="d-flex justify-content-center">
               <form className='col-6'>
                  <div class="mb-3 input-group">
                     <input type="text" class="form-control shadow-none" id="postSearch" placeholder="Search posts..." />
                     <Button variant='secondary' class="input-group-text" type="submit"> <i class="fa-solid fa-magnifying-glass"></i></Button>
                  </div>
               </form>
            </div>

            <Tabs
               id="controlled-tab-example"
               activeKey={key}
               onSelect={(k) => setKey(k)}
               className="mb-5"
            >
               <Tab className="vh-75" eventKey="newest" title={<span className='fw-bold text-primary'><i class="fa-solid fa-newspaper"></i> Newest</span>}>
                  <div class="posts my-4">
                     {
                        posts ? posts.map((post, index) => {
                           return <PostOverview post={post} key={index} />
                        }) : <Loading />
                     }
                  </div>
               </Tab>
               <Tab className="vh-75" eventKey="hot" title={<span className='fw-bold text-danger'><i class="fa-solid fa-fire"></i> Hot</span>}>
                  <div class="posts my-4">
                     {
                        hots ? hots.map((post, index) => {
                           return <PostOverview post={post} key={hots.length * 2 + index + 1} />
                        }) : <Loading />
                     }
                  </div>
               </Tab>
            </Tabs>
         </div>
         <Footer />

         <ToastNoti />
      </>
   )
}

export default Blog