import axios from "./axios";

const expertApi = {

   createCourse(token, data) {

      const config = {
         method: 'POST',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         data: JSON.stringify(data),
         url: '/course'
      }
      return axios(config);
   },

   getCreatedCourses(token, limit = 0, offset = 0) {
      let query = '?';
      if (limit != 0)
         query += `limit=${limit}`
      if (offset != 0)
         query += `&offset=${offset}`

      console.log(query);
      const config = {
         method: 'GET',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}` },
         url: `/course/created${query}`
      }
      return axios(config);
   },

   getCourseDetail(token, id) {
      const config = {
         method: 'GET',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}` },
         url: `/course/${id}`
      }

      return axios(config);
   },

   getCourseOverview(token, id) {
      const config = {
         method: 'GET',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}` },
         url: `/course/${id}/overview`
      }

      return axios(config);
   },

   getCourseChapter(id) {
      const config = {
         method: 'GET',
         url: `/course/${id}/chapter`
      }
      return axios(config);
   },

   createChapter(token, id, data) {
      const config = {
         method: 'POST',
         data: JSON.stringify(data),
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         url: `/course/${id}/chapter`
      }
      return axios(config);
   }
}


export default expertApi;