import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom, userAtom } from "../_state";

const PrivateRoute = ({ allowedRoles }) => {

   const auth = useRecoilValue(authAtom);
   const user = useRecoilValue(userAtom);
   const location = useLocation();
   // return <Outlet />
   if (auth) {
      if (allowedRoles.includes(user.role))
         return <Outlet />
      else return <Navigate to="/unauthorized" state={{ from: location }} />
   } else {
      return <Navigate to="/login" state={{ from: location }} replace />
   }
}

export default PrivateRoute;