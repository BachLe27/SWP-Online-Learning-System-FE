import Navbar from "../../components/Navbar";
const Unauthorized = () => {

   const iconStyle = {
      fontSize: "7rem"
   }

   return (
      <>
         <Navbar />
         <div className="container mt-7 text-center vh-75 d-flex flex-column justify-content-center">
            <h1 className="fw-bold mb-3">
               <i style={iconStyle} class="mb-2 fa-solid fa-lock"></i>
            </h1>
            <h1 className="fw-bold">403 FORBIDDEN</h1>
            <h3>You can't access this source</h3>
         </div>
      </>
   );
}

export default Unauthorized;