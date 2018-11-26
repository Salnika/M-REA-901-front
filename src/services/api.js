import axios from 'axios';
import Authentication from './authentication.js';

class API {
  static getBaseUrl() {
    if (process.env.NODE_ENV === 'production') {
      return 'test.com';
    } else {
      return 'http://localhost:3020';
    }
  }

  static getNoAuth() {
    var instance = axios.create({
      baseURL: API.getBaseUrl(),
      timeout: 300000,
      maxRedirects: 0
    });
    return instance;
  }

  static get() {
    var instance = axios.create({
      baseURL: API.getBaseUrl(),
      timeout: 300000,
      maxRedirects: 0
    });

    instance.defaults.headers.common['Authorization'] = Authentication.getToken();

    return instance;
  }
}

export default API;