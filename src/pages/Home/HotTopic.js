import React from 'react'
import { Link } from 'react-router-dom'
import HomePost from './HomePost'

const HotTopic = () => {
   return (
      <>
         <h1 class="fw-bold text-center mt-5 mb-5 text-primary border-bottom">Hot topics</h1>
         <div class="home-blogs-container">
            <HomePost />
            <HomePost />
            <HomePost />
            <Link to="blogs" class="text-end">All topics</Link>
         </div>
      </>
   )
}

export default HotTopic