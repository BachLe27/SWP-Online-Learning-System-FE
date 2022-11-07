
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ToastNoti from "../../components/ToastNoti";
import sortByDate from "../../libs/sortByDate";
import sortByDateAsc from "../../libs/sortByDateAsc";
import userApi from "../../_actions/userApi";
import { categoriesAtom } from "../../_state";
import HomeCourse from "./HomeCourse";
import HotTopic from "./HotTopic";
import Package from "./Package";
import PackageRow from "./PackageRow";
import Popular from "./Popular";
import Slider from "./Slider";
import Trending from "./Trending";

const Home = () => {

   const [courses, setCourses] = useState();

   const [posts, setPosts] = useState();

   const loadData = async () => {
      try {
         let coursesData = await (await userApi.getAllCourses()).data;
         coursesData = sortByDateAsc(coursesData);
         let filterCourse = [];

         coursesData.forEach(course => {
            if (course.is_public == false) return;
            filterCourse.push(course)
         })

         filterCourse = filterCourse.slice(0, 4);

         setCourses(filterCourse);
      } catch (error) {
         console.log(error);
      }
   }

   const loadPost = async () => {
      try {
         let postData = await (await userApi.getPosts()).data;
         postData.forEach(async post => {
            let commentData = (await userApi.getComment(post.id)).data;
            post.comment_count = commentData.length;
         });
         postData = sortByDateAsc(postData);
         postData = postData.slice(0, 4);
         setPosts(postData);
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      loadData();
      loadPost();
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

               <Trending courses={courses} />
               <Popular courses={courses} />
               <div className="d-flex justify-content-end">
                  <Link to={'/courses'} className="fw-bold">View All Courses <i class="fa-solid fa-arrow-right"></i></Link>
               </div>
            </div>

            <div id="home-blogs" className="container">
               <HotTopic posts={posts} />
               <div className="d-flex justify-content-end">
                  <Link to={'/blog'} className="fw-bold">View All Topic <i class="fa-solid fa-arrow-right"></i></Link>
               </div>
            </div>

            <PackageRow />

         </div>
         <ToastNoti />
         <Footer />
      </>
   );
}

export default Home;