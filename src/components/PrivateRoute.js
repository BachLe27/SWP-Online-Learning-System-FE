import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../_state";

const PrivateRoute = () => {

   const auth = useRecoilValue(authAtom);
   const location = useLocation();

   if (auth) {
      return <Outlet />
   } else {
      return <Navigate to="/login" state={{ from: location }} replace />
   }
}

export default PrivateRoute;