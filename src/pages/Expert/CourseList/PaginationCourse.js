import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';

const PaginationCourse = ({ page }) => {

   const active = page;
   let items = [];

   for (let number = 1; number <= 5; number++) {
      items.push(
         <Pagination.Item key={number} active={number === active}>
            <Link to={`/expert/course/${number}`}> {number} </Link>
         </Pagination.Item>,
      );
   }

   return (
      <div>
         <Pagination>{items}</Pagination>
      </div>
   )
}

export default PaginationCourse;