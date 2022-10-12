import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ListAccount from "./ListAccount";

const Admin = () => {

   const [key, setKey] = useState('home');
   return (
      <>
         <Navbar />
         <div className="mt-6 container-fluid">
            <h2 className="my-4 fw-bold ms-3"> <i class="fa-solid fa-user-gear"></i> Admin Dashboard</h2>

            <Tabs
               id="controlled-tab-example"
               activeKey={key}
               onSelect={(k) => setKey(k)}
               className="mb-3"
            >
               <Tab className="vh-75" eventKey="home" title={<span><i class="fa-solid fa-users-gear"></i> Manage Account</span>}>
                  <ListAccount />
               </Tab>
               <Tab className="vh-75" eventKey="profile" title="@@">
                  Tab 1 content
               </Tab>
               <Tab className="vh-75" eventKey="contact" title="Contact">
                  ????
               </Tab>
            </Tabs>
         </div >
         <Footer />
      </>
   );
}

export default Admin;