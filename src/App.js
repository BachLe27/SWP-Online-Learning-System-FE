import { Routes, Route, BrowserRouter } from "react-router-dom";

import { privateRoutes, publicRoutes, adminRoutes, expertRoutes, staffRoutes } from "./routers/index"
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/Error/NotFound";
import ScrollToTop from "./components/ScrollToTop";

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {
          publicRoutes.map((route) => {
            return <Route path={route.path} element={<route.component />} />
          })
        }

        <Route element={<PrivateRoute allowedRoles={["ADMIN", "USER", "EXPERT", "STAFF"]} />}>
          {
            privateRoutes.map((route) => {
              return <Route path={route.path} element={<route.component />} />
            })
          }
        </Route>

        <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
          {
            adminRoutes.map((route) => {
              return <Route path={route.path} element={<route.component />} />
            })
          }
        </Route>


        <Route element={<PrivateRoute allowedRoles={["EXPERT"]} />}>
          {
            expertRoutes.map((route) => {
              return <Route path={route.path} element={<route.component />} />
            })
          }
        </Route>


        <Route element={<PrivateRoute allowedRoles={["STAFF"]} />}>
          {
            staffRoutes.map((route) => {
              return <Route path={route.path} element={<route.component />} />
            })
          }
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
