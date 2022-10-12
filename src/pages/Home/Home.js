
import { useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ToastNoti from "../../components/ToastNoti";
import HomeCourse from "./HomeCourse";
import HotCourse from "./HotCourse";
import Slider from "./Slider";

const Home = () => {

   useEffect(() => {
      window.scrollTo(0, 0);
   })

   return (
      <>
         <Navbar />
         <div id="main">
            <div id="slider" class="container">
               <Slider />
            </div>

            <div id="categories" class="mt-4 container">
               <h1 class="fw-bold text-center text-decoration my-5">
                  Our Courses
               </h1>

               <div class="category-container">
                  <div class="category-name d-flex justify-content-between align-items-center">
                     <h3 class="fw-bold">Most Popular Courses</h3>
                  </div>
                  <HotCourse />
               </div>

               <div class="category-container">
                  <div class="category-name d-flex justify-content-between align-items-center">
                     <h3 class="fw-bold">Trending Courses</h3>
                  </div>
                  <div class="courses mb-4 row">
                     <HomeCourse />
                     <HomeCourse />
                     <HomeCourse />
                     <HomeCourse />
                  </div>
               </div>
            </div>
         </div>
         <ToastNoti />
         <Footer />
      </>
   );
}

export default Home;