import axios from "axios";
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://192.168.1.3:3003/api/v1'
});
  

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error && error.response && error.response.status || 500;
    switch (status) {
      // authentication (token related issues)
      case 400: {
        // window.location.href= 'back' ;
        // window.location.href= '/home' ;
        return 1;
      }
      case 401: {
        return 1;
      }

      // forbidden (permission related issues)
      case 403: {
        return 1;
      }

      // bad request
      // not found
      case 404: {
        return Promise.reject(error);
      }

      // conflict
      case 409: {
        return Promise.reject(error);
      }

      // unprocessable
      case 422: {
        return Promise.reject(error);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(error);
      }
    }
  
});

export default instance;

