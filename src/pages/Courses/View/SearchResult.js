import React from 'react'

const SearchResult = ({ result }) => {
   return (
      <div className="position-relative col-6" height="200px" style={{ zIndex: "1000" }}>
         <div className="position-absolute w-100 p-3 border border-2 bg-white shadow rounded top-0 left-0">
            {
               result && result.length > 0 ? result.map((item, index) => {
                  return <>
                     <div className='py-2 d-flex align-items-center border-bottom rounded'>
                        <img
                           className="border border-secondary rounded-3"
                           height="60px"
                           width="60px"
                           src={`http://localhost:8000/upload/${item.image}`}
                           alt=""
                        />
                        <div className='ms-3'>
                           <p className='m-0 fw-bold'>{item.title}</p>
                           <p className=''>Create at: {item.created_at.substr(0, 10)}</p>
                        </div>
                     </div>
                  </>
               }) : <div className='mb-2'>
                  <div className='d-flex align-items-center p-3'>
                     <p className='fw-bold m-0'>Course not found... </p>
                  </div>
               </div>
            }
         </div>
      </div>
   )
}

export default SearchResult