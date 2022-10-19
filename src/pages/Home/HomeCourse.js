const HomeCourse = () => {
   return (
      <div class="course-item col-lg-3 col-md-6 my-4">
         <div class="w-100">
            <img
               class="rounded-0 border border-dark"
               width="100%"
               height="200px"
               src="https://picsum.photos/200/200"
               alt=""
            />
         </div>
         <div class="fw-bold course-name pt-2">
            <h5 className="fw-bold">HTML CSS Basic</h5>
         </div>
         <div>
            <p className="m-0 text-muted"> John Doe </p>
            <p class="course-count m-0">
               <i class="fa-solid fa-users"></i> 1234 students
            </p>
         </div>

      </div>
   );
}

export default HomeCourse;