
import Admin from '../pages/Admin/Admin';
import Home from '../pages/Home/Home'
import Login from '../pages/Login';
import Profile from '../pages/Profile/Profile';
import Register from '../pages/Register';

const publicRoutes = [
   { path: '/', component: Home },
   { path: '/login', component: Login },
   { path: '/register', component: Register },
   // { path: '/profile', component: Profile }
]

const adminRoutes = [
   { path: '/admin', component: Admin }
]

const privateRoutes = [
   { path: '/profile', component: Profile }
]

export { publicRoutes, privateRoutes, adminRoutes };