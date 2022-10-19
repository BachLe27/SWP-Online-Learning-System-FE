import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import validator from 'validator'

import Navbar from "../../../components/Navbar";
import userAction from '../../../_actions/userApi';
import { authAtom } from '../../../_state';


const Register = () => {
   const auth = useRecoilValue(authAtom);
   const [errMsg, setErrMsg] = useState('');
   const [success, setSuccess] = useState(false);

   const {
      register,
      watch,
      getValues,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting }
   } = useForm({
      mode: 'onTouched',
   });

   const onSubmit = async (data) => {
      delete data.confirmPassword;
      data.phone = '';
      data.address = '';
      data.bio = '';
      data.avatar = '';
      setErrMsg('');
      setSuccess(false);
      try {
         const response = await userAction.register(data);
         setSuccess(true);
         setErrMsg('');
         reset();
      } catch (error) {
         console.log(error.response.data);
         setErrMsg(error.response.data.detail);
      }
   }

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [errMsg, success])

   if (auth) {
      return <Navigate to="/" />
   }

   return (
      <>
         <Navbar />

         <div id="login" className="container d-flex justify-content-lg-center flex-column align-items-center">

            <div className="mb-4">
               <h2 className="fw-bold">Sign up G6's Account</h2>
            </div>

            {success ? <div class="alert alert-success col-8 col-lg-6 text-center" role="alert">
               Your signup success. You must <a target="_blank" rel="noreferrer" href="https://mail.google.com/mail/u/0/#inbox" class="alert-link">active</a> your account to continue!
            </div> : <></>}

            {errMsg ? <div class="alert alert-danger fw-bold col-6 text-center" role="alert">
               Signup fail! {errMsg}
            </div> : <></>}

            <form onSubmit={handleSubmit(onSubmit)} className="col-8 col-lg-5 d-flex flex-column">

               {/* Email */}
               <div className="mb-3">
                  <label for="inputEmail" className="form-label">Email</label>
                  <input
                     {...register("email", {
                        validate: value => validator.isEmail(value),
                        required: true,
                        onChange: (e) => { setErrMsg('') }
                     })}
                     type="email"
                     className={`form-control ${errors.email ? "is-invalid" : (getValues('email') ? "is-valid" : "")}`}
                     id="inputEmail"
                  />
                  <div class="invalid-feedback">
                     Invalid Email
                  </div>
               </div>

               {/* Username */}
               <div className="mb-3">
                  <label for="inputUsername" className="form-label">Username</label>
                  <input
                     {...register("username", {
                        pattern: /^[A-z][A-z0-9-_]{3,23}$/,
                        required: true,
                        onChange: (e) => { setErrMsg('') }
                     })}
                     type="text"
                     className={`form-control ${errors.username ? "is-invalid" : (getValues('username') ? "is-valid" : "")}`}
                     id="inputUsername"
                  />
                  <div class="invalid-feedback">
                     Username must contain 4-25 character. Must begin with letter. Letters, numbers, underscores allowed.
                  </div>
               </div>

               {/* Fullname */}
               <div className="mb-3">
                  <label for="inputFullname" className="form-label">Full Name</label>
                  <input
                     {...register("full_name", {
                        required: true,
                        onChange: (e) => { setErrMsg('') },
                        pattern: /^([A-z][A-z\D])/
                     })}
                     type="text"
                     className={`form-control ${errors.full_name ? "is-invalid" : (getValues('full_name') ? "is-valid" : "")}`}
                     id="inputFullname"
                  />
                  <div class="invalid-feedback">
                     Name is required
                  </div>
               </div>

               {/* Password */}
               <div className="mb-3">
                  <label for="inputPassword" className="form-label">Password</label>
                  <input
                     {...register("password", {
                        validate: value => {
                           return validator.isStrongPassword(value);
                        },
                        onChange: (e) => { setErrMsg('') }
                     })}
                     type="password"
                     className={`form-control ${errors.password ? "is-invalid" : (getValues('password') ? "is-valid" : "")}`}
                     id="inputPassword"
                  />
                  <div class="invalid-feedback">
                     Your password must at least 8 character, include uppercase and lowercase letters, a number and a special character.
                  </div>
               </div>

               <div className="mb-3">
                  <label for="inputConfirmPassword" className="form-label">Confirm Password</label>
                  <input
                     {...register("confirmPassword", {
                        required: true,
                        validate: value => {
                           return value == watch('password')
                        },
                        onChange: (e) => { setErrMsg('') }
                     })}
                     type="password"
                     className={`form-control ${errors.confirmPassword ? "is-invalid" : (getValues('confirmPassword') ? "is-valid" : "")}`}
                     id="inputConfirmPassword"
                  />
                  <div class="invalid-feedback">
                     Confirm password must match with password
                  </div>
               </div>


               <div className="mb-3">
                  <label for="dob" className="form-label">Date of birth</label>
                  <input
                     {...register("dob", {
                        required: true,
                        onChange: (e) => { setErrMsg('') }
                     })}
                     type="date"
                     className={`form-control ${errors.dob ? "is-invalid" : (getValues('dob') ? "is-valid" : "")}`}
                     id="dob" />
                  <div class="invalid-feedback">
                     Date of birth is required
                  </div>
               </div>

               <div className="mb-3">
                  <label for="dob" className="form-label">Gender</label>

                  <div className="form-check">
                     <input
                        className={`form-check-input ${errors.gender ? "is-invalid" : (getValues('gender') ? "is-valid" : "")}`}
                        type="radio"
                        {...register("gender", {
                           required: true,
                           onChange: (e) => { setErrMsg('') }
                        })}
                        id="male"
                        value="true"
                     />
                     <label className="form-check-label" for="male">
                        Male
                     </label>
                  </div>

                  <div className="form-check">
                     <input
                        className={`form-check-input ${errors.gender ? "is-invalid" : (getValues('gender') ? "is-valid" : "")}`}
                        type="radio"
                        {...register("gender", {
                           required: true,
                           onChange: (e) => { setErrMsg('') }
                        })}
                        id="female"
                        value="false"
                     />
                     <label className="form-check-label" for="female">
                        Female
                     </label>
                     <div class="invalid-feedback">
                        Gender is required
                     </div>
                  </div>
               </div>

               <button type="submit" className="btn btn-primary">
                  {
                     isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                     </div>
                  } Sign up
               </button>
               <div className="mt-3">
                  <p className="small text-center">
                     By signing up, you agree to our <a className="text-dark" href="#">Terms of Use</a> and <a className="text-dark" href="#">Privacy Policy</a>.
                  </p>
               </div>
            </form>

            <p className="text-center mt-2">Already have an account? <Link to="/login">Login</Link></p>
         </div>
      </>
   );
}

export default Register;