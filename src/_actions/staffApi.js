import axios from "./axios";

const staffApi = {

   createCategory(token, data) {
      console.log(token);

      const config = {
         method: 'POST',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         data: JSON.stringify(data),
         url: `/category`
      }
      return axios(config);
   }

}

export default staffApi;