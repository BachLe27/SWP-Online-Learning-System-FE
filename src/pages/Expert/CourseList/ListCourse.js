import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Loading from "../../../components/Loading";
import expertApi from "../../../_actions/expertApi";
import { authAtom, toastAtom } from "../../../_state";
import Course from "./Course";
import PaginationCourse from "./PaginationCourse";

const ListCourse = ({ page }) => {
   const token = useRecoilValue(authAtom);

   const [courses, setCourses] = useState({});
   const [loading, setLoading] = useState(true);

   const loadCourses = async () => {
      try {
         const limit = 5;
         const offset = limit * (page - 1);
         let courseData = await (await expertApi.getCreatedCourses(token)).data;

         courseData = courseData.sort((a, b) => {
            return (a.created_at < b.created_at) ? 1 : ((a.created_at > b.created_at) ? -1 : 0);
         });

         setCourses(courseData);
         setLoading(false);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadCourses();
   }, []);

   useEffect(() => {

   }, [loading])

   return (
      <div className="vh-75">
         <div className="p-3">
            <h3 className="fw-bold text-primary mb-3 pb-2 border-bottom">Your courses</h3>
            {
               loading ? <Loading /> :
                  <div>
                     {courses ? courses.map((course, index) => {
                        return <Course course={course} key={course.id} />
                     }) : <></>}
                  </div>
            }

         </div>

      </div>
   );
}

export default ListCourse;