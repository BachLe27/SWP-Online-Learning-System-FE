import { Button } from 'react-bootstrap';
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil';
import logo from '../logo.png';
import userAction from '../_actions/userApi';
import { authAtom, userAtom } from '../_state';

const Navbar = () => {

   const [user, setUser] = useRecoilState(userAtom);
   const [auth, setAuth] = useRecoilState(authAtom);

   const navigate = useNavigate();

   const pathname = window.location.pathname;

   const logout = async () => {
      console.log("loged out");
      setUser(null);
      setAuth(null);
      localStorage.removeItem('user');
      localStorage.removeItem('auth');
      // navigate('/login');
      window.location.replace("http://localhost:3000/login");
   }

   return (
      <nav id="navbar" className="navbar fixed-top navbar-light bg-light navbar-expand-lg shadow-sm">
         <div className="container">

            <Link className="navbar-brand" to="/">
               <img height="40px" className="" src={logo} alt="" />
               <span className="px-2 fw-bold text-primary">
                  E-Learning
               </span>
            </Link>

            <form className="d-none d-lg-flex col-5" role="search">

               <div class="input-group">
                  <input type="text" class="form-control shadow-none" id="postSearch" placeholder="Search..." />
                  <Button type="submit" class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></Button>
               </div>
            </form>

            {user == null && pathname != '/login' ?
               <Link to="/login" className="btn btn-primary d-block d-lg-none">Login</Link> : <></>
            }

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
               data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
               aria-label="Toggle navigation">
               <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse px-2" id="navbarSupportedContent">
               <ul className="navbar-nav me-auto mb-2 mb-lg-0 list-group d-flex flex-grow-1 justify-content-end">
                  {
                     user && user.role == "ADMIN" && <li className="list-group-numbered">
                        <Link className="nav-link text-dark" to="/admin"> <i class="fa-solid fa-user-gear"></i> Admin</Link>
                     </li>
                  }

                  {
                     user && user.role == "EXPERT" && <>
                        <Link className="nav-link text-dark" to="/expert">
                           <i class="fa-solid fa-chalkboard-user"></i> Expert
                        </Link>
                     </>
                  }

                  {
                     user && user.role == "STAFF" && <>
                        <Link className="nav-link text-dark" to="/staff">
                           <i class="fa-solid fa-user-tie"></i> Staff
                        </Link>
                     </>
                  }

                  <li className="list-group-numbered">
                     <Link className="nav-link text-dark" to="/courses"> <i className="fas fa-book me-1"></i> Courses</Link>
                  </li>

                  <li className="list-group-numbered">
                     <Link className="nav-link text-dark" to="/blog"> <i className="fas fa-blog me-1"></i> Blog</Link>
                  </li>

                  <li className="list-group-numbered ">
                     <Link className="nav-link text-dark fw-bold" to="/purchase"> <i class="fa-solid fa-hand-point-right"></i> Learn!</Link>
                  </li>

                  <li className="list-group-numbered d-block d-lg-none">
                     <Link className="nav-link text-dark" href="#">
                        <i className="fa-solid fa-magnifying-glass me-1"></i> Search
                     </Link>
                  </li>

                  {/* {user && <li className="nav-item">
                     <Link className="nav-link text-dark" href="#">
                        <i className="fa-solid fa-bell"></i> Notification
                     </Link>
                  </li>
                  } */}

                  {user &&
                     <li className="dropdown">
                        <span className="nav-link dropdown-toggle" href="#" id="userOption" role="button" data-bs-toggle="dropdown"
                           aria-expanded="false">
                           <i className="fa-solid fa-user"></i>
                        </span>
                        <ul className="pt-2 px-3 dropdown-menu dropdown-menu-end shadow" aria-labelledby="userOption">
                           <li>
                              <div className="dropdown-header d-flex align-items-center">
                                 <img className="rounded-circle" width="50px" height="50px" src={user.avatar ? `http://localhost:8000/upload/${user.avatar}` : `https://picsum.photos/50/50`} alt="" />
                                 <span className="fw-bold dropdown-header">{user.full_name}</span>
                              </div>
                           </li>
                           <li>
                              <hr className="dropdown-divider" />
                           </li>
                           <li><Link className="dropdown-item" to="/profile">View Profile</Link></li>
                           <li><Link className="dropdown-item" to="/changePassword">Change Password</Link></li>
                           <li><Link className="dropdown-item" to="/myCourses"> My courses</Link></li>
                           <li><Link className="dropdown-item" to="/myPost">My posts</Link></li>
                           <li><Link className="dropdown-item" to="/myPurchase">Purchase History</Link></li>
                           <li>
                              <hr className="dropdown-divider" />
                           </li>
                           <li>
                              <Link
                                 onClick={logout}
                                 className="dropdown-item"
                                 href="#"> <i class="fa-solid fa-right-from-bracket"></i> Log out
                              </Link>
                           </li>
                        </ul>
                     </li>

                  }

               </ul>
            </div>

            {user == null && pathname != '/login' ?
               <Link to="/login" className="btn btn-primary d-none d-lg-inline">Login</Link> : <></>
            }
         </div>
      </nav >
   );
}

export default Navbar;