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
   },

   updateChapter(token, chapterId, data) {
      const config = {
         method: 'PUT',
         data: JSON.stringify(data),
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         url: `/chapter/${chapterId}`
      }
      return axios(config);
   },

   updateCourse(token, id, data) {
      const config = {
         method: 'PUT',
         data: JSON.stringify(data),
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         url: `/course/${id}`
      }
      return axios(config);
   },

   createLesson(token, id, data) {
      console.log(data);
      const config = {
         method: 'POST',
         data: JSON.stringify(data),
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         url: `/chapter/${id}/lesson`
      }
      return axios(config);
   },

   updateLesson(token, id, data) {
      //console.log(data);
      const config = {
         method: 'PUT',
         data: JSON.stringify(data),
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         url: `/lesson/${id}`
      }
      return axios(config);
   },

   getLesson(id) {
      const config = {
         method: 'GET',
         url: `/chapter/${id}/lesson`
      }
      return axios(config);
   },

   createQuiz(token, id, data) {
      console.log(data);
      const config = {
         method: 'POST',
         data: JSON.stringify(data),
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         url: `/lesson/${id}/quiz`
      }
      return axios(config);
   },

   createQuestion(token, id, data) {
      const config = {
         method: 'POST',
         data: JSON.stringify(data),
         headers: { 'Authorization': `${token.token_type} ${token.access_token}`, 'Content-Type': 'application/json' },
         url: `/lesson/${id}/quiz/question`
      }
      return axios(config);
   },

   deleteChapter(token, id) {
      const config = {
         method: 'DELETE',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}` },
         url: `/chapter/${id}`
      }
      return axios(config);
   },

   deleteLesson(token, id) {
      const config = {
         method: 'DELETE',
         headers: { 'Authorization': `${token.token_type} ${token.access_token}` },
         url: `/lesson/${id}`
      }
      return axios(config);
   }
}


export default expertApi;