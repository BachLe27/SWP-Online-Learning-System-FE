import React from 'react'
import HomeCourse from './HomeCourse'

const Trending = ({ courses }) => {
   return (
      <div class="category-container">
         <div class="category-name d-flex justify-content-between align-items-center">
            <h3 class="fw-bold">Trending</h3>
         </div>
         <div class="courses mb-4 row">
            {
               courses && courses.map((course, index) => {
                  return <HomeCourse course={course} key={index} />
               })
            }

         </div>
      </div>
   )
}

export default Trending