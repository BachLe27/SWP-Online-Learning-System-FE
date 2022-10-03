import { useState } from "react";
import { Nav, Tab, Tabs } from "react-bootstrap";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import AccountList from "./AccountList";

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
               <Tab eventKey="home" title={<span><i class="fa-solid fa-users-gear"></i> Manage Account</span>}>
                  <AccountList />
               </Tab>
               <Tab eventKey="profile" title={<span>Tab1 <i class="fa-solid fa-users-gear"></i> </span>}>
                  Tab 1 content
               </Tab>
               <Tab eventKey="contact" title="Contact">
                  ????
               </Tab>
            </Tabs>
         </div >
         <Footer />
      </>
   );
}

export default Admin;