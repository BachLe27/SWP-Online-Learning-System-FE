const HomeCourse = () => {
   return (
      <div class="course-item col-lg-3 col-md-6 my-4">
         <div class="w-100">
            <img
               class="rounded-3 border border-dark"
               width="100%"
               height="200px"
               src="https://picsum.photos/200/200"
               alt=""
            />
         </div>
         <div class="course-name py-2">
            <h5>HTML CSS Basic</h5>
         </div>
         <p class="course-count">
            <i class="fa-solid fa-users"></i> 1234
         </p>
      </div>
   );
}

export default HomeCourse;