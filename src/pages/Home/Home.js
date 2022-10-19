
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ToastNoti from "../../components/ToastNoti";
import userApi from "../../_actions/userApi";
import { categoriesAtom } from "../../_state";
import HomeCourse from "./HomeCourse";
import HotCourse from "./HotCourse";
import HotTopic from "./HotTopic";
import Package from "./Package";
import Slider from "./Slider";

const Home = () => {

   const [categories, setCategories] = useRecoilState(categoriesAtom);

   const loadCategories = async () => {
      try {
         const categoriesData = await (await userApi.getCategories()).data;
         setCategories(categoriesData);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      if (categories == null)
         loadCategories();
   }, []);

   return (
      <>
         <Navbar />
         <div id="main" className="container">
            <div id="slider">
               <Slider />
            </div>

            <div id="categories" class="mt-4">
               <h1 class="fw-bold text-center text-decoration mt-5 mb-4 text-primary border-bottom">
                  Our Courses
               </h1>

               <div class="category-container">
                  <div class="category-name d-flex justify-content-between align-items-center">
                     <h3 class="fw-bold text-primary">Most Popular</h3>
                  </div>
                  <HotCourse />
               </div>

               <div class="category-container">
                  <div class="category-name d-flex justify-content-between align-items-center">
                     <h3 class="fw-bold text-primary">Trending</h3>
                  </div>
                  <div class="courses mb-4 row">
                     <HomeCourse />
                     <HomeCourse />
                     <HomeCourse />
                     <HomeCourse />
                  </div>
               </div>
            </div>

            <div id="home-blogs" className="container">
               <HotTopic />
            </div>

            <div id="home-packages" class="mb-5">
               <h1 class="fw-bold text-center my-5 text-primary border-bottom">Learn today</h1>
               <div class="home-packages-container row">
                  <Package />
                  <Package />
                  <Package />
               </div>
            </div>
         </div>
         <ToastNoti />
         <Footer />
      </>
   );
}

export default Home;