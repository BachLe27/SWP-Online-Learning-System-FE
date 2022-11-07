import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Package = ({ pack }) => {
   return (
      <div class="col-md-4 px-4">
         <div class="border border-dark rounded-3">
            <h4 class="text-center py-3 border-bottom border-dark fw-bold text-primary">Start package</h4>

            <div class="px-4 text-center pt-4">
               <h3 class="fw-bold"> {pack.description}</h3>
               <h1 className='fw-bold mt-2'>
                  <span class="text-primary"> ${pack.price}</span>
               </h1>
               <h5 class="">Learning Unlimited</h5>
               <h5 class="">Acces to all courses</h5>

               <h5>End of discount: </h5>
               <h5 className='mb-0'>31/12/2022</h5>
            </div>

            <div className='d-flex justify-content-center mt-3 mb-4'>
               <Button as={Link} to={`/pay/${pack.id}`} state={{ pack: pack }} className='rounded-1 px-5 py-2 fw-bold shadow'> Buy now </Button>
            </div>
         </div>
      </div>
   )
}

export default Package