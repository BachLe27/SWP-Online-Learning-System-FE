import axios from "./axios";
import qs from 'qs';

const userApi = {

   register(formData) {
      const sendData = JSON.stringify(formData);
      const config = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         data: sendData,
         url: '/user'
      }
      return axios(config);
   },

   login(formData) {
      const config = {
         method: 'POST',
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         data: qs.stringify(formData),
         url: '/token'
      }
      return axios(config);
   },

   authenticate({ token_type, access_token }) {
      const config = {
         method: 'GET',
         headers: { 'Authorization': `${token_type} ${access_token}` },
         url: '/user/me'
      }
      return axios(config);
   },

   changeInfo(formData, token) {
      const config = {
         method: 'PUT',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         url: '/user/me',
         data: JSON.stringify(formData)
      }
      return axios(config);
   },

   deleteAccount(token) {
      const config = {
         method: 'DELETE',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}` },
         url: '/user/me'
      }
      return axios(config);
   },

   changePassword(token, data) {
      const config = {
         method: 'PUT',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         data: JSON.stringify(data),
         url: '/user/me/password'
      }
      return axios(config);
   },

   updateAvatar(token, image) {
      var formData = new FormData();
      formData.append("image", image);
      const config = {
         method: 'PUT',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'multipart/form-data' },
         url: '/user/me/avatar',
         data: formData
      }
      return axios(config);
   },

   getAvatar(token) {
      const config = {
         method: 'GET',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}` },
         url: '/user/me/avatar',
      }
      return axios(config);
   },

   getCategories() {
      const config = {
         method: 'GET',
         url: '/category',
      }
      return axios(config);
   },

   upload(token, data) {
      var formData = new FormData();
      formData.append("file", data);

      const config = {
         method: 'POST',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'multipart/form-data' },
         data: formData,
         url: '/upload'
      }
      return axios(config);
   }

}

export default userApi;