import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Navbar from '../../../components/Navbar'
import PostOverview from './PostOverview'


const Blog = () => {
   return (
      <>
         <Navbar />
         <div id="blog-main" class="container mt-7">

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

            {/* <div class="mt-3 pb-3 border-bottom border-dark">
               <Button className="me-2" variant="danger"> Hot </Button>
               <Button className="me-2" variant="info"> Newest </Button>
            </div> */}

            <ul class="nav nav-tabs mt-3 mb-5">
               <li class="nav-item">
                  <a class="fw-bold nav-link active text-primary" href="#"><i class="fa-solid fa-newspaper"></i> Newest</a>
               </li>
               <li class="nav-item">
                  <a class="fw-bold nav-link text-danger" href="#"><i class="fa-solid fa-fire"></i> Hot</a>
               </li>
            </ul>

            <div class="posts my-4">

               <PostOverview />
               <PostOverview />
               <PostOverview />
               <PostOverview />
               <PostOverview />

            </div>

            <nav aria-label="Page navigation example">
               <ul class="pagination justify-content-center">
                  <li class="page-item disabled">
                     <a
                        className="page-link"
                        href="#"
                        tabindex="-1"
                        aria-disabled="true"
                     >Previous</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">2</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">3</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">...</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">Next</a>
                  </li>
               </ul>
            </nav>
         </div>

      </>
   )
}

export default Blog