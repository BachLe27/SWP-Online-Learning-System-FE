import { Routes, Route, BrowserRouter } from "react-router-dom";

import { privateRoutes, publicRoutes, adminRoutes } from "./routers/index"
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          publicRoutes.map((route) => {
            return <Route path={route.path} element={<route.component />} />
          })
        }

        <Route element={<PrivateRoute />}>
          {
            privateRoutes.map((route) => {
              return <Route path={route.path} element={<route.component />} />
            })
          }
          {
            adminRoutes.map((route) => {
              return <Route path={route.path} element={<route.component />} />
            })
          }
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
