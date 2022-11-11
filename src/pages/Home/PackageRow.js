import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import userApi from '../../_actions/userApi';
import Package from './Package'

const PackageRow = () => {

   const [packages, setPackages] = useState();

   const loadPackage = async () => {
      try {
         let packageData = await (await userApi.getPackages()).data;

         packageData = packageData.filter(item => item.is_active == true);
         packageData.slice(0, 3);
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
      <div id="home-packages" class="mb-5">
         <h1 class="fw-bold text-center my-5 text-primary border-bottom">Learn today</h1>
         <div class="home-packages-container row">
            {
               packages ? packages.map((pack, index) => {
                  return <Package pack={pack} key={index} />
               }) : <Loading />
            }

         </div>
      </div>
   )
}

export default PackageRow