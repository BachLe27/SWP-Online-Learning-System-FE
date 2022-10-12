import React from 'react'

const PostOverview = () => {
   return (
      <div class="post-item mb-3 row">
         <div class="post-img col-md-4">
            <img width="100%" src="https://picsum.photos/250/130" alt="" />
         </div>
         <div class="col-md-8 d-flex flex-column align-self-center">
            <h4 class="fw-bold">
               Discount Java-web development course
            </h4>
            <p>
               Lorem Ipsum is simply dummy text of the printing and
               typesetting industry. Lorem Ipsum has been the
               industry's standard dummy text ever since the 1500s,
               when an unknown printer took a galley of type and
               scrambled it to make a type specimen book
            </p>
            <p class="fw-bold">Author - dd/MM/yyyy</p>
         </div>
      </div>
   )
}

export default PostOverview