import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import CategoryRow from './CategoryRow';

const Courses = () => {
   return (
      <>
         <Navbar />
         <div className='mt-6 container'>

            <div className="mb-3 d-flex justify-content-center align-items-center flex-column">
               <div className="d-flex align-items-center flex-column">
                  <h2 className='fw-bold text-primary mt-2'>Learning unlimited with us.</h2>
                  <p>Find out your knowledge.</p>
               </div>
            </div>
            <div className="d-flex justify-content-center">
               <form className='col-6'>
                  <div class="mb-3 input-group">
                     <input type="text" class="form-control shadow-none" id="postSearch" placeholder="Search courses..." />
                     <Button variant='secondary' class="input-group-text" type="submit"> <i class="fa-solid fa-magnifying-glass"></i></Button>
                  </div>
               </form>
            </div>

            <div>
               <div className='mt-4 mb-5'>
                  <h4 className='fw-semibold text-danger'><i class="fa-solid fa-fire"></i> Top Categories</h4>
                  <div className='col-5 d-flex justify-content-between mt-3'>
                     <Link>Web development</Link>
                     <Link>Business</Link>
                     <Link>Life Style</Link>
                     <Link>Life Style</Link>
                  </div>

                  {/* <div class="mb-5 col-4">
                     <label for="" class="form-label">Categories</label>
                     <select class="form-select" aria-label="Default select example">
                        <option selected>All categories</option>
                        <option value="1">Front-end</option>
                        <option value="2">OOP</option>
                        <option value="3">.NET</option>
                     </select>
                  </div> */}
               </div>

               <CategoryRow />
               <CategoryRow />
               <CategoryRow />

            </div>
         </div>
      </>

   )
}

export default Courses;