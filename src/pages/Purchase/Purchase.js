import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import Footer from '../../components/Footer'
import Loading from '../../components/Loading'
import Navbar from '../../components/Navbar'
import userApi from '../../_actions/userApi'
import { authAtom } from '../../_state'
import Package from './Package'

const Purchase = () => {

   const [packages, setPackages] = useState();
   const token = useRecoilValue(authAtom);

   const loadPackage = async () => {
      try {
         let packageData = await (await userApi.getPackages()).data;
         let purchased = (await userApi.purchased(token)).data;
         console.log(purchased);
         packageData = packageData.filter(item => item.is_active == true);
         packageData = packageData.sort((a, b) => {
            return a.price - b.price;
         });
         // console.log(packageData);
         setPackages(packageData)
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadPackage();
   }, [])

   return (
      <>
         <Navbar />
         <div id="home-packages" class="container mt-6 mb-5">
            <h1 class="fw-bold text-center mt-5 text-primary border-bottom">Our Learning Package</h1>
            <div class="home-packages-container row">
               {
                  packages ? packages.map((pack, index) => {
                     return <Package pack={pack} key={index} />
                  }) : <Loading />
               }
            </div>
         </div>
         <Footer />
      </>
   )
}

export default Purchase