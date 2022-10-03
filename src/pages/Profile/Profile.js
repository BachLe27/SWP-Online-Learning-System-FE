import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { authAtom, userAtom } from "../../_state";
import userApi from "../../_actions/userApi";

import Form from 'react-bootstrap/Form'
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from 'react-hook-form';

const Profile = () => {

   const profileStyle = {
      background: "url('https://picsum.photos/2000/500') no-repeat",
      backgroundSize: "100% 100%",
      height: "300px",
      width: "100%",
   }

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [])

   const [user, setUser] = useRecoilState(userAtom);
   const token = useRecoilValue(authAtom);
   const [success, setSuccess] = useState(false);
   console.log(token);
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      getValues
   } = useForm({
      mode: 'onTouched',
   })

   const onSubmit = async (data) => {

      data.avatar = '';


      try {
         const change = await userApi.changeInfo(data, token);
         const newInfo = await userApi.authenticate(token);
         setUser(newInfo.data);
         localStorage.setItem('user', JSON.stringify(newInfo.data));

         console.log(change.data);
         console.log(newInfo.data);
         setSuccess(true);
         setShow(false);
         setShowToast(!showToast);
      } catch (error) {
         console.log(error);
      }

   }

   useEffect(() => {

   }, [success])


   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const [showToast, setShowToast] = useState(false);

   const toggleshowToast = () => setShowToast(!showToast);

   return (
      <>
         <Navbar />
         <div id="profile-main" class="container mt-5">

            <div class="profile-info w-100 position-relative">
               <div style={profileStyle}>
               </div>
               <div class="profile-photo w-100 d-flex flex-column align-items-center">
                  <img class="rounded-circle" width="150px" src={user.avatar ? user.avatar : "https://picsum.photos/150/150"} alt="" />
                  <p class="fs-3 fw-bold pt-3 mb-0 border-bottom border-2 border-dark">
                     {user.full_name}
                  </p>
                  <p class="pb-3 mt-1">
                     {user.role}
                  </p>
               </div>
            </div>

            <div class="user-info w-100 row d-flex justify-content-between">
               <div class="col-md-6 ps-4 my-3">
                  <div class="bio p-3 mb-4 shadow-1 rounded-3">
                     <div className="border-bottom border-2 py-2 d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold m-0">Information</h5>
                        <Button
                           variant="outline-dark"
                           className='fw-semibold'
                           onClick={handleShow}
                        >
                           Edit profile <i class="fa-solid fa-pen-to-square"></i>
                        </Button>

                        {/* Edit profile Modal */}
                        <Modal
                           show={show}
                           onHide={handleClose}
                           backdrop="static"
                           keyboard={false}
                           size="lg"
                           scrollable
                        >
                           <Modal.Header closeButton>
                              <Modal.Title>Update Profile</Modal.Title>
                           </Modal.Header>
                           <Modal.Body className="px-5">
                              <Form id="editProfileForm" onSubmit={handleSubmit(onSubmit)}>
                                 <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                       {...register("full_name", {
                                          required: true,
                                          pattern: /^([A-z][A-z\D])/
                                       })}
                                       type="text"
                                       defaultValue={user.full_name}
                                       className={`${errors.full_name ? "is-invalid" : ""}`}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                       Name is required
                                    </Form.Control.Feedback>
                                 </Form.Group>

                                 <Form.Group className="mb-3">
                                    <Form.Label>Date of birth</Form.Label>
                                    <Form.Control
                                       {...register("dob", {
                                          required: true
                                       })}
                                       type="date"
                                       defaultValue={user.dob}
                                       className={`${errors.dob ? "is-invalid" : ""}`}
                                    />
                                 </Form.Group>

                                 <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                       {...register("phone", {
                                          required: false,
                                          pattern: /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
                                       })}
                                       type="text"
                                       defaultValue={user.phone}
                                       className={`${errors.phone ? "is-invalid" : ""}`}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                       Phone number not valid.
                                    </Form.Control.Feedback>
                                 </Form.Group>

                                 <Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                       {...register("address", {
                                          required: false
                                       })}
                                       type="text"
                                       defaultValue={user.address}
                                    />
                                 </Form.Group>


                                 <Form.Group className="mb-3">
                                    <Form.Label>Avatar</Form.Label>
                                    <Form.Control
                                       {...register("avatar", {
                                          required: false
                                       })}
                                       type="file"
                                       defaultValue={user.avatar}
                                       accept=".jpg, .png, .jpeg"
                                    />
                                 </Form.Group>

                                 <Form.Group className="mb-3">
                                    <Form.Label>Bio</Form.Label>
                                    <Form.Control
                                       {...register("bio", {
                                          required: false
                                       })}
                                       type="text"
                                       defaultValue={user.bio}
                                    />
                                 </Form.Group>

                                 <Form.Group className="mb-3">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select {...register("gender")}>
                                       <option value="true" selected={user.gender === true}>Male</option>
                                       <option value="false" selected={user.gender === false}>Female</option>
                                    </Form.Select>
                                 </Form.Group>

                              </Form>
                           </Modal.Body>
                           <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                 Close
                              </Button>
                              <Button type="submit" form="editProfileForm" variant="primary">Save Changes</Button>
                           </Modal.Footer>
                        </Modal>

                     </div>
                     <div className="mt-3 border-bottom">
                        <p><span className="fw-semibold">Full Name:</span> {user.full_name}</p>
                        <p><span className="fw-semibold">Role:</span> {user.role}</p>
                        <p><span className="fw-semibold">DOB:</span> {user.dob}</p>
                        <p><span className="fw-semibold">Phone Number:</span> {user.phone}</p>
                        <p><span className="fw-semibold">Address:</span> {user.address}</p>
                        <p><span className="fw-semibold">Gender:</span> {user.gender ? "Male" : "Female"}</p>
                     </div>
                  </div>

                  <div class="recent-post p-3 shadow-1 rounded-3">
                     <h5 className="fw-bold border-bottom border-2 pb-1">Recent activity</h5>
                     <span class="text-secondary">No activity yet</span>
                  </div>
               </div>

               <div className="col-md-6 ps-4 my-3">
                  <div class="bio p-3 mb-4 shadow-1 rounded-3">
                     <h5 className="fw-bold border-bottom border-2 py-2">Bio</h5>
                     <p class="text-center pb-3">
                        {user.bio ? user.bio : "..."}
                     </p>
                  </div>

                  <div class="current-package p-3 mb-4 shadow-1 rounded-3">
                     <h5 className="fw-bold border-bottom border-2 py-2">Current package</h5>
                     <div className="w-100 border-bottom">
                        <p class="">One year package</p>
                        <p class="">Expiry date: dd/MM/yyyy</p>
                     </div>
                     <a href="#" class="text-dark d-flex justify-content-end mt-2">Purchased history</a>
                  </div>
               </div>
            </div>
            <ToastContainer className="p-3 position-fixed" position="bottom-end">
               <Toast show={showToast} onClose={() => setShowToast(false)} delay={10000} autohide >
                  <Toast.Header>
                     <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                     />
                     <strong className="me-auto">G6 Elearning</strong>
                     <small>right now</small>
                  </Toast.Header>
                  <Toast.Body>Update profile successful!</Toast.Body>
               </Toast>
            </ToastContainer>
         </div>

         <Footer />
      </>
   );
}

export default Profile;