import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { authAtom, userAtom } from "../../../_state";
import userApi from "../../../_actions/userApi";

import Form from 'react-bootstrap/Form'
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { useForm } from 'react-hook-form';
import { toastAtom } from '../../../_state/toast';
import ToastNoti from '../../../components/ToastNoti';

const Profile = () => {

   const profileStyle = {
      background: "url('https://picsum.photos/2000/500') no-repeat",
      backgroundSize: "100% 100%",
      height: "300px",
      width: "100%",
   }

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm({
      mode: 'onTouched',
   })

   const [token, setToken] = useRecoilState(authAtom);
   const [show, setShow] = useState(false); // modal
   const [toast, setToast] = useRecoilState(toastAtom);
   const [user, setUser] = useRecoilState(userAtom);
   const [img, setImg] = useState(user.avatar || 'https://picsum.photos/500/500');

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const onSubmit = async (data) => {
      data.avatar = img;
      try {
         const change = await userApi.changeInfo(data, token);
         const newInfo = await userApi.authenticate(token);
         setUser(newInfo.data);
         localStorage.setItem('user', JSON.stringify(newInfo.data));
         setShow(false);
         setToast(
            {
               show: true,
               status: 'primary',
               msg: 'Update profile successful!'
            }
         );
         // navigate(0);
      } catch (error) {
         console.log(error);
      }
   }

   const handleUploadImage = async (e) => {
      console.log(e.target.files[0]);

      try {
         const image = e.target.files[0];
         const uploadId = await (await userApi.upload(token, image)).data.detail;
         console.log(uploadId);
         setImg(uploadId);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
   }, [toast])

   return (
      <>
         <Navbar />
         <div id="profile-main" class="container mt-5">

            <div class="profile-info w-100 position-relative">
               <div style={profileStyle}>
               </div>
               <div class="profile-photo w-100 d-flex flex-column align-items-center">
                  <img class="rounded-circle border border-dark border-3 img-fluid" height="150px" width="150px" src={img != 'https://picsum.photos/500/500' ? `http://localhost:8000/upload/${img}` : img} alt="" />
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
                  <div class="bio p-3 mb-4 shadow-1 rounded-3 border border-secondary">
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
                              <Modal.Title className="fw-bold">Update Profile</Modal.Title>
                           </Modal.Header>
                           <Modal.Body className="px-5">
                              <Form id="editProfileForm" onSubmit={handleSubmit(onSubmit)}>
                                 <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Full Name</Form.Label>
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
                                    <Form.Label className="fw-semibold">Date of birth</Form.Label>
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
                                    <Form.Label className="fw-semibold">Phone</Form.Label>
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
                                    <Form.Label className="fw-semibold">Address</Form.Label>
                                    <Form.Control
                                       {...register("address", {
                                          required: false
                                       })}
                                       type="text"
                                       defaultValue={user.address}
                                    />
                                 </Form.Group>

                                 <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Avatar</Form.Label>
                                    <Form.Control
                                       {...register("avatar", {
                                          required: false
                                       })}
                                       onChange={handleUploadImage}
                                       type="file"
                                       // defaultValue={user.avatar}
                                       accept=".jpg, .png, .jpeg"
                                    />
                                 </Form.Group>

                                 {
                                    img != 'https://picsum.photos/500/500' && <div className='my-5'>
                                       <h3 className="fw-semibold me-4">Preview Avatar:</h3>
                                       <img src={`http://localhost:8000/upload/${img}`} class="rounded-circle border border-dark border-3 img-fluid" height="150px" width="150px" alt='' />
                                    </div>
                                 }
                                 <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Bio</Form.Label>
                                    <Form.Control
                                       {...register("bio", {
                                          required: false
                                       })}
                                       type="text"
                                       defaultValue={user.bio}
                                    />
                                 </Form.Group>

                                 <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Gender</Form.Label>
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
                              <Button type="submit" form="editProfileForm" variant="primary">
                                 {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                 </div>} Save Changes
                              </Button>
                           </Modal.Footer>
                        </Modal>

                     </div>
                     <div className="mt-3 border-bottom">
                        <p><span className="fw-semibold">Full Name:</span> {user.full_name}</p>
                        <p><span className="fw-semibold">Username:</span> {user.username}</p>
                        <p><span className="fw-semibold">Email:</span> {user.email}</p>
                        <p><span className="fw-semibold">Role:</span> {user.role}</p>
                        <p><span className="fw-semibold">DOB:</span> {user.dob}</p>
                        <p><span className="fw-semibold">Phone Number:</span> {user.phone}</p>
                        <p><span className="fw-semibold">Address:</span> {user.address}</p>
                        <p><span className="fw-semibold">Gender:</span> {user.gender ? "Male" : "Female"}</p>
                     </div>
                  </div>

                  <div class="recent-post p-3 shadow-1 rounded-3 border border-secondary">
                     <h5 className="fw-bold border-bottom border-2 pb-1">Recent activity</h5>
                     <span class="text-secondary">No activity yet</span>
                  </div>
               </div>

               <div className="col-md-6 ps-4 my-3">
                  <div class="bio p-3 mb-4 shadow-1 rounded-3 border border-secondary">
                     <h5 className="fw-bold border-bottom border-2 py-2">Bio</h5>
                     <p class="text-center pb-3">
                        {user.bio ? user.bio : "..."}
                     </p>
                  </div>

                  <div class="current-package p-3 mb-4 shadow-1 rounded-3 border border-secondary">
                     <h5 className="fw-bold border-bottom border-2 py-2">Current package</h5>
                     <div className="w-100 border-bottom">
                        <p class="">One year package</p>
                        <p class="">Expiry date: dd/MM/yyyy</p>
                     </div>
                     <a href="#" class="text-dark d-flex justify-content-end mt-2">Purchased history</a>
                  </div>
               </div>
            </div>

            <ToastNoti />
         </div>

         <Footer />
      </>
   );
}

export default Profile;