import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import { useForm } from 'react-hook-form';
import validator from 'validator'
import userApi from '../../../_actions/userApi';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../../_state';

const ChangePassword = () => {

   const token = useRecoilValue(authAtom);
   const [success, setSuccess] = useState(false);
   const [errMsg, setErrMsg] = useState('');

   const onSubmit = async (data) => {
      setSuccess(false);
      delete data.confirmPassword;
      try {
         const changePassword = await userApi.changePassword(token, data);
         console.log(changePassword);
         setSuccess(true);
         reset()
      } catch (error) {
         setErrMsg('Wrong password!');
         console.log(error);
      }
   }

   const {
      register,
      handleSubmit,
      watch,
      getValues,
      reset,
      formState: { errors, isSubmitting }
   } = useForm({
      mode: 'onTouched',
   });

   useEffect(() => {

   }, [success, errMsg])


   return (
      <>
         <Navbar />

         <div className='mt-6 d-flex align-items-center flex-column justify-content-center'>

            <div className="col-5">
               {success && <Alert className='fs-5 fw-bold text-center' variant='success' onClose={() => setSuccess(false)} dismissible>
                  Change Password Success!
               </Alert>}

               {errMsg && <Alert className='fs-5 fw-bold text-center' variant='danger' onClose={() => setErrMsg('')} dismissible>
                  {errMsg}
               </Alert>}
            </div>

            <div className="col-4">
               <h2 className='mb-4 fw-semibold'>Change Password</h2>
               <Form className="" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className='mb-3'>
                     <Form.Label>Old Password</Form.Label>
                     <Form.Control
                        type="password"
                        {...register('old_password', {
                           required: true
                        })}
                        className={errors.old_password ? "is-invalid" : getValues('old_password') ? "is-valid" : ""}
                     />
                     <div class="invalid-feedback">
                        Old password is required
                     </div>
                  </Form.Group>

                  <Form.Group className='mb-3'>
                     <Form.Label>New Password</Form.Label>
                     <Form.Control
                        type="password"
                        {...register('new_password', {
                           required: true,
                           validate: value => {
                              return validator.isStrongPassword(value);
                           }
                        })}
                        className={errors.new_password ? "is-invalid" : getValues('new_password') ? "is-valid" : ""}
                     />
                     <div class="invalid-feedback">
                        Your password must at least 8 character, include uppercase and lowercase letters, a number and a special character.
                     </div>
                  </Form.Group>

                  <Form.Group className='mb-3'>
                     <Form.Label>Confirm New Password</Form.Label>
                     <Form.Control
                        type="password"
                        {...register("confirmPassword", {
                           required: true,
                           validate: value => {
                              return value == watch('new_password')
                           },
                        })}
                        className={errors.confirmPassword ? "is-invalid" : getValues('confirmPassword') ? "is-valid" : ""}
                     />
                     <div class="invalid-feedback">
                        Confirm password must equal with password
                     </div>
                  </Form.Group>

                  <Button type="submit" className='float-end'>
                     {isSubmitting && <Spinner size='sm' animation="border" />} Save Changes
                  </Button>
               </Form>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default ChangePassword