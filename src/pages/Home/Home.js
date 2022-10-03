
import { useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Home = () => {

   useEffect(() => {
      window.scrollTo(0, 0);
   })

   return (
      <>
         <Navbar />
         <div id="main">
            <div id="slider" class="container">
               <div
                  id="carouselTop"
                  class="carousel carousel-dark slide"
                  data-bs-ride="carousel"
               >
                  <div class="carousel-indicators">
                     <button
                        type="button"
                        data-bs-target="#carouselTop"
                        data-bs-slide-to="0"
                        class="active"
                        aria-current="true"
                        aria-label="Slide 1"
                     ></button>
                     <button
                        type="button"
                        data-bs-target="#carouselTop"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                     ></button>
                     <button
                        type="button"
                        data-bs-target="#carouselTop"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                     ></button>
                  </div>

                  <div class="carousel-inner">
                     <div
                        class="carousel-item active"
                        data-bs-interval="3000"
                     >
                        <img
                           src="https://picsum.photos/500/200"
                           class="w-100"
                           alt="..."
                        />
                        <div
                           class="carousel-caption d-none d-md-block fs-4"
                        >
                           <h4 class="text-light">First slide label</h4>
                           <p class="text-light">
                              Some representative placeholder content for
                              the first slide.
                           </p>
                        </div>
                     </div>

                     <div class="carousel-item" data-bs-interval="3000">
                        <img
                           src="https://picsum.photos/500/200"
                           class="w-100"
                           alt="..."
                        />
                        <div
                           class="carousel-caption d-none d-md-block fs-4"
                        >
                           <h4 class="text-light">Second slide label</h4>
                           <p class="text-light">
                              Some representative placeholder content for
                              the second slide.
                           </p>
                        </div>
                     </div>

                     <div class="carousel-item">
                        <img
                           src="https://picsum.photos/500/200"
                           class="w-100"
                           alt="..."
                        />
                        <div
                           class="carousel-caption d-none d-md-block fs-4"
                        >
                           <h4 class="text-light">Third slide label</h4>
                           <p class="text-light">
                              Some representative placeholder content for
                              the third slide.
                           </p>
                        </div>
                     </div>
                  </div>
                  <button
                     class="carousel-control-prev"
                     type="button"
                     data-bs-target="#carouselTop"
                     data-bs-slide="prev"
                  >
                     <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                     ></span>
                     <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                     class="carousel-control-next"
                     type="button"
                     data-bs-target="#carouselTop"
                     data-bs-slide="next"
                  >
                     <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                     ></span>
                     <span class="visually-hidden">Next</span>
                  </button>
               </div>
            </div>

            <div id="categories" class="mt-4 container">
               <h1 class="fw-bold text-center text-decoration my-5">
                  Our Courses
               </h1>

               <div class="category-container">
                  <div
                     class="category-name d-flex justify-content-between align-items-center"
                  >
                     <h3 class="fw-bold">Front-end Web Development</h3>
                     <a href="#">View more...</a>
                  </div>

                  <div class="courses mb-4 row">
                     <div class="course-item col-lg-3 col-md-6 my-4">
                        <div class="w-100">
                           <img
                              class="rounded-3 border border-dark"
                              width="100%"
                              height="200px"
                              src="./images/html-css-course.jpg"
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

                     <div class="course-item col-lg-3 col-md-6 my-4">
                        <div class="w-100">
                           <img
                              class="rounded-3 border border-dark"
                              width="100%"
                              height="200px"
                              src="./images/html-css-advanced.jpg"
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

                     <div class="course-item col-lg-3 col-md-6 my-4">
                        <div class="w-100">
                           <img
                              class="rounded-3 border border-dark"
                              width="100%"
                              height="200px"
                              src="./images/html-css-advanced.jpg"
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

                     <div class="course-item col-lg-3 col-md-6 my-4">
                        <div class="w-100">
                           <img
                              class="rounded-3 border border-dark"
                              width="100%"
                              height="200px"
                              src="./images/html-css-advanced.jpg"
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
                  </div>
               </div>

               <div class="category-container">
                  <div
                     class="category-name d-flex justify-content-between align-items-center"
                  >
                     <h3 class="fw-bold">Business</h3>
                     <a href="#">View more...</a>
                  </div>

                  <div class="courses mb-4 row">
                     <div class="course-item col-lg-3 col-md-6 my-4">
                        <div class="w-100">
                           <img
                              class="rounded-3 border border-dark"
                              width="100%"
                              height="200px"
                              src="./images/html-css-course.jpg"
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

                     <div class="course-item col-lg-3 col-md-6 my-4">
                        <div class="w-100">
                           <img
                              class="rounded-3 border border-dark"
                              width="100%"
                              height="200px"
                              src="./images/html-css-advanced.jpg"
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

                     <div class="course-item col-lg-3 col-md-6 my-4">
                        <div class="w-100">
                           <img
                              class="rounded-3 border border-dark"
                              width="100%"
                              height="200px"
                              src="./images/html-css-advanced.jpg"
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

                     <div class="course-item col-lg-3 col-md-6 my-4">
                        <div class="w-100">
                           <img
                              class="rounded-3 border border-dark"
                              width="100%"
                              height="200px"
                              src="./images/html-css-advanced.jpg"
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
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </>
   );
}

export default Home;