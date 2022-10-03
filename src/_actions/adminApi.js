import axios from "./axios";

const adminApi = {

   getUsers(token, fullname = '', limit = '', offset = '', roles = '') {

      const query = '';
      if (fullname != '') {
         query += `?search=${fullname}`;
      }

      if (limit != '') {
         query += `?limit=${limit}`
      }

      if (offset != '') {
         query += `?offset=${offset}`
      }

      if (roles != '') {
         query += `?roles=${roles}`
      }

      const config = {
         method: 'GET',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}` },
         url: `/user${query}`
      }

      return axios(config);
   }
}

export default adminApi;