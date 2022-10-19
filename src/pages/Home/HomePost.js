import React from 'react'

const HomePost = () => {
   return (
      <div class="mb-5 row">
         <div class="post-img col-md-4">
            <img
               width="100%"
               src="https://picsum.photos/500/300"
               alt=""
            />
         </div>
         <div class="col-md-8 d-flex flex-column align-self-center">
            <h4 class="fw-bold">Topic title: this is title</h4>
            <p class="m-0">Author: author name</p>
            <p class="m-0">Date: dd/MM/yyyy</p>
            <p class="mt-2">
               Lorem Ipsum is simply dummy text of the printing
               and typesetting industry. Lorem Ipsum has been
               the industry's standard dummy text ever since
               the 1500s, when an unknown printer took a galley
               of type and scrambled it to make a type specimen
               book
            </p>
         </div>

      </div>
   )
}

export default HomePost