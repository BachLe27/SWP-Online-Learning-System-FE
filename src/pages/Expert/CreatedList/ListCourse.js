import { Suspense, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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
            <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
               <h3 className="fw-bold text-primary pb-2">Your courses</h3>
               <Button as={Link} to="/expert/create">Create course</Button>
            </div>

            <div>
               {
                  loading ?
                     <Loading /> :
                     courses.length > 0 ? courses.map((course, index) => {
                        return <Course course={course} key={course.id} />
                     }) : <p>Empty. <Link to="/expert/create">Create new course</Link> </p>
               }
            </div>

         </div>

      </div>
   );
}

export default ListCourse;