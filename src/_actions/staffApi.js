import axios from "./axios";

const staffApi = {

   createCategory(token, data) {
      // console.log(token);
      const config = {
         method: 'POST',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         data: JSON.stringify(data),
         url: `/category`
      }
      return axios(config);
   },
   createPackage(token, data) {
      const config = {
         method: 'POST',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         data: JSON.stringify(data),
         url: `/price_package`
      }
      return axios(config);
   },
   getPackages(token) {
      const config = {
         method: 'GET',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         url: `/price_package`
      }
      return axios(config);
   },
   updatePackage(token, id, data) {
      const config = {
         method: 'PUT',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         data: JSON.stringify(data),
         url: `/price_package/${id}`
      }
      return axios(config);
   },

   updateCategory(token, id, data) {
      const config = {
         method: 'PUT',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         data: JSON.stringify(data),
         url: `/category/${id}`
      }
      return axios(config);
   },

   deleteCategory(token, id) {
      const config = {
         method: 'DELETE',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}` },
         url: `/category/${id}`
      }
      return axios(config);
   }
}

export default staffApi;