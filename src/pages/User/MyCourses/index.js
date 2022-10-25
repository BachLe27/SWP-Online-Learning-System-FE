import React from 'react'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'

const MyCourses = () => {
   return (
      <>
         <Navbar />
         <div id="my-courses-main" class="container mt-5">
            <div class="profile-info w-100 position-relative">
               <div class="cover-photo position-relative">
                  <img
                     class="w-100"
                     height="300px"
                     src="https://cdn.fullstack.edu.vn/static/media/cover-profile.3fb9fed576da4b28386a.png"
                     alt=""
                  />
               </div>
               <div
                  class="profile-photo w-100 d-flex flex-column align-items-center"
               >
                  <img
                     class="rounded-circle"
                     width="150px"
                     src="https://picsum.photos/150/150"
                     alt=""
                  />
                  <p class="fs-3 fw-bold pt-3 m-0">Kian Vux</p>
                  <p class="">Role</p>
               </div>
            </div>

            <div class="my-courses row" style={{ marginTop: "12rem" }}>
               <div class="inprogress-courses col-md-6">
                  <div class="shadow rounded-3">
                     <h5 class="p-3 fw-bold">In progress courses</h5>
                     <div class="mx-3 mb-4 pb-4 border-bottom row">
                        <div class="col-md-5 p-0">
                           <img
                              class="rounded-3 border border-dark"
                              width="100%"
                              src="https://picsum.photos/300/200"
                              alt=""
                           />
                        </div>
                        <div class="col-md-7 p-0 pt-3 pt-md-0 ps-md-3">
                           <div class="course-name">
                              <h5>HTML CSS Basic</h5>
                           </div>
                           <p class="">
                              Learn HTML, CSS in this course and become a
                              front-end developer
                           </p>
                        </div>
                        <div class="mt-3 w-100 p-0">
                           <div class="progress">
                              <div
                                 class="progress-bar progress-bar-striped bg-success"
                                 role="progressbar"
                                 aria-label="Default striped example"
                                 style={{ width: "60%" }}
                                 aria-valuenow="60"
                                 aria-valuemin="0"
                                 aria-valuemax="100"
                              ></div>
                           </div>
                           <div
                              class="m-0 pt-3 text-secondary fs-5 fw-semibold"
                           >
                              <span class="fst-italic">60% completed</span>
                           </div>
                        </div>
                     </div>
                     <div class="mx-3 mb-4 pb-4 border-bottom row">
                        <div class="col-md-5 p-0">
                           <img
                              class="rounded-3 border border-dark"
                              width="100%"
                              src="https://picsum.photos/300/200"
                              alt=""
                           />
                        </div>
                        <div class="col-md-7 p-0 pt-3 pt-md-0 ps-md-3">
                           <div class="course-name">
                              <h5>HTML CSS Basic</h5>
                           </div>
                           <p class="">
                              Learn HTML, CSS in this course and become a
                              front-end developer
                           </p>
                        </div>
                        <div class="mt-3 w-100 p-0">
                           <div class="progress">
                              <div
                                 class="progress-bar progress-bar-striped bg-success"
                                 role="progressbar"
                                 aria-label="Default striped example"
                                 style={{ width: "60%" }}
                                 aria-valuenow="60"
                                 aria-valuemin="0"
                                 aria-valuemax="100"
                              ></div>
                           </div>
                           <div
                              class="m-0 pt-3 text-secondary fs-5 fw-semibold"
                           >
                              <span class="fst-italic">60% completed</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="completed-courses col-md-6">
                  <div class="shadow rounded-3">
                     <h5 class="p-3 fw-bold">Completed courses</h5>
                     <div class="mx-3 mb-4 pb-4 border-bottom row">
                        <div class="col-md-5 p-0">
                           <img
                              class="rounded-3 border border-dark"
                              width="100%"
                              src="https://picsum.photos/300/200"
                              alt=""
                           />
                        </div>
                        <div class="col-md-7 p-0 pt-3 pt-md-0 ps-md-3">
                           <div class="course-name">
                              <h5>HTML CSS Basic</h5>
                           </div>
                           <p class="d-inline">
                              Learn HTML, CSS in this course and become a
                              front-end...
                           </p>
                           <a href="" class="float-end">View more</a>
                           <small class="text-secondary mt-2">Grade received: 100%</small>
                           <div
                              class="rate border-top text-center mt-2 pt-2 mb-0"
                           >
                              <button
                                 type="button"
                                 class="btn"
                                 data-bs-toggle="modal"
                                 data-bs-target="#rateModal"
                              >
                                 Rate this course
                                 <i class="far fa-star"></i>
                                 <i class="far fa-star"></i>
                                 <i class="far fa-star"></i>
                                 <i class="far fa-star"></i>
                                 <i class="far fa-star"></i>
                              </button>

                              <div
                                 class="modal fade"
                                 id="rateModal"
                                 tabindex="-1"
                                 role="dialog"
                                 aria-labelledby="rateModalLabel"
                                 aria-hidden="true"
                              >
                                 <div
                                    class="modal-dialog"
                                    role="document"
                                 >
                                    <div class="modal-content">
                                       <div class="modal-header">
                                          <h5
                                             class="modal-title"
                                             id="rateModalLabel"
                                          >
                                             Course name
                                          </h5>
                                          <button
                                             type="button"
                                             class="close btn"
                                             data-dismiss="modal"
                                             aria-label="Close"
                                          >
                                             <i
                                                class="fas fa-xmark"
                                             ></i>
                                          </button>
                                       </div>
                                       <div class="modal-body">
                                          <div class="text-start">
                                             <h4>Your review</h4>
                                             <p class="fs-5">
                                                <i
                                                   class="far fa-star"
                                                ></i>
                                                <i
                                                   class="far fa-star"
                                                ></i>
                                                <i
                                                   class="far fa-star"
                                                ></i>
                                                <i
                                                   class="far fa-star"
                                                ></i>
                                                <i
                                                   class="far fa-star"
                                                ></i>
                                             </p>
                                          </div>
                                          <div>
                                             <textarea
                                                class="w-100 p-2"
                                                placeholder="Write your review (optional)"
                                                name=""
                                                id=""
                                                cols="30"
                                                rows="5"
                                             ></textarea>
                                          </div>
                                       </div>
                                       <div class="modal-footer">
                                          <button
                                             type="button"
                                             class="btn btn-secondary"
                                             data-dismiss="modal"
                                          >
                                             Close
                                          </button>
                                          <button
                                             type="button"
                                             class="btn btn-primary"
                                          >
                                             Save changes
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default MyCourses