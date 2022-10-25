import { useEffect } from 'react';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useRecoilState } from 'recoil';
import { toastAtom } from '../_state/toast';

const ToastNoti = () => {

   const [toast, setToast] = useRecoilState(toastAtom);

   useEffect(() => {

   }, [toast])

   if (toast != null)
      return (
         <ToastContainer className="p-3 position-fixed" position="bottom-end">
            <Toast show={toast.show} bg={toast.status} onClose={() => setToast(null)} delay={7000} autohide >
               <Toast.Header>
                  <img
                     src=""
                     className="rounded me-2"
                     alt=""
                  />
                  <strong className="me-auto">G6 Elearning</strong>
                  <small>just now</small>
               </Toast.Header>
               <Toast.Body className="text-white">{toast.msg}</Toast.Body>
            </Toast>
         </ToastContainer>
      );
   else return <></>
}

export default ToastNoti;