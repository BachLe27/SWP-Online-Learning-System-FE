import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Navbar from '../../components/Navbar'
import userApi from '../../_actions/userApi';
import { authAtom, toastAtom, userAtom } from '../../_state';
import validator from 'validator'
import { useEffect } from 'react';
import { useState } from 'react';

const Pay = () => {
   const location = useLocation();
   const param = useParams();
   const user = useRecoilValue(userAtom);
   const token = useRecoilValue(authAtom);
   const setToast = useSetRecoilState(toastAtom);
   const navigate = useNavigate();
   const [haveBuy, setHaveBuy] = useState(false);

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
      loadPurchased();
   }, []);

   const loadPurchased = async () => {
      try {
         let purchased = (await userApi.purchased(token)).data;
         // console.log(purchased);

         purchased.forEach(bill => {
            if (user.id == bill.user_id) {
               setHaveBuy(true);
            }
         });
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {

   }, [haveBuy]);

   const onSubmit = async (data) => {
      try {
         const purchase = await (await userApi.purchase(token, pack.id)).data;
         //console.log(purchase.link);
         window.open(purchase.link, 'sharer', 'toolbar=0,status=0,width=548,height=700', '_blank');
      } catch (error) {
         console.log(error);
      }
   }

   if (!location.state) return <Navigate to="/purchase" />
   const { pack } = location.state;


   return (
      <>
         <Navbar />
         <div className='container mt-7 d-flex justify-content-center'>
            <div className='col-md-5 border-end me-5 pe-5'>
               <h3 className='fw-bold mb-5'>Order Summary</h3>

               <div className='d-flex justify-content-between pb-4 border-bottom'>
                  <div>
                     <p className='fw-semibold m-0 text-primary'>{pack.description}</p>
                     <small className='text-secondary'>Duration: {pack.duration} days</small>
                  </div>
                  <div>
                     <p className=' m-0'>${pack.price}</p>
                  </div>
               </div>

               <div className='mt-4'>
                  <div className='d-flex justify-content-between'>
                     <h4>Total Price: </h4>
                     <h4 className='fw-bold m-0 text-danger'>${pack.price}.0</h4>
                  </div>
               </div>
            </div>
            <div className='col-md-5'>
               <h3 className='fw-bold mb-4'>Payment Details</h3>
               {
                  haveBuy ? <>
                     <h4 className='text-success'>You already have a learning package!</h4>
                  </> : <>
                     {/* <div>
                        <Form className="mb-2" onSubmit={handleSubmit(onSubmit)}>
                           <Form.Group className='mb-3'>
                              <Form.Label>Your Email</Form.Label>
                              <Form.Control
                                 {...register("email", {
                                    validate: value => validator.isEmail(value) && value == user.email,
                                    required: true,
                                 })}
                                 isInvalid={errors.email}
                              />
                              <div class="invalid-feedback">
                                 Your email must correct
                              </div>
                           </Form.Group>
                           <Button type="submit" className="rounded-1 shadow fw-bold w-100" variant="danger"> Pay ${pack.price}.0</Button>
                        </Form>
                     </div> */}
                     <div className='mt-3'>
                        {/* <h5>Or</h5> */}
                        <Button onClick={onSubmit} className="rounded-1 shadow fw-bold w-100"> Pay with <i class="fa-brands fa-paypal"></i> Paypal </Button>
                     </div>
                  </>
               }


            </div>
         </div>
      </>
   )
}

export default Pay