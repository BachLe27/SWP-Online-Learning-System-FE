import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import adminApi from "../../../_actions/adminApi";
import { authAtom, usersAtom } from "../../../_state";
import Spinner from 'react-bootstrap/Spinner'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination'
import EditModal from "./EditModal";


const AccountList = () => {

   const [users, setUsers] = useState();
   const token = useRecoilValue(authAtom);
   const [loading, setLoading] = useState(false);

   const loadUsers = async () => {
      // const search = 
      setLoading(true);
      try {
         const userData = await (await adminApi.getUsers(token)).data;
         while (userData.length != 10) {
            userData.push('');
         }
         setUsers(userData);
         setLoading(false);
      } catch (error) {
         console.log(error.response);
      }
   }

   useEffect(() => {
      loadUsers();
   }, [])

   useEffect(() => {
   }, [loading])

   return (
      loading ? <>
         <Spinner animation="grow" variant="success" />
         <Spinner animation="grow" variant="danger" />
         <Spinner animation="grow" variant="warning" />
      </> :
         <div>


            <div className="p-3 vh-100">

               <h2>G6's Account</h2>
               <div className="">
                  <Table striped bordered hover>
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>Username</th>
                           <th>Role</th>
                           <th>Email</th>
                           <th>Full Name</th>
                           <th>DOB</th>
                           <th>Gender</th>
                           <th>Phone</th>
                           <th>Address</th>
                           <th>Access</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                           users ?
                              users.map((user, id) => {
                                 return <tr>
                                    <td>{id + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                    <td>{user.email}</td>
                                    <td>{user.full_name}</td>
                                    <td>{user.dob}</td>
                                    <td>{user == '' ? "" : user.gender ? "Male" : "Female"}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>
                                       {user &&
                                          <>
                                             <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                   <Tooltip>
                                                      Edit
                                                   </Tooltip>
                                                }
                                             >
                                                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#edit-${user.username}`}>
                                                   <i className="fa-solid fa-pen-to-square"></i>
                                                </button>

                                             </OverlayTrigger>

                                             <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                   <Tooltip>
                                                      Delete
                                                   </Tooltip>
                                                }
                                             >
                                                <Button variant="danger" className="d-inline">
                                                   <i className="fa-solid fa-trash"></i>
                                                </Button>
                                             </OverlayTrigger>

                                             <EditModal user={user} />
                                          </>
                                       }
                                    </td>
                                 </tr>
                              }) : <></>
                        }
                     </tbody>
                  </Table>
               </div>
            </div>
            <div className="d-flex justify-content-center">
               <Pagination className="mx-auto">
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item active>{1}</Pagination.Item>

                  <Pagination.Item>{2}</Pagination.Item>
                  <Pagination.Item>{3}</Pagination.Item>
                  <Pagination.Ellipsis />
                  <Pagination.Item>{5}</Pagination.Item>
                  <Pagination.Next />
                  <Pagination.Last />
               </Pagination>
            </div>
         </div>
   );
}

export default AccountList;