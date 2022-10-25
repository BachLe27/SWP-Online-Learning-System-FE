import React from 'react'
import { Link } from 'react-router-dom'
import Course from './Course'

const CategoryRow = ({ name, courses }) => {
   return (
      <div class="category-container mb-4">
         <div class="category-name d-flex justify-content-between align-items-center">
            <h3 class="fw-semibold">{name}</h3>

         </div>

         <div class="courses row">
            {
               courses ? courses.map((course, index) => {
                  return <Course key={index} course={course} />
               }) : <></>
            }
         </div>

         <div className='float-end'>
            <Link>View all...</Link>
         </div>
      </div>
   )
}

export default CategoryRow