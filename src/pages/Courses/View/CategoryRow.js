import React from 'react'
import { Link } from 'react-router-dom'
import Course from './Course'

const CategoryRow = () => {
   return (
      <div class="category-container mb-4">
         <div class="category-name d-flex justify-content-between align-items-center">
            <h3 class="fw-semibold">Front-end Web Development</h3>

         </div>

         <div class="courses row">
            <Course />
            <Course />
            <Course />
            <Course />
         </div>

         <div className='float-end'>
            <Link>View all...</Link>
         </div>
      </div>
   )
}

export default CategoryRow