
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, reloadAtom, toastAtom } from '../../../_state';
import adminApi from '../../../_actions/adminApi';

const EditModal = ({ user }) => {

   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [reload, setReload] = useRecoilState(reloadAtom);

   const {
      register,
      handleSubmit,
   } = useForm({
      mode: 'onSubmit',
   });

   const onSubmit = async (data) => {
      try {
         const update = await adminApi.updateRole(token, user.id, data);
         setToast(
            {
               show: true,
               status: 'success',
               msg: 'Update role success!'
            }
         )
         setReload(true);
      } catch (error) {
         console.log(error.response);
      }
   }

   return (
      <div className="modal fade" id={`edit-${user.username}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
               <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel"> <span className='fw-bold'>User: </span> <span className='fw-bold'>{user.username}</span> </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div className="modal-body">
                  <Form onSubmit={handleSubmit(onSubmit)} id={`form-${user.username}`}>
                     <Form.Select {...register("role")} aria-label="Default select example">
                        <option selected={user.role === "ADMIN"} value="ADMIN">Admin</option>
                        <option selected={user.role === "EXPERT"} value="EXPERT">Expert</option>
                        <option selected={user.role === "STAFF"} value="STAFF">Staff</option>
                        <option selected={user.role === "USER"} value="USER">User</option>
                     </Form.Select>
                  </Form>
               </div>
               <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button form={`form-${user.username}`} type="submit" className="btn btn-warning px-3 rounded-2 shadow fw-bold" data-bs-dismiss="modal">Update</button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default EditModal;