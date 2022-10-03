const Footer = () => {
   return (
      <footer id="footer" class="bg-dark py-4 mt-5">
         <div class="container-fluid row">
            <div class="quick-link py-3 col-md-4">
               <div class="quick-link-content px-5">
                  <div class="quick-link-title text-light">
                     <h4>Quick Access</h4>
                  </div>
                  <div class="quick-link-detail">
                     <ul class="list-group">
                        <li class="list-group-numbered">
                           <a class="text-light text-decoration-none"
                              href="#navbar">Home</a>
                        </li>
                        <li class="list-group-numbered">
                           <a class="text-light text-decoration-none"
                              href="">Courses</a>
                        </li>
                        <li class="list-group-numbered">
                           <a class="text-light text-decoration-none"
                              href="">Blogs</a>
                        </li>
                        <li class="list-group-numbered">
                           <a class="text-light text-decoration-none"
                              href="">About</a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            <div class="contact py-3 col-md-4">
               <div class="contact-content px-5">
                  <div class="contact-title text-light">
                     <h4>Contact</h4>
                  </div>
                  <div class="contact-detail">
                     <ul class="list-group">
                        <li class="list-group-numbered">
                           <p class="text-light">
                              <i class="fas fa-phone"></i> 098 158 38 98
                           </p>
                        </li>
                        <li class="list-group-numbered">
                           <p class="text-light">
                              <i class="fas fa-envelope"></i> g6learning@gmail.com
                           </p>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            <div class="support py-3 col-md-4">
               <div class="support-content px-5">
                  <div class="suppport-title text-light">
                     <h4>Support</h4>
                  </div>
                  <div class="support-detail">
                     <ul class="list-group">
                        <li class="list-group-numbered">
                           <a class="text-light text-decoration-none"
                              href="">
                              Security
                           </a>
                        </li>
                        <li class="list-group-numbered">
                           <a class="text-light text-decoration-none"
                              href="">
                              Policy
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            <div class="px-5 text-light">
               <div>
                  <p>© G6 online learning system</p>
               </div>
               <div>
                  <a class="text-light me-2" href="#">
                     <i class="fab fa-facebook-square fs-2"></i>
                  </a>
                  <a class="text-light me-2" href="#">
                     <i class="fab fa-youtube-square fs-2"></i>
                  </a>
                  <a class="text-light" href="#">
                     <i class="fab fa-tiktok fs-2"></i>
                  </a>
               </div>
            </div>
         </div>
      </footer>
   );
}

export default Footer;