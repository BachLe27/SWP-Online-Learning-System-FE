import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const StaffNav = ({ activeLink }) => {
   return (
      <div>
         <Nav variant="pills" className="fw-bold flex-column h-100 position-fixed top-0 bottom-0 mt-6" defaultActiveKey={activeLink}>

            <Nav.Link as={Link} to="/staff" eventKey="/staff">
               <i class="fa-solid fa-user-gear"></i> Staff
            </Nav.Link>
            <Nav.Link as={Link} to="/staff/categories" eventKey="/staff/categories">
               <i class="fa-solid fa-table-list"></i> Categories
            </Nav.Link>
            <Nav.Link as={Link} to="/staff/statistics" eventKey="/staff/statistics">
               <i class="fa-solid fa-chart-simple"></i> Statistics
            </Nav.Link>

            <Nav.Link as={Link} to="/staff/package" eventKey="/staff/package">
               <i class="fa-solid fa-hand-holding-dollar"></i> Price Package
            </Nav.Link>

            <Nav.Link as={Link} to="/staff/slider" eventKey="/staff/slider">
               <i class="fa-solid fa-sliders"></i> Slider
            </Nav.Link>

         </Nav>
      </div>
   )
}

export default StaffNav