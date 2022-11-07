import React from 'react'
import { Link } from 'react-router-dom'
import HomePost from './HomePost'

const HotTopic = ({ posts }) => {
   return (
      <>
         <h1 class="fw-bold text-center mt-5 mb-5 text-primary border-bottom">Hot topics</h1>
         <div class="home-blogs-container">
            {posts && posts.map((post, index) => {
               return <HomePost key={index} post={post} />
            })}
         </div>
      </>
   )
}

export default HotTopic