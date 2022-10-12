import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const VerticalNav = ({ activeLink }) => {
   return (
      <div>
         <Nav variant="pills" className="fw-bold flex-column h-100 position-fixed top-0 bottom-0 mt-6" defaultActiveKey={activeLink}>
            <Nav.Link as={Link} to="/expert" eventKey="/expert"><i class="fa-solid fa-house-user"></i> Expert</Nav.Link>
            <Nav.Link as={Link} to="/expert/course/1" eventKey="/expert/course"><i class="fa-solid fa-table-list"></i> My Courses</Nav.Link>
            <Nav.Link as={Link} to="/expert/question" eventKey="/expert/question"><i class="fa-solid fa-person-circle-question"></i> Question</Nav.Link>
            <Nav.Link as={Link} to="/expert/feedback" eventKey="/expert/feedback"><i class="fa-regular fa-comment-dots"></i> Feedback</Nav.Link>
            <Nav.Link as={Link} to="/expert/create" eventKey="/expert/create"><i class="fa-solid fa-plus"></i> Create Course</Nav.Link>
         </Nav>
      </div>
   )
}

export default VerticalNav