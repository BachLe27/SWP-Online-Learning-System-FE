import { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ToastNoti from "../../components/ToastNoti";
import VerticalNav from "./VerticalNav";
import expertImg from './expert.jpg'
import Loading from "../../components/Loading";
import { set } from "react-hook-form";

const Expert = () => {
   const [loading, setLoading] = useState(true);

   const handleLoad = () => {
      setLoading(false);
   }

   useEffect(() => {
      setLoading(false);
   }, [loading])

   return (
      <>
         <Navbar />
         <div className="mt-6 container-fluid vh-75 row">
            <div className="col-2">
               <VerticalNav activeLink="/expert" />
            </div>

            <Suspense fallback={<Loading />}>
               <div className="col-10 border-start d-flex flex-column">
                  <img
                     className="img-fluid col-6"
                     src={expertImg}
                     onLoad={handleLoad}
                     alt=""
                  />
                  <p className="ms-5 col-5">Your account currently is an <span className="fw-bold">expert</span>, you can <Link to="/expert/course/1">Manage course</Link>, <Link to="/expert/question">Reply question</Link>, <Link to="/expert/feedback">View feedback</Link>, <Link to="/expert/create">Create course</Link>.
                  </p>
               </div>
            </Suspense>

            <ToastNoti />
         </div >

         <Footer />
      </>
   );
}

export default Expert;