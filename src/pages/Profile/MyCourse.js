const MyCourse = (props) => {
   return (
      <div class="mx-3 mb-4 pb-4 border-bottom row">
         <div class="col-md-5 p-0">
            <img
               class="rounded-3 border border-dark"
               width="100%"
               src="https://picsum.photos/200/100"
               alt=""
            />
         </div>
         <div class="col-md-7 p-0 pt-3 pt-md-0 ps-md-3">
            <div class="course-name">
               <h6 className="fw-bold">HTML CSS Basic</h6>
            </div>
            <p class="">
               Learn HTML, CSS in this course and become a
               front-end developer
            </p>
         </div>
      </div>
   );
}

export default MyCourse;