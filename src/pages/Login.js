import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import userAction from "../_actions/userApi";
import { useRecoilState } from "recoil";
import { authAtom, notiAtom, userAtom } from "../_state";


const Login = () => {
   const [auth, setAuth] = useRecoilState(authAtom);
   const [user, setUser] = useRecoilState(userAtom);
   const [errMsg, setErrMsg] = useState('');
   const navigate = useNavigate();
   const location = useLocation();

   const from = location.state?.from?.pathname || '/';

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm({
      mode: 'onSubmit',
   });

   const onSubmit = async (data) => {
      // console.log(data);
      try {
         const token = await userAction.login(data);
         setAuth(token.data.access_token);
         localStorage.setItem('auth', JSON.stringify(token.data));

         const userInfo = await userAction.authenticate(token.data);
         setUser(userInfo.data);
         localStorage.setItem('user', JSON.stringify(userInfo.data));

         navigate(from, { replace: true });
      } catch (error) {
         console.log(error);
         setErrMsg(error.response.data.detail);
      }
   }

   useEffect(() => {

   }, [errMsg]);

   if (auth) {
      return <Navigate to="/" />
   }

   return (
      <>
         <Navbar />
         <div id="login" className="container d-flex justify-content-lg-center flex-column align-items-center">
            <div className="mb-4">
               <h2 className="fw-bold">Login to G6</h2>
            </div>

            {
               errMsg &&
               <div class="alert alert-danger fw-bold col-5 text-center alert-dismissible fade show" role="alert">
                  {errMsg}
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
               </div>
            }

            <form onSubmit={handleSubmit(onSubmit)} className="col-6 col-lg-4 d-flex flex-column">
               <div className="mb-3">
                  <label for="username" className="form-label">Username</label>
                  <input
                     type="text"
                     className={`form-control ${errors.username ? "is-invalid" : ""}`}
                     {...register("username", {
                        required: true,
                        onChange: (e) => { setErrMsg('') }
                     })}
                     id="username"
                  />
                  <div class="invalid-feedback">
                     Username is required
                  </div>
               </div>

               <div className="mb-3">
                  <label for="password" className="form-label">Password</label>
                  <input
                     type="password"
                     className={`form-control ${errors.password ? "is-invalid" : ""}`}
                     {...register("password", {
                        required: true,
                        onChange: (e) => { setErrMsg('') }
                     })}
                     id="password"
                  />
                  <div class="invalid-feedback">
                     Password is required
                  </div>
               </div>

               <button type="submit" className="btn btn-primary">
                  {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>} Login
               </button>
               <p className="text-center mt-2">Don't have an account? <Link to="/register">Sign up</Link></p>
               <p className="text-center"> <a href="forgot.html">Forgot password?</a> </p>
            </form>
         </div>
      </>
   );
}

export default Login;