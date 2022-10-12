
import Admin from '../pages/Admin/Admin';
import Blog from '../pages/Blog/View';
import CreateCourse from '../pages/Expert/CreateCourse';
import EditCourse from '../pages/Expert/EditCourse';
import Expert from '../pages/Expert/Expert';
import Feedback from '../pages/Expert/Feedback';
import MyCourse from '../pages/Expert/CourseList';
import Question from '../pages/Expert/Question';
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login';
import Profile from '../pages/User/Profile/Profile';
import Register from '../pages/Register/Register';
import Unauthorized from '../pages/Error/Unauthorized';
import ChangePassword from '../pages/User/ChangePassword/ChangePassword';
import Courses from '../pages/Courses';
import CreatePost from '../pages/Blog/CreatePost';

const publicRoutes = [
   { path: '/', component: Home },
   { path: '/login', component: Login },
   { path: '/register', component: Register },
   { path: '/unauthorized', component: Unauthorized },
   { path: '/blog', component: Blog },
   { path: '/courses', component: Courses }
]

const adminRoutes = [
   { path: '/admin', component: Admin }
]

const expertRoutes = [
   { path: '/expert', component: Expert },
   { path: '/expert/create', component: CreateCourse },
   { path: '/expert/course/:page', component: MyCourse },
   { path: '/expert/feedback', component: Feedback },
   { path: '/expert/question', component: Question },
   { path: '/expert/course/edit/:courseId', component: EditCourse }

]


const privateRoutes = [
   { path: '/profile', component: Profile },
   { path: '/changePassword', component: ChangePassword },
   { path: '/write', component: CreatePost }
]



export { publicRoutes, privateRoutes, adminRoutes, expertRoutes };