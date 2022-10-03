import axios from "./axios";
import qs from 'qs';

const userApi = {

   register(formData) {
      const sendData = JSON.stringify(formData);
      const option = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         data: sendData,
         url: '/user'
      }
      return axios(option);
   },

   login(formData) {
      const option = {
         method: 'POST',
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         data: qs.stringify(formData),
         url: '/token'
      }
      return axios(option);
   },

   authenticate({ token_type, access_token }) {
      const option = {
         method: 'GET',
         headers: { 'Authorization': `${token_type} ${access_token}` },
         url: '/user/me'
      }
      return axios(option);
   },

   changeInfo(formData, token) {
      const option = {
         method: 'PUT',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         url: '/user/me',
         data: JSON.stringify(formData)
      }
      return axios(option);
   },

   deleteAccount(token) {
      const option = {
         method: 'DELETE',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}` },
         url: '/user/me'
      }
      return axios(option);
   },
}

export default userApi;