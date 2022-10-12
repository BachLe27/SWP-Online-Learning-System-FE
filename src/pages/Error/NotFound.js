import Navbar from "../../components/Navbar";
const NotFound = () => {

   const iconStyle = {
      fontSize: "10rem"
   }

   return (
      <>
         <Navbar />
         <div className="container mt-7 text-center vh-75 d-flex flex-column justify-content-center">
            <h1 style={iconStyle} className="fw-bold mb-3">
               <i class="fa-regular fa-face-meh"></i>
            </h1>
            <h1 className="fw-bold">404 NOT FOUND</h1>
            <h3>OOPS! We can't find that page</h3>
         </div>
      </>
   );
}

export default NotFound;