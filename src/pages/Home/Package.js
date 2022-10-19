import React from 'react'

const Package = () => {
   return (
      <div class="col-md-4 px-4">
         <div class="border border-dark rounded-3">
            <h4 class="text-center py-3 border-bottom border-dark fw-bold text-primary">Start package</h4>

            <div class="px-4 text-center pt-4">
               <h3 class="fw-bold">6 months</h3>
               <h1 className='fw-bold mt-2'>
                  <span class="text-primary"> $799</span>
               </h1>
               <h5 class="">Learning Unlimited</h5>
               <h5 class="">Acces to all courses</h5>

               <h5>End of discount: dd/MM/yyyy</h5>
            </div>

            <div className='d-flex justify-content-center my-4'>
               <button class="btn btn-primary rounded-0 px-5 py-2">
                  Buy now
               </button>
            </div>
         </div>
      </div>
   )
}

export default Package